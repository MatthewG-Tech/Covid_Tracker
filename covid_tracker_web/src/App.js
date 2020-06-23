import React, { Component } from 'react';
import './App.css';
import Countries from './components/Countries.js';
import NavBar from './components/NavBar.js';
import CountryHeader from './components/CountryHeader.js';
import CountryBody from './components/CountryBody.js';
import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyAbHtUNedmEqLlLb3jGKWgTbyWplZyCXZI",
  authDomain: "covid-tracker-101.firebaseapp.com",
  databaseURL: "https://covid-tracker-101.firebaseio.com",
  projectId: "covid-tracker-101",
  storageBucket: "covid-tracker-101.appspot.com",
  messagingSenderId: "106196208586",
  appId: "1:106196208586:web:7f54f7df862be2352ddd33",
  measurementId: "G-7Y96K4BXZC"
});

export class App extends Component {
  // Initialize Cloud Firestore through Firebase
  constructor() {
    super();
    this.state = {
      countries: [
  
      ],
      countryData : [],
      home: true
    }
  }

  componentDidMount() {
    var db = firebase.firestore();
    var cont = []
    var i = 2;
    db.collection('locations').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var data = doc.data();
        data['countries'].forEach((country => {
          cont.push({
            id:i,
            title: country,
            selected: false
          });
          i++;
        }))
        
      });
      this.setState({
        countries: cont
      })
    });
  }

  setData=(data_from_child, home)=>{
    console.log(home)
    if(data_from_child !== undefined){
      let tempArr = this.state.countryData;
      data_from_child.forEach((country) => {
        tempArr.push(country)
      })
      this.setState({
        countries: data_from_child,
        countryData: tempArr,
        home: home
      });
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div>
          <Countries countries={this.state.countries} setData={this.setData.bind(this)}/>
          <div style={ {top: '75px', paddingTop: '75px'} }>
            <CountryHeader />
            <CountryBody countries={this.state.countries} home={this.state.home}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
