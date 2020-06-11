import React, { Component } from 'react';
import './App.css';
import Countries from './components/Countries.js';
import NavBar from './components/NavBar.js';
import CountryContent from './components/CountryContent.js';

export class App extends Component {
  state = {
    countries: [
      {
        id: 1,
        title: 'USA',
        selected: true
      },
      {
        id: 2,
        title: 'Canada',
        selected: false
      }
    ]
  }
  render() {
    
    return (
      <div className="App">
        <NavBar />
        <div>
          <div className='sidebar'>
            <Countries countries={this.state.countries}/>
          </div>
          <div className="content">
            <CountryContent countries={this.state.countries}/>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
