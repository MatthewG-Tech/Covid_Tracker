import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase'


//Component for each individual country
export class CountryItem extends Component {

    state = {
        text: this.props.country.title + ' +'
    }

    handleClick(){
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        if(this.props.country.selected){
            this.props.country.selected = false;
            this.setState({
                text: this.props.country.title + ' +'
            });
            this.props.setStateData({country: this.props.country})
        }else{
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
            db.collection('cases').where('location', '==', this.props.country.title).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc){
                    data = doc.data();
                    var date = new Date(dateString);
                    var prevDate = new Date(dateString)
                    var currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() - 1)
                    while(date < currentDate){
                        var caseData = data["_" + (date.getMonth()+1) + "_" + (date.getDate()) + "_" + date.getFullYear().toString().substr(-2)];
                        //console.log(date)
                        if(caseData !== undefined){
                            let tempDate = new Date(date.getTime());
                            labels.push(monthNames[tempDate.getMonth()] + " " +tempDate.getDate());
                            totalCases = caseData;
                            if(cases.length === 0){
                                cases.push(caseData)
                            }else{
                                var sum = caseData - data["_" + (prevDate.getMonth()+1) + "_" + (prevDate.getDate()) + "_" + prevDate.getFullYear().toString().substr(-2)];
                                if(sum < 0){
                                    sum = 0;
                                }
                                cases.push(sum)
                                if(Math.ceil((currentDate - date) / (1000 * 60 * 60 * 24)) <= 14){
                                    twoWeekAverageCases += sum;
                                }
                                prevDate.setDate(prevDate.getDate() + 1)
                            }
                        }
                        date.setDate(date.getDate() + 1)
                    }
                })
            }).then(test => {
                db.collection('deaths').where('location', '==', this.props.country.title).get().then(function(querySnapshotDeaths) {
                    querySnapshotDeaths.forEach(function(doc){
                        data = doc.data();
                        var date = new Date(dateString);
                        var prevDate = new Date(dateString)
                        var currentDate = new Date();
                        currentDate.setDate(currentDate.getDate() - 1)
                        while(date < currentDate){
                            var deathData = data["_" + (date.getMonth()+1) + "_" + (date.getDate()) + "_" + date.getFullYear().toString().substr(-2)];
                            if(deathData !== undefined){
                                totalDeaths = deathData;
                                if(deaths.length === 0){
                                    deaths.push(deathData)
                                }else{
                                    var sum = deathData - data["_" + (prevDate.getMonth()+1) + "_" + (prevDate.getDate()) + "_" + prevDate.getFullYear().toString().substr(-2)]
                                    if(sum < 0){
                                        sum = 0;
                                    }
                                    deaths.push(sum)
                                    if(Math.ceil((currentDate - date) / (1000 * 60 * 60 * 24)) <= 14){
                                        twoWeekAverageDeaths += sum;
                                    }
                                    prevDate.setDate(prevDate.getDate() + 1)
                                }
                            }
                            date.setDate(date.getDate() + 1)
                        }
                    })
                }).then(test2 => {
                    this.props.country.selected = true;
                    this.props.country.cases = cases//[33, 53, 85, 41, 44, 65];
                    this.props.country.deaths = deaths//[33, 53, 85, 41, 44, 65];
                    this.props.country.labels = labels//["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
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
            })
        }
    }

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
