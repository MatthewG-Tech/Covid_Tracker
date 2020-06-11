import React, { Component } from 'react'
import PropTypes from 'prop-types';

//Component for each individual country
export class CountryItem extends Component {
    //Style for each county
    getStyle = () => {
        return {
            padding: '10px',
            borderBottom: '1px #ddd solid',
            textAlign: 'center',
        }
    }

    handleClick(){
        console.log(this.props.country.title);
        this.props.country.selected = true;
        console.log(this.props.country.selected);
    }

    render() {
        
        return (
            <div className='listItem' style={this.getStyle()} onClick={this.handleClick.bind(this)}>
                <p >{ this.props.country.title }</p>
            </div>
        )
    }
}

//Prop types
CountryItem.propTypes = {
    country: PropTypes.object.isRequired
}

export default CountryItem
