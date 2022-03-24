import React, { Component } from "react";
import { Link } from "react-router-dom";
import Canvas from "../Canvas";
class Home extends Component {
  render() {
    return (
      <div className="row p-0 m-0">
        <div className="col-12 text-right p-3">
          <Link to={"/create"}>Improve our Algorithm!</Link>
        </div>
        <div className="col-6 text-center">
          <Canvas save={false} />
        </div>
        <div className="col-6">
          <h5>It looks like..</h5>
          <ul className="list-group w-50 pt-3">
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 p-0">
              Prediction 1
              <span className="badge badge-success badge-pill"> 80%</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
