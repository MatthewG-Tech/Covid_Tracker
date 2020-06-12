import React, { Component } from 'react';
import CountryItem from './CountryItem';
import PropTypes from 'prop-types';


//Componet for all counties
export class Countries extends Component {
    render() {
        let list = this.props.countries.map((country) => (
            <CountryItem key={country.id} country={country}/>
        ));
        return (
            <div  className='sidebar'>
                {list}
            </div>
        );
    }
}

//Prop types
Countries.propTypes = {
    countries: PropTypes.array.isRequired
}

export default Countries
