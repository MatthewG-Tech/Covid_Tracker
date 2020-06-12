import React, { Component } from 'react';
import CountryItem from './CountryItem';
import PropTypes from 'prop-types';


//Componet for all counties
export class Countries extends Component {
    handelClick(){
        console.log("expander");
    }

    render() {
        let list = this.props.countries.map((country) => (
            <CountryItem key={country.id} country={country}/>
        ));
        list.unshift(<div className='sidebarItem' id='selectType'><p>Select Type</p></div>)
        list.unshift(<div className='sidebarItem' id='expandSidebar' onClick={this.handelClick}><p>Expand</p></div>)
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
