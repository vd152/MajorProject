import React from "react";
import Canvas from "../Canvas";

export default class DataCreation extends React.Component {
  render() {
    return (
      <div className="row m-0 p-0 align-items-center justify-content-center text-center">
        <div className="col-12 text-center p-3">
          <h2>Help us improve our algorithm!</h2>
        </div>
        <div className="col-12">
          <Canvas save={true}/>
        </div>
        
      </div>
    );
  }
}
