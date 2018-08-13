import React from 'react';
import Visuals from './Visuals';
import { form, label, input, button } from "../App.css"

class DataInput extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let text = event.target.text.value;
    let dataObj = JSON.parse(text)
    this.setState({ data: dataObj})
  }

  handleFileUpload(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
      let dataObjFromUpload = event.target.result
      let dataObjJSON = JSON.parse(dataObjFromUpload)
      this.setState({ data: dataObjJSON })
      // console.log('dataObjJSON =======', dataObjJSON.results)
    }.bind(this);

    reader.readAsText(file);
  }

  render() {
    console.log('state-------', this.state)

    return (
      <div className="input-container">
          <div className="form-container">

            <form onSubmit={this.handleSubmit}>
            <label>1) Choose a file to upload:</label>
            <br />
            <input type="file" name="file" onChange={this.handleFileUpload}/>
            <br />
            <p> -Or- </p>
              <label >2) Paste your data here:</label>
              <br />
              <input type="text" name="text" />
              <button type="submit">Submit</button>
            </form>
        </div>

      <div className="chart-container">
        {
          Object.keys(this.state.data).length > 0 && <Visuals data={ this.state.data } />
        }
      </div>

      </div>
    );
  }
}

export default DataInput;
