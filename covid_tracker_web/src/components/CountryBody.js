import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountryBodyDetails from './CountryBodyDetails';


export class CountryBody extends Component {
    constructor() {
        super();
        this.state = {
            country: {
                title: "test"
            },
            home: true
        }
    }

    render() {
        let list = this.props.countries.map((country) => (
            <CountryBodyDetails key={country.id} country={country}/>
        ));
        if(this.props.home){
            return (
                <div className="contentBody">
                    <p>Select a country from the sidebar.</p>
                    {list}
                </div>
            )
        }else{
            return (
                <div className="contentBody">
                    {list}
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
