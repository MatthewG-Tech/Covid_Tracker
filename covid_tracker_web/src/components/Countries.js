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

    handelExpanderClick(){
        console.log("expander");
    }

    setStateData=(data_from_child)=> {
        this.props.countries.forEach(country => {
            if(this.props.countries !== undefined){
                if(country.title === data_from_child.title){
                    country.selected = data_from_child.selected
                }else if(data_from_child.selected){
                    country.selected = !data_from_child.selected
                }
            }
        });
        if(this.props.countries !== undefined){
            this.props.setData(this.props.countries, !data_from_child.selected)
        }
    }
    render() {
        let list = this.props.countries.map((country) => (
            <CountryItem key={country.id} country={country} setStateData={this.setStateData.bind(this)}/>
        ));
        list.unshift(<div key={0} className='sidebarItem' id='selectType'><p>Select Type</p></div>)
        list.unshift(<div key={1} className='sidebarItem' id='expandSidebar' onClick={this.handelExpanderClick.bind(this)}><p>Expand</p></div>)
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
