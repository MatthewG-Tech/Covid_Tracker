import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

export default class LineChart extends Component {
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
                display: false,
                position: 'bottom',
                
                labels: {
                    fullWidth: true,
                    fontSize: 16,
                    boxWidth: 20,
                    boxHeight: 20,
                }
            },
            title: {
                display: true,
                text: this.props.title,
                fontStyle: 'bold',
                fontColor: 'black',
                fontSize: 23,
            }
        }
        return options
    }
    //Bar chart template
    render() {
        return(
            <div className="largeTable">
                <Line
                    options={this.getLineOptions()}
                    data={{
                        labels: this.props.labels,
                        datasets: this.props.datasets
                    }}
                />
            </div>
        )
    }
}