// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const admin = require('firebase-admin');

// Imports scheduler
var schedule = require('node-schedule');

// Pathway to service key
let serviceAccount = require('./covid-tracker-101-fd0e87e6a712.json');

// Initilize the database
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
  
let db = admin.firestore();

// Set global date
var date = new Date();
var month = date.getMonth() + 1
var day = date.getDate() - 1

// Add deaths to the data base
function addDeaths(){
    try{
        // Get the Query
        const bigquery = new BigQuery();

        const query = 'SELECT ' + 'SUM(_' + month + '_' + day + '_20), ' + ' country_region FROM `bigquery-public-data.covid19_jhu_csse.deaths` group by country_region order by 1 DESC';

        bigquery.query(query, function(err, rows) {
            if (!err) {
                // Go through and add data
                for(let i = 0; i < rows.length; i++){
                    let data = {}
                    data['_' + month + '_' + day + '_20'] = rows[i]["f0_"]
                    db.collection('deaths').doc(rows[i]['country_region']).update(data)
                }
            }
            console.log(err)
        });
        console.log("Add deaths")
    }catch(e){
        console.error(e);
    }
}

// Add cases
function addCases(){
    try{
        // Get the Query
        const bigquery = new BigQuery();

        const query = 'SELECT ' + 'SUM(_' + month + '_' + day + '_20), ' + ' country_region FROM `bigquery-public-data.covid19_jhu_csse.confirmed_cases` group by country_region order by 1 DESC';

        bigquery.query(query, function(err, rows) {
            if (!err) {
                // Go through and add data
                for(let i = 0; i < rows.length; i++){
                    let data = {}
                    data['_' + month + '_' + day + '_20'] = rows[i]["f0_"]
                    db.collection('cases').doc(rows[i]['country_region']).update(data)
                }
            }
            console.log(err)
        });
        console.log("Add cases")
    }catch(e){
        console.error(e);
    }
}
var deathsScheduler = schedule.scheduleJob('0 0 1 * * *', function(){
    addDeaths();
    addCases();
    console.log("Seceduler ran");
});