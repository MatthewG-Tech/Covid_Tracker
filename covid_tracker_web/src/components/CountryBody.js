import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountryBodyDetails from './CountryBodyDetails';
import { Line, Bar } from 'react-chartjs-2'


export class CountryBody extends Component {
    constructor() {
        super();
        this.state = {
            country: {
                title: "test"
            },
            home: true,
            chartData: {
                //labels: this.props.countryData[0].labels,
                datasets: [
                    {
                    label: "First dataset",
                    //data: this.props.country.cases,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                    }
                ]
            }
        }
    }

    getLineOptions(){
        var options = {
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        autoSkip: true,
                        autoSkipPadding: 75,
                        fontSize: 15,
                    },
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 15,
                    },
                    
                }],
                labelString: "test",
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontSize: 16,
                    boxWidth: 20,
                    boxHeight: 20,
                }
            },
            title: {
                display: true,
                text: "Country Data",
                fontStyle: 'bold',
                fontColor: 'black',
                fontSize: 23,
            }
        }
        return options
    }

    render() {
        if(this.props.countryData.length > 0){
            let datasets = []
            let summaryContent = []
            let i = 0
            this.props.countryData.forEach((country) => {
                country["key"] = i++
                datasets.push({
                    label: country.title + " Daily Positive Cases",
                    data: country.cases,
                    fill: true,
                    
                    backgroundColor: country.color.shadeCases,
                    borderColor: country.color.lineCases
                })
                datasets.push({
                    label: country.title + " Daily Deaths",
                    data: country.deaths,
                    fill: true,
                    backgroundColor: country.color.shadeDeaths,
                    borderColor: country.color.lineDeaths
                })
                summaryContent.push(
                    <div key={i} className="summary">
                            <hr />
                            <br />
                            <h2 className="centerTitle">{country.title}</h2>
                            <div className="leftSide">
                                <h3>Total Cases</h3>
                                <p>{country.totalCases}</p>
                                <h3>Average Daily Cases</h3>
                                <p>(Two Weeks)</p>
                                <p>{country.averageDailyCases}</p>
                            </div>
                            <div className="rightSide">
                                <h3>Total Deaths</h3>
                                <p>{country.totalDeaths}</p>
                                <h3>Average Daily Deaths</h3>
                                <p>(Two Weeks)</p>
                                <p>{country.averageDailyDeaths}</p>
                            </div>
                    </div>
                )
            })
            return(
                <div className="contentBody">
                    <div className="largeTable">
                        <Line
                            options={this.getLineOptions()}
                            data={{
                                labels: this.props.countryData[0].labels,
                                datasets: datasets
                            }}
                        />
                    </div>
                    {summaryContent}
                
                </div>
            )
        }else{
            return(
                <div className="contentBody">
                    <p>Select a country from the sidebar.</p>
                </div>
            )
        }
    }
}

//Prop types
CountryBody.propTypes = {
    countries: PropTypes.array.isRequired
}

export default CountryBody
