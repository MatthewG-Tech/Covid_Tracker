  // Imports the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');

// Creates a client
const bigquery = new BigQuery();

const query = 'SELECT country_region, SUM(confirmed) FROM `bigquery-public-data.covid19_jhu_csse.summary` group by country_region LIMIT 1000';

bigquery.query(query, function(err, rows) {
if (!err) {
    // rows is an array of results.
    console.log(rows);
}
});

