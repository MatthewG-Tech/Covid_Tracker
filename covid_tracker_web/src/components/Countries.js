import React, { Component } from 'react';
import CountryItem from './CountryItem';
import PropTypes from 'prop-types';

//Componet for all counties
export class Countries extends Component {
    constructor(){
        super();
        this.setStateData = this.setStateData.bind(this)
        this.state ={
            home: true
        }
    }

    //Set state when data is changed in componnet
    setStateData=(data_from_child)=> {
        this.props.countries.forEach(country => {
            if(this.props.countries !== undefined){
                if(country.title === data_from_child.country.title){
                    country.selected = data_from_child.country.selected
                }else if(data_from_child.selected){
                    country.selected = !data_from_child.country.selected
                }
            }
        });
        if(this.props.countries !== undefined){
            this.props.setData({countries: this.props.countries, home: !data_from_child.country.selected, countryName: data_from_child.country.title, data: data_from_child.data})
        }
    }

    //Render out country items
    render() {
        let list = this.props.countries.map((country) => (
            <CountryItem key={country.id} country={country} setStateData={this.setStateData.bind(this)}/>
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
