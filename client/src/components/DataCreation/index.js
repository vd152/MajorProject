import React from "react";
import Canvas from "../Canvas";
import { Link } from "react-router-dom";

export default class DataCreation extends React.Component {
  render() {
    return (
      <div className="row m-0 p-0 align-items-center justify-content-center text-center">
        <div className="col-12 text-left p-1">
          <Link to={"/"}>Go back</Link>
        </div>
        <div className="col-12 text-center p-3">
          <h2>Help us improve our algorithm!</h2>
        </div>
        <div className="col-12 text-center">
          <Canvas save={true} />
        </div>
      </div>
    );
  }
}
