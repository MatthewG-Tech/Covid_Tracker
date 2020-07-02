import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase'


//Component for each individual country
export class CountryItem extends Component {

    state = {
        text: this.props.country.title + ' +'
    }

    //On click get data
    handleClick(){
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        if(this.props.country.selected){
            //If item is being unselected do this
            this.props.country.selected = false;
            this.setState({
                text: this.props.country.title + ' +'
            });
            this.props.setStateData({country: this.props.country})
        }else{
            //Else first grab state data
            this.setState({
                text: this.props.country.title + ' -'
            });
            var db = firebase.firestore();
            var data;
            var labels = [];
            var cases = [];
            var deaths = [];
            var totalDeaths = 0;
            var twoWeekAverageDeaths = 0;
            var totalCases = 0
            var twoWeekAverageCases = 0;
            var dateString = "March 1, 2020"
            db.collection('states').where('location', '==', this.props.country.title).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc){
                    data = doc.data()
                    var date = new Date(dateString);
                    var prevDate = new Date(dateString)
                    var currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() - 1)
                    while(date < currentDate){
                        var caseData = data["_" + (date.getMonth()+1) + "_" + (date.getDate()) + "_" + date.getFullYear().toString().substr(-2) + "_cases"];
                        var deathData = data["_" + (date.getMonth()+1) + "_" + (date.getDate()) + "_" + date.getFullYear().toString().substr(-2) + "_deaths"];
                        if(caseData !== undefined){
                            let tempDate = new Date(date.getTime());
                            labels.push(monthNames[tempDate.getMonth()] + " " +tempDate.getDate());
                            totalCases = caseData;
                            totalDeaths = deathData;
                            if(cases.length === 0){
                                cases.push(caseData)
                                deaths.push(deathData)
                            }else{
                                var caseSum = caseData - data["_" + (prevDate.getMonth()+1) + "_" + (prevDate.getDate()) + "_" + prevDate.getFullYear().toString().substr(-2) + "_cases"];
                                if(caseSum < 0){
                                    caseSum = 0;
                                }
                                var deathSum = deathData - data["_" + (prevDate.getMonth()+1) + "_" + (prevDate.getDate()) + "_" + prevDate.getFullYear().toString().substr(-2) + "_deaths"]
                                    if(deathSum < 0){
                                        deathSum = 0;
                                    }
                                cases.push(caseSum)
                                deaths.push(deathSum)
                                if(Math.ceil((currentDate - date) / (1000 * 60 * 60 * 24)) <= 14){
                                    twoWeekAverageCases += caseSum;
                                    twoWeekAverageDeaths += deathSum;
                                }
                                prevDate.setDate(prevDate.getDate() + 1)
                            }
                        }
                        date.setDate(date.getDate() + 1)
                    }
                })
            }).then(send => {
                this.props.country.selected = true
                this.props.country.cases = cases
                this.props.country.deaths = deaths
                this.props.country.labels = labels
                this.props.country.totalCases = totalCases
                this.props.country.totalDeaths = totalDeaths
                this.props.country.averageDailyDeaths = Math.floor(twoWeekAverageDeaths/14)
                this.props.country.averageDailyCases = Math.floor(twoWeekAverageCases/14)
                var caseData = {
                    title: this.props.country.title,
                    cases: cases,
                    deaths: deaths,
                    labels: labels,
                    totalCases: totalCases,
                    totalDeaths: totalDeaths,
                    averageDailyCases: Math.floor(twoWeekAverageCases/14),
                    averageDailyDeaths: Math.floor(twoWeekAverageDeaths/14),
                }
                this.props.setStateData({country: this.props.country, data: caseData})
            })
        }
    }

    //Dependant on if item is selected render out diffrently
    render() {
        if(this.props.country.selected){
            return (
                <div className='sidebarItem' id="selectedItem" onClick={this.handleClick.bind(this)}>
                    <p >{this.props.country.title}</p>
                </div>
            )
        }else{
            return (
                <div className='sidebarItem' onClick={this.handleClick.bind(this)}>
                    <p >{this.props.country.title}</p>
                </div>
            )
        }
    }
}

//Prop types
CountryItem.propTypes = {
    country: PropTypes.object.isRequired
}

export default CountryItem
