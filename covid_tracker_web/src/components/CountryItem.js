import React, { Component } from 'react'
import PropTypes from 'prop-types';

//Component for each individual country
export class CountryItem extends Component {
    //Style for each county
    getStyle = () => {
        return {
            padding: '10px',
            borderBottom: '1px #ccc dotted'
        }
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <p>{ this.props.country.title }</p>
            </div>
        )
    }
}

//Prop types
CountryItem.propTypes = {
    country: PropTypes.object.isRequired
}

export default CountryItem
