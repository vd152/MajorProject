import React, { Component } from "react";
import { Link } from "react-router-dom";
import Canvas from "../Canvas";
class Home extends Component {
  state = {
    predictions: [],
    currentImage: "",
  };
  updatePredictions = (preds) => {
    this.setState({ predictions: preds });
  };
  updateImage = (image) => {
    this.setState({ currentImage: image });
  };
  render() {
    return (
      <div className="row p-0 m-0">
        <div className="col-12 text-right p-3">
          <a href={"/autocomplete"}>Try autocomplete! </a>
          <Link to={"/create"}>Improve our Algorithm!</Link>
        </div>
        <div className="col-md-6 text-center">
          <Canvas
            save={false}
            updatePredictions={this.updatePredictions}
            updateImage={this.updateImage}
          />
        </div>
        <div className="col-md-6 prediction-box">
          <h5>It looks like..</h5>
          <ul className="list-group w-50 pt-3">
            {this.state.predictions.map((pred, key) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center border-0 py-2 p-0"
                  key={key}
                >
                  {pred.name}
                  <span className="badge badge-success badge-pill">
                    {" "}
                    {(pred.value * 100).toFixed(2)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
