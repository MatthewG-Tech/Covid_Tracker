import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class PieChart extends Component {
    //Pie chart template
    render() {
        return (
            <div>
                <Pie 
                    options={{
                        title: {
                            display: true,
                            text: this.props.title,
                            fontStyle: 'bold',
                            fontColor: 'black',
                            fontSize: 23,
                        }
                    }}
                    data={{
                        labels: this.props.labels,
                        datasets: [{
                            data: this.props.data,
                            backgroundColor: this.props.color
                        }]
                    }}        
                />
                <br />
                <br />
            </div>
        )
    }
}