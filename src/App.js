import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataInput from './components/DataInput';
// import Visuals from './components/Visuals';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">User-Info</h1>
        </header>

        <p className="App-intro">
          Use the form below to upload your data!
        </p>

        <DataInput />

      </div>
    );
  }
}

export default App;
