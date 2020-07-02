import React, { Component } from 'react'

export default class SummaryView extends Component {
    //Summary template
    formatNumberString(number){
        if(number/1000 >= 1){
            console.log(number/1000)
            console.log(number%1000)
            if(number % 1000 < 100){
                return this.formatNumberString(Math.floor(number/1000)) + ",0" + number % 1000
            }else{
                return this.formatNumberString(Math.floor(number/1000)) + "," + number % 1000
            }
        }else{
            console.log("return")
            return number
        }
    }
    render() {
        let total = this.props.total
        let average = this.props.average
        let prediction = this.props.total + this.props.average * 14
        return (
            <div>
                <br />
                    <div className="centerTitle">
                        <h3>Total {this.props.title}</h3>
                        <p>{this.formatNumberString(total)}</p>
                        <h3>Average Daily {this.props.title}</h3>
                        <p>(Two Weeks)</p>
                        <p>{this.formatNumberString(average)}</p>
                        <h3>Prediction</h3>
                        <p>If {this.props.details} continue at this rate</p>
                        <p>{this.props.details} will total {this.formatNumberString(prediction)} in two weeks.</p>
                    </div>
            </div>
        )
    }
}