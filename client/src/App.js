import React, { Component } from 'react';
import './App.css';
import DataInput from './components/DataInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">New Classrooms Software Engineer Trial Project</h1>
        </header>

        <p className="App-intro">
          Use the form below to upload your JSON data!
        </p>

        <DataInput />

      </div>
    );
  }
}

export default App;
