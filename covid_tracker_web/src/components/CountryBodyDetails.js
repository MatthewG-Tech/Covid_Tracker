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

    render() {

        //console.log(this.props.country.selected)
        if(this.props.country.selected){
            console.log(this.props.country)
            return(
                <div>
                    
                    <Line
                        options={{
                            responsive: true,
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                    ticks: {
                                        autoSkip: true,
                                        autoSkipPadding: 50,
                                        fontSize: 14,
                                    },
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontSize: 14,
                                    },
                                }]
                            },
                            legend: {
                                display: true,
                                labels: {
                                    fontSize: 14
                                }
                            },
                            title: {
                                display: true,
                                text: this.props.country.title,
                                fontStyle: 'bold',
                                fontColor: 'black',
                                fontSize: 23,
                            }
                        }}
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
                </div>
            )
        }else{
            return(null)
        }
        
    }
}

export default CountryBodyDetails
