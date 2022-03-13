import React from "react";
import CanvasDraw from "react-canvas-draw";

export default class Canvas extends React.Component {
  state = {
    brushRadius: 5,
  };
  render() {
    return (
      <div className="App text-center p-3">
        <div>
          <label>Brush-Radius:</label>
          <input
            type="number"
            value={this.state.brushRadius}
            onChange={(e) =>
              this.setState({ brushRadius: parseInt(e.target.value, 10) })
            }
          />
        </div>
        <button
          onClick={() => {
            this.saveableCanvas.clear();
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            this.saveableCanvas.undo();
          }}
        >
          Undo
        </button>

        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          brushRadius={this.state.brushRadius}
          style={{
            margin: "auto",
            boxShadow:
              "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          }}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    );
  }
}
