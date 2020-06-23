import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

export class CountryBodyDetails extends Component {
    
    state = {
        chartData: {
            labels: this.props.country.labels,
            datasets: [
                {
                label: "First dataset",
                data: this.props.country.cases,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
                }
            ]
        }
    }

    getOptions(){
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
                labels: {
                    fontSize: 16,
                }
            },
            title: {
                display: true,
                text: this.props.country.title,
                fontStyle: 'bold',
                fontColor: 'black',
                fontSize: 23,
            }
        }
        return options
    }

    render() {
        //Set up Line graph and summary
        if(this.props.country.selected){
            console.log(this.props.country)
            return(
                <div>
                    <Line
                        options={{responsive: true,
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                    ticks: {
                                        autoSkip: true,
                                        autoSkipPadding: 50,
                                        fontSize: 16,
                                    },
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontSize: 16,
                                    },
                                }]
                            },
                            legend: {
                                display: true,
                                labels: {
                                    fontSize: 16,
                                }
                            },
                            title: {
                                display: true,
                                text: this.props.country.title,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                fontSize: 23,
                            }}}
                        data={{
                            labels: this.props.country.labels,
                            datasets: [
                                {
                                    label: this.props.country.title + " Daily Positive Cases",
                                    data: this.props.country.cases,
                                    fill: true,
                                    backgroundColor: "rgba(75,192,192,0.2)",
                                    borderColor: "rgba(75,192,192,1)"
                                },
                                {
                                    label: this.props.country.title + " Daily Deaths",
                                    data: this.props.country.deaths,
                                    fill: true,
                                    backgroundColor: "rgba(192,192,75,0.2)",
                                    borderColor: "rgba(192,192,75,1)"
                                }
                            ]
                        }}
                    />
                    <div className="summary">
                        <div className="leftSide">
                            <h3>Total Cases</h3>
                            <p>{this.props.country.totalCases}</p>
                            <h3>Average Daily Cases</h3>
                            <p>(Two Weeks)</p>
                            <p>{this.props.country.averageDailyCases}</p>
                        </div>
                        <div className="rightSide">
                            <h3>Total Deaths</h3>
                            <p>{this.props.country.totalDeaths}</p>
                            <h3>Average Daily Deaths</h3>
                            <p>(Two Weeks)</p>
                            <p>{this.props.country.averageDailyDeaths}</p>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(null)
        }
        
    }
}

export default CountryBodyDetails
