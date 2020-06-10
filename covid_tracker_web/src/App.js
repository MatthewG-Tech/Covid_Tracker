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
      },
      {
        id: 1,
        title: 'USAc',
      },
      {
        id: 2,
        title: 'Canadac',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
      {
        id: 1,
        title: 'USA',
      },
      {
        id: 2,
        title: 'Canada',
      },
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
        <Countries style={{width: '10%'}} countries={this.state.countries}/>
        <Countries countries={this.state.countries}/>
      </div>
    );
  }
}

export default App;
