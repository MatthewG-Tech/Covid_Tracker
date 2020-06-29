import React, { Component } from 'react'

export default class SummaryView extends Component {
    //Pie chart template
    render() {
        return (
            <div>
                <br />
                    <div className="centerTitle">
                        <h3>Total {this.props.title}</h3>
                        <p>{this.props.total}</p>
                        <h3>Average Daily {this.props.title}</h3>
                        <p>(Two Weeks)</p>
                        <p>{this.props.average}</p>
                        <h3>Prediction</h3>
                        <p>If {this.props.details} continue at this rate</p>
                        <p>{this.props.details} will total {this.props.total + this.props.average * 14} in two weeks.</p>
                    </div>
            </div>
        )
    }
}