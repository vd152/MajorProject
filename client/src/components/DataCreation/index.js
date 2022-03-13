import React from "react";
import Canvas from "../Canvas";

export default class DataCreation extends React.Component {
  render() {
    return (
      <div className="row p-2 align-items-center justify-content-center text-center">
        <div className="col-12 text-center p-3">
          <h2>Help us improve our algorithm!</h2>
        </div>
        <div className="col-md-6">
          <Canvas />
        </div>
        <div className="col-md-6 ">
          <div className="row">
            <div className="col-12 text-center">
              <button>Dropdown</button>
            </div>
            <div className="col-12">
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
