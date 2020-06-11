import React, { Component } from 'react';
import CountryItem from './CountryItem';
import PropTypes from 'prop-types';


//Componet for all counties
export class Countries extends Component {
    render() {
        return this.props.countries.map((country) => (
            <CountryItem key={country.id} country={country}/>
        ));
    }
}

//Prop types
Countries.propTypes = {
    countries: PropTypes.array.isRequired
}

export default Countries
