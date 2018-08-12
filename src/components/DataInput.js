import React from 'react';
import Visuals from './Visuals';

class DataInput extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let text = event.target.text.value;
    let dataObj = JSON.parse(text)
    this.setState({ data: dataObj.results })
  }

  handleFileUpload(event) {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
      let dataObjFromUpload = event.target.result
      let dataObjJSON = JSON.parse(dataObjFromUpload)
      this.setState({ data: dataObjJSON.results })
      // console.log('dataObjJSON =======', dataObjJSON.results)
    }.bind(this);

    reader.readAsText(file);
  }

  render() {
    console.log('state-------', this.state)

    return (
      <div>
        {/* <form onSubmit={this.handleFileUpload}> */}
          <label>Choose a file to upload:</label>
          <input type="file" name="file" onChange={this.handleFileUpload}/>

          {/* <button type="submit">Submit</button> */}
        {/* </form> */}

        <form onSubmit={this.handleSubmit}>
          <label>Paste your data here:</label>
          <input type="text" name="text" />

          <button type="submit">Submit</button>
        </form>

        {
          this.state.data.length > 0 && <Visuals file={ this.state.data } />
        }

      </div>
    );
  }
}

export default DataInput;
