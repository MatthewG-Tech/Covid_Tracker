import React, { Component } from 'react';
import './App.css';
import Countries from './components/Countries.js';
import NavBar from './components/NavBar.js';

export class App extends Component {
  state = {
    countries: [
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      }
    ]
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <div>
          <div class='sidebar'>
            <Countries countries={this.state.countries}/>
          </div>
          <div class="content">
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
