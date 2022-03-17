import React from "react";
import CanvasDraw from "react-canvas-draw";
import api from "../../apis/api";
import { dataURItoBlob } from "../../utils/common";
export default class Canvas extends React.Component {
  state = {
    brushRadius: 5,
    doodleNames: [],
    selectedDoodle: ""
  };
  componentDidMount() {
    api.get('/names').then(res=>{
      this.setState({doodleNames: res.data.data, selectedDoodle: res.data.data[0]})

    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    return (
      <div className="App text-center p-3">
        {this.props.save && (
          <div className="d-flex justify-content-center">
            <select value={this.state.selectedDoodle} onChange={(e)=>{
              this.setState({selectedDoodle: e.target.value})
            }}>
              {this.state.doodleNames.map((name, key)=>{
                return <option value={name} key={key}>{name}</option>
              })}
             
            </select>
            <button
            className="btn"
              onClick={() => {
                let img = this.saveableCanvas.getDataURL(
                  "image/png",
                  false,
                  "#fff"
                );
                let image = dataURItoBlob(img);
                var formData = new FormData();
                formData.append("image", image);
                api
                  .post(`/image/${this.state.selectedDoodle}`, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((res) => {
                    this.saveableCanvas.clear();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              save
            </button>
          </div>
        )}
        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          brushRadius={this.state.brushRadius}
          style={{
            margin: "auto",
            boxShadow:
              "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          }}
          onChange={(e) => {
            // console.log(e);
          }}
        />
        <div className="p-3">
          <label>Brush-Radius:</label>
          <input
            className="radius-input m-2"
            type="number"
            value={this.state.brushRadius}
            onChange={(e) =>
              this.setState({ brushRadius: parseInt(e.target.value, 10) })
            }
          />
        </div>
        <button
        className="btn"
          onClick={() => {
            this.saveableCanvas.clear();
          }}
        >
          Clear
        </button>
        <button
        className="btn"
          onClick={() => {
            this.saveableCanvas.undo();
          }}
        >
          Undo
        </button>
      </div>
    );
  }
}