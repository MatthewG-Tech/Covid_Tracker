import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line, Bar, Pie } from 'react-chartjs-2'


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

    render() {
        if(this.props.countryData.length > 0){
            let lineDatasets = []
            let summaryContent = []
            let i = 0
            let barLables = []
            let barColors = []
            let barData = []
            let pieCaseData = [this.props.totals.cases]
            let pieCaseColor = ["grey"]
            let pieCaseLabels = ["World"]
            let pieDeathData = [this.props.totals.deaths]
            let pieDeathColor = ["grey"]
            let pieDeathLabels = ["World"]
            this.props.countryData.forEach((country) => {
                country["key"] = i++
                lineDatasets.push({
                    label: country.title + " Daily Positive Cases",
                    data: country.cases,
                    fill: true,
                    backgroundColor: country.color.shadeCases,
                    borderColor: country.color.lineCases
                })
                lineDatasets.push({
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
                                <h3>Prediction</h3>
                                <p>If cases continue at this rate</p>
                                <p>cases will total: {country.totalCases + country.averageDailyCases * 14} in two weeks.</p>
                            </div>
                            <div className="rightSide">
                                <h3>Total Deaths</h3>
                                <p>{country.totalDeaths}</p>
                                <h3>Average Daily Deaths</h3>
                                <p>(Two Weeks)</p>
                                <p>{country.averageDailyDeaths}</p>
                                <h3>Prediction</h3>
                                <p>If deaths continue at this rate</p>
                                <p>deaths will total: {country.totalDeaths + country.averageDailyDeaths * 14} in two weeks.</p>
                            </div>
                    </div>
                )
                barLables.push(
                    country.title + " Cases Per 100K"
                )
                barColors.push(
                    country.color.lineCases
                )
                barData.push(
                    (country.totalCases/100000)
                )
                barLables.push(
                    country.title + " Deaths Per 100K"
                )
                barColors.push(
                    country.color.lineDeaths
                )
                barData.push(
                    (country.totalDeaths/100000)
                )
                pieCaseData.push(country.totalCases)
                pieDeathData.push(country.totalDeaths)
                pieCaseLabels.push(country.title)
                pieDeathLabels.push(country.title)
                pieCaseColor.push(country.color.lineCases)
                pieDeathColor.push(country.color.lineDeaths)
            })
            return(
                <div className="contentBody">
                    <div className="largeTable">
                        <Line
                            options={this.getLineOptions()}
                            data={{
                                labels: this.props.countryData[0].labels,
                                datasets: lineDatasets
                            }}
                        />
                    </div>
                    {summaryContent}
                    <br />
                    <hr />
                    <br />
                    <Bar
                        options={this.getBarOptions()}
                        data = {{
                            labels: barLables,
                            datasets: [{
                                data: barData,
                                backgroundColor: barColors
                            }]
                        }}
                    />
                    <br />
                    <hr />
                    <br />
                    <div>
                        <div>
                            <Pie 
                                options={{
                                    title: {
                                        display: true,
                                        text: "Cases Compared to the World",
                                        fontStyle: 'bold',
                                        fontColor: 'black',
                                        fontSize: 23,
                                    }
                                }}
                                data={{
                                    labels: pieCaseLabels,
                                    datasets: [{
                                        data: pieCaseData,
                                        backgroundColor: pieCaseColor,
                                    }]
                                }}        
                            />
                        </div>
                        <div>
                            <Pie 
                                options={{
                                    title: {
                                        display: true,
                                        text: "Deaths Compared to the World",
                                        fontStyle: 'bold',
                                        fontColor: 'black',
                                        fontSize: 23,
                                    }
                                }}
                                data={{
                                    labels: pieDeathLabels,
                                    datasets: [{
                                        data: pieDeathData,
                                        backgroundColor: pieDeathColor
                                    }]
                                }}        
                            />
                            <br />
                            <br />
                        </div>
                        <br />
                    </div>
                    <br />
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
