const sketch = function (p) {
  const BASE_URL =
    "https://storage.googleapis.com/quickdraw-models/sketchRNN/models/";
  const availableModels = [
    "bird",
    "ant",
    "ambulance",
    "angel",
    "alarm_clock",
    "antyoga",
    "backpack",
    "barn",
    "basket",
    "bear",
    "bee",
    "beeflower",
    "bicycle",
    "book",
    "brain",
    "bridge",
    "bulldozer",
    "bus",
    "butterfly",
    "cactus",
    "calendar",
    "castle",
    "cat",
    "catbus",
    "catpig",
    "chair",
    "couch",
    "crab",
    "crabchair",
    "crabrabbitfacepig",
    "cruise_ship",
    "diving_board",
    "dog",
    "dogbunny",
    "dolphin",
    "duck",
    "elephant",
    "elephantpig",
    "everything",
    "eye",
    "face",
    "fan",
    "fire_hydrant",
    "firetruck",
    "flamingo",
    "flower",
    "floweryoga",
    "frog",
    "frogsofa",
    "garden",
    "hand",
    "hedgeberry",
    "hedgehog",
    "helicopter",
    "kangaroo",
    "key",
    "lantern",
    "lighthouse",
    "lion",
    "lionsheep",
    "lobster",
    "map",
    "mermaid",
    "monapassport",
    "monkey",
    "mosquito",
    "octopus",
    "owl",
    "paintbrush",
    "palm_tree",
    "parrot",
    "passport",
    "peas",
    "penguin",
    "pig",
    "pigsheep",
    "pineapple",
    "pool",
    "postcard",
    "power_outlet",
    "rabbit",
    "rabbitturtle",
    "radio",
    "radioface",
    "rain",
    "rhinoceros",
    "rifle",
    "roller_coaster",
    "sandwich",
    "scorpion",
    "sea_turtle",
    "sheep",
    "skull",
    "snail",
    "snowflake",
    "speedboat",
    "spider",
    "squirrel",
    "steak",
    "stove",
    "strawberry",
    "swan",
    "swing_set",
    "the_mona_lisa",
    "tiger",
    "toothbrush",
    "toothpaste",
    "tractor",
    "trombone",
    "truck",
    "whale",
    "windmill",
    "yoga",
    "yogabicycle",
  ];
  let model;
  // Model
  let modelState;
  const temperature = 0.1; 
  let modelLoaded = false;
  let modelIsActive = false;

  // Model pen state.
  let dx, dy;
  let x, y;
  let startX, startY; 
  let pen = [0, 0, 0]; 
  let previousPen = [1, 0, 0]; 
  const PEN = { DOWN: 0, UP: 1, END: 2 };
  const epsilon = 2.0; 

  // Human drawing.
  let currentRawLine = [];
  let userPen = 0; // above = 0 or below = 1 the paper.
  let previousUserPen = 0;
  let currentColor = "black";

  // Keep track of everyone's last attempts to that we can reverse them.
  let lastHumanStroke; // encode the human's drawing as a sequence of [dx, dy, penState] strokes
  let lastHumanDrawing; // the actual sequence of lines that the human drew, so we can replay them.
  let lastModelDrawing = []; // the actual sequence of lines that the model drew, so that we can erase them.

  /*
   * Main p5 code
   */
  p.setup = function () {
    // Initialize the canvas.
    const containerSize = document
      .getElementById("sketch")
      .getBoundingClientRect();
    const screenWidth = 400;
    const screenHeight = 400;
    p.createCanvas(screenWidth, screenHeight);
    p.frameRate(60);

    restart();
    initModel(22); // Cat!

    selectModels.innerHTML = availableModels
      .map((m) => `<option>${m}</option>`)
      .join("");
    selectModels.selectedIndex = 22;
    selectModels.addEventListener("change", () =>
      initModel(selectModels.selectedIndex)
    );
    btnClear.addEventListener("click", restart);
    btncomplete.addEventListener("click", () => {
      console.log("here")
      userPen = 0; // Up!
      const currentRawLineSimplified = model.simplifyLine(currentRawLine);

      // If it's an accident...ignore it.
      if (currentRawLineSimplified.length > 1) {
        // Encode this line as a stroke, and feed it to the model.
        lastHumanStroke = model.lineToStroke(currentRawLineSimplified, [
          startX,
          startY,
        ]);
        encodeStrokes(lastHumanStroke);
      }
      currentRawLine = [];
      previousUserPen = userPen;
    });

  };

  p.windowResized = function () {
    console.log("resize canvas");
    const containerSize = document
      .getElementById("sketch")
      .getBoundingClientRect();
    const screenWidth = Math.floor(containerSize.width);
    const screenHeight = Math.floor(containerSize.height);
    p.resizeCanvas(screenWidth, screenHeight);
  };

  /*
   * Human is drawing.
   */
  p.mousePressed = function () {
    if (p.isInBounds()) {
      x = startX = p.mouseX;
      y = startY = p.mouseY;
      userPen = 1; // down!

      modelIsActive = false;
      currentRawLine = [];
      lastHumanDrawing = [];
      previousUserPen = userPen;
      p.stroke(currentColor);
    }
  };

  p.mouseDragged = function () {
    if (!modelIsActive && p.isInBounds()) {
      const dx0 = p.mouseX - x;
      const dy0 = p.mouseY - y;
      if (dx0 * dx0 + dy0 * dy0 > epsilon * epsilon) {
        // Only if pen is not in same area.
        dx = dx0;
        dy = dy0;
        userPen = 1;
        if (previousUserPen == 1) {
          p.line(x, y, x + dx, y + dy); // draw line connecting prev point to current point.
          lastHumanDrawing.push([x, y, x + dx, y + dy]);
        }
        x += dx;
        y += dy;
        currentRawLine.push([x, y]);
      }
      previousUserPen = userPen;
    }
    return false;
  };

  /*
   * Model is drawing.
   */
  p.draw = function () {
    if (!modelLoaded || !modelIsActive) {
      return;
    }

    // New state.
    pen = previousPen;
    modelState = model.update([dx, dy, ...pen], modelState);
    const pdf = model.getPDF(modelState, temperature);
    [dx, dy, ...pen] = model.sample(pdf);

    // If we finished the previous drawing, start a new one.
    if (pen[PEN.END] === 1) {
      console.log("finished this one");
      modelIsActive = false;
    } else {
      // Only draw on the paper if the pen is still touching the paper.
      if (previousPen[PEN.DOWN] === 1) {
        p.line(x, y, x + dx, y + dy);
        lastModelDrawing.push([x, y, x + dx, y + dy]);
      }
      // Update.
      x += dx;
      y += dy;
      previousPen = pen;
    }
  };

  p.isInBounds = function () {
    return (
      p.mouseX >= 0 &&
      p.mouseY >= 0 &&
      p.mouseX < p.width &&
      p.mouseY < p.height
    );
  };

  /*
   * Helpers.
   */

  function restart() {
    p.background(255, 255, 255, 255);
    p.strokeWeight(3.0);

    // Start drawing in the middle-ish of the screen
    startX = x = p.width / 2.0;
    startY = y = p.height / 3.0;

    // Reset the user drawing state.
    userPen = 1;
    previousUserPen = 0;
    currentRawLine = [];
    strokes = [];

    // Reset the model drawing state.
    modelIsActive = false;
    previousPen = [0, 1, 0];
  }

  function initModel(index) {
    modelLoaded = false;
    document.getElementById("sketch").classList.add("loading");

    if (model) {
      model.dispose();
    }

    model = new ms.SketchRNN(`${BASE_URL}${availableModels[index]}.gen.json`);
    model.initialize().then(() => {
      modelLoaded = true;
      document.getElementById("sketch").classList.remove("loading");
      console.log(`🤖${availableModels[index]} loaded.`);
      model.setPixelFactor(5.0); // Bigger -> large outputs
    });
  }

  function encodeStrokes(sequence) {
    if (sequence.length <= 5) {
      return;
    }

    // Encode the strokes in the model.
    let newState = model.zeroState();
    newState = model.update(model.zeroInput(), newState);
    newState = model.updateStrokes(sequence, newState, sequence.length - 1);

    // Reset the actual model we're using to this one that has the encoded strokes.
    modelState = model.copyState(newState);

    const lastHumanLine = lastHumanDrawing[lastHumanDrawing.length - 1];
    x = lastHumanLine[0];
    y = lastHumanLine[1];

    // Update the pen state.
    const s = sequence[sequence.length - 1];
    dx = s[0];
    dy = s[1];
    previousPen = [s[2], s[3], s[4]];

    lastModelDrawing = [];
    modelIsActive = true;
  }
};

const p5Sketch = new p5(sketch, "sketch");
