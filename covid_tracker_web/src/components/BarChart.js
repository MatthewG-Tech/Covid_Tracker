import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

export default class BarChart extends Component {
    getBarOptions(){
        var options = {
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        autoSkip: false,
                        autoSkipPadding: 75,
                        fontSize: 15,
                    },
                }],
                yAxes: [{
                    ticks: {
                        autoSkip: false,
                        fontSize: 15,
                        beginAtZero: true
                    },
                }],
                labelString: "test",
            },
            legend: {
                display: false,
                position: 'right',
                labels: {
                    fontSize: 16,
                    boxWidth: 20,
                    boxHeight: 20,
                }
            },
            title: {
                display: true,
                text: "Case and Death Statistics",
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
            <Bar
                options={this.getBarOptions()}
                data = {{
                    labels: this.props.labels,
                    datasets: [{
                        data: this.props.data,
                        backgroundColor: this.props.colors
                    }]
                }}
            />
        )
    }
}