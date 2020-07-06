// Imports the Google Cloud client library
const admin = require('firebase-admin');
const fetch = require('node-fetch');

// Imports scheduler
var schedule = require('node-schedule');

// Pathway to service key
let serviceAccount = require('./covid-tracker-101-fd0e87e6a712.json');

// Initilize the database
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
  
let db = admin.firestore();

// Set state map
let stateMap = new Map()

stateMap.set("AL","Alabama")
stateMap.set("AK", "Alaska")
stateMap.set("AZ", "Arizona")
stateMap.set("AR", "Arkansas")
stateMap.set("CA", "California")
stateMap.set("CO", "Colorado")
stateMap.set("CT", "Connecticut")
stateMap.set("DE", "Delaware")
stateMap.set("FL", "Florida")
stateMap.set("GA", "Georgia")
stateMap.set("HI", "Hawaii") 
stateMap.set("ID", "Idaho") 
stateMap.set("IL", "Illinois")
stateMap.set("IN", "Indiana")
stateMap.set("IA", "Iowa")
stateMap.set("KS", "Kansas")
stateMap.set("KY", "Kentucky")
stateMap.set("LA", "Louisiana")
stateMap.set("ME", "Maine")
stateMap.set("MD", "Maryland")
stateMap.set("MA", "Massachusetts")
stateMap.set("MI", "Michigan")
stateMap.set("MN", "Minnesota")
stateMap.set("MS", "Mississippi")
stateMap.set("MO", "Missouri")
stateMap.set("MT", "Montana")
stateMap.set("NE", "Nebraska")
stateMap.set("NV", "Nevada")
stateMap.set("NH", "New Hampshire")
stateMap.set("NM", "New Mexico")
stateMap.set("NY", "New York")
stateMap.set("NC", "North Carolina")
stateMap.set("ND", "North Dakota")
stateMap.set("OH", "Ohio")
stateMap.set("OK", "Oklahoma")
stateMap.set("OR", "Oregon")
stateMap.set("PA", "Pennsylvania")
stateMap.set("RI", "Rhode Island")
stateMap.set("SC", "South Carolina")
stateMap.set("SD", "South Dakota")
stateMap.set("TN", "Tennessee")
stateMap.set("UT", "Utah")
stateMap.set("VT", "Vermont")
stateMap.set("VA", "Virginia")
stateMap.set("WV", "West Virginia")
stateMap.set("WI", "Wisconsin")
stateMap.set("WY", "Wyoming")


function updateData(){
    let url = "https://covidtracking.com/api/v1/states/current.json"
    let settings = { method: "Get" };
    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            console.log("Get data")
            let data = {}
            json.forEach(stateItem => {
                let deaths = stateItem['death']
                if(deaths == null){
                    deaths = 0
                }
                data['_' + Math.floor((stateItem['date']/100)%100) + '_' + (stateItem['date']%100) + '_20_deaths'] = deaths
                let cases = stateItem['positive']
                if(cases == null){
                    cases = 0
                }
                data['_' + Math.floor((stateItem['date']/100)%100) + '_' + (stateItem['date']%100) + '_20_cases'] = cases
                
                let negative = stateItem['negative']
                if(negative == null){
                    negative = 0
                }
                data['_' + Math.floor((stateItem['date']/100)%100) + '_' + (stateItem['date']%100) + '_20_test'] = cases + negative
                db.collection('states').doc(stateItem['state']).update(data)
                
            });
            //db.collection('states').doc(state).update(data)
            console.log("Data added")
        });
}
function setTotal(){
    let url = "https://covidtracking.com/api/v1/us/current.json";
    let settings = { method: "Get" };

    let totalCases = 0
    let totalDeaths = 0
    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            console.log("Get total data")
            let data = {}
            json.forEach(stateItem => {
                let deaths = stateItem['death']
                if(deaths == null){
                    deaths = 0
                }
                totalDeaths += deaths
                let cases = stateItem['positive']
                if(cases == null){
                    cases = 0
                }
                totalCases += cases
            });
            db.collection('total').doc('states').update({totalDeaths: totalDeaths, totalCases: totalCases})
            console.log("Total set")
        });
}
updateData();
setTotal();
var morningScheduler = schedule.scheduleJob('0 30 17 * * *', function(){
    updateData();
    setTotal();
    console.log("Scheduler ran");
});
