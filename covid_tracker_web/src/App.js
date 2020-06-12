import React, { Component } from 'react';
import './App.css';
import Countries from './components/Countries.js';
import NavBar from './components/NavBar.js';
import CountryHeader from './components/CountryHeader.js';
import CountryBody from './components/CountryBody.js';

export class App extends Component {
  state = {
    countries: [
      {
        id: 1,
        title: 'USA',
        selected: true,
      },
      {
        id: 2,
        title: 'Canada',
        selected: false,
      }

    ]
  }
  render() {
    
    return (
      <div className="App">
        <NavBar />
        <div>
          <Countries countries={this.state.countries}/>
          <CountryHeader countries={this.state.countries}/>
          <CountryBody />
        </div>
      </div>
    );
  }
}

export default App;
