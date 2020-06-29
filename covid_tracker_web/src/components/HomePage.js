import React, { Component } from 'react'

export default class HomePage extends Component {
    //Home page to be shown when no country is selected
    render() {
        return (
            <div className="contentBody">
                <p>To get started, select a country from the sidebar. Multiple countries can be added to compare data.</p>
                <br />
                <p>This website contains data form each country detailing cases and deaths from Covid-19. Each country is broken down to see cases and deaths over time. Additional graphs are provided to see a comparison of cases/deaths per 100,000 and what percentage of cases and deaths each country takes up in the world. The data presented here is for academic purposes and should not be used anything other than educational purposes. The accuracy of this data is not guaranteed.</p>
                <br />
                <p>Case data comes from the Johns Hopkins University Center for Systems Science and Engineering. <a href="https://github.com/CSSEGISandData/COVID-19">(https://github.com/CSSEGISandData/COVID-19)</a></p>
            </div>
        )
    }
}