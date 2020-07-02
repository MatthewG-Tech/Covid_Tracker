import React, { Component } from 'react'

export default class HomePage extends Component {
    //Home page to be shown when no country is selected
    render() {
        return (
            <div className="contentBody">
                <p>To get started, select a state from the sidebar. Multiple states can be added to compare data.</p>
                <br />
                <p>This website contains data form each state detailing cases and deaths from Covid-19. Each state is broken down to see cases and deaths over time. Additional graphs are provided to see a comparison of cases/deaths per 10,000 and what percentage of cases and deaths each state makes up the US. The data presented here is for public use. The accuracy of this data is not guaranteed.</p>
                <br />
                <p>Data on this website comes from <a href="https://covidtracking.com">covidtracking.com</a></p>
            </div>
        )
    }
}