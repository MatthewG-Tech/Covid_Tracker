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
    db.collection('total').get().then((querySnapshot) => {
      var totalCases
      var totalDeaths
      querySnapshot.forEach((doc) => {
        var data = doc.data();
        totalCases = data['cases']
        totalDeaths = data['deaths']
      });
      this.setState({
        totals: {cases: totalCases, deaths: totalDeaths}
      })
    });
  }

  setData=(data_from_child)=>{
    if(data_from_child !== undefined){
      let tempArr = this.state.countryData
      if(data_from_child.data !== undefined){
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        let r1 = Math.floor(Math.random() * 255)
        let g1 = Math.floor(Math.random() * 255)
        let b1 = Math.floor(Math.random() * 255)
        data_from_child.data["color"] = {
          shadeCases: "rgba("+r+","+g+","+b+",0.2)",
          lineCases: "rgba("+r+","+g+","+b+",1)",
          shadeDeaths: "rgba("+r1+","+g1+","+b1+",0.2)",
          lineDeaths: "rgba("+r1+","+g1+","+b1+",1)"
        }
        tempArr.push(data_from_child.data)
      }else{
        let i = 0
        let index = i
        tempArr.forEach((country) => {
          if(country.title == data_from_child.countryName){
            tempArr.splice(i, i+1)
          }
          i++
        })
      } 
      this.setState({
        countries: data_from_child.countries,
        countryData: tempArr,
        home: data_from_child.home
      });
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="mainContent">
          <Countries countries={this.state.countries} setData={this.setData.bind(this)}/>
          <div style={ {top: '75px', paddingTop: '75px'} }>
            <CountryHeader />
            <CountryBody countries={this.state.countries} home={this.state.home} countryData={this.state.countryData} totals={this.state.totals}/>
          </div>
        </div>
        <div className="needBiggerScreen">
          <div className="contentBody">
            <h3>Screen Size</h3>
            <br />
            <p>To access the content on this page, you need to expand your window if you are on a desktop or move your phone to the horizontal position. For the graphs to be displayed correctly, the screen size needs to increase.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
