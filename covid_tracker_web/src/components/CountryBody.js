import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomePage from './HomePage';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import SummaryView from './SummaryView';


export class CountryBody extends Component {
    //Initial data
    constructor() {
        super();
        this.state = {
            country: {
                title: "test"
            },
            home: true,
            chartData: {
                datasets: [
                    {
                        label: "First dataset",
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)"
                    }
                ]
            }
        }
    }

    render() {
        //format all data
        if(this.props.countryData.length > 0){
            let lineCaseDatasets = []
            let lineDeathDatasets = []
            let summaryContent = []
            let i = 0
            let barLables = []
            let barColors = []
            let barData = []
            let pieCaseData = [this.props.totals.cases]
            let pieCaseColor = ["grey"]
            let pieCaseLabels = ["US"]
            let pieDeathData = [this.props.totals.deaths]
            let pieDeathColor = ["grey"]
            let pieDeathLabels = ["US"]
            this.props.countryData.forEach((country) => {
                country["key"] = i++
                lineCaseDatasets.push({
                    label: country.title + " Daily Positive Cases",
                    data: country.cases,
                    fill: true,
                    backgroundColor: country.color.shadeCases,
                    borderColor: country.color.lineCases
                })
                lineDeathDatasets.push({
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
                            <SummaryView title="Cases" details="cases" total={country.totalCases} average={country.averageDailyCases}/>
                            <SummaryView title="Deaths" details="deaths" total={country.totalDeaths} average={country.averageDailyDeaths}/>
                    </div>
                )
                barLables.push(
                    country.title + " Cases Per 10K"
                )
                barColors.push(
                    country.color.lineCases
                )
                barData.push(
                    (country.totalCases/10000)
                )
                barLables.push(
                    country.title + " Deaths Per 10K"
                )
                barColors.push(
                    country.color.lineDeaths
                )
                barData.push(
                    (country.totalDeaths/10000)
                )
                pieCaseData[0] = pieCaseData[0] - country.totalCases
                pieCaseData.push(country.totalCases)
                pieDeathData[0] = pieDeathData[0] - country.totalDeaths
                pieDeathData.push(country.totalDeaths)
                pieCaseLabels.push(country.title)
                pieDeathLabels.push(country.title)
                pieCaseColor.push(country.color.lineCases)
                pieDeathColor.push(country.color.lineDeaths)
            })
            //Render out all components
            return(
                <div className="contentBody">
                    <LineChart labels={this.props.countryData[0].labels} datasets={lineCaseDatasets} title={"Case Data"}/>
                    <LineChart labels={this.props.countryData[0].labels} datasets={lineDeathDatasets} title={"Death Data"}/>
                    {summaryContent}
                    <br /><hr /><br />
                    <BarChart labels={barLables} data={barData} colors={barColors}/>
                    <br /><hr /><br />
                    <div>
                        <PieChart title="Cases Compared to the US" labels={pieCaseLabels} data={pieCaseData} color={pieCaseColor}/>
                        <PieChart title="Deaths Compared to the US" labels={pieDeathLabels} data={pieDeathData} color={pieDeathColor}/>
                        <br />
                    </div>
                    <br />
                </div>
            )
        }else{
            //Home page
            return(
                <HomePage />
            )
        }
    }
}

//Prop types
CountryBody.propTypes = {
    countries: PropTypes.array.isRequired
}

export default CountryBody
