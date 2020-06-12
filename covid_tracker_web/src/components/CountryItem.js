import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Component for each individual country
export class CountryItem extends Component {
    //Style for each county
    getStyle = () => {
        return {
            //padding: '10px',
            //borderBottom: '1px #ddd solid',
            //textAlign: 'center',
        }
    }

    state = {
        text: this.props.country.title + ' +'
    }

    handleClick(){
        if(this.props.country.selected){
            this.props.country.selected = false;
            this.setState({
                text: this.props.country.title + ' +'
            });
            //this.props.country.setState({
            //    selected: false
            //});
        }else{
            this.props.country.selected = true;
            this.setState({
                text: this.props.country.title + ' -'
            });
            //this.props.country.setState({
            //    selected: true
            //});
        }
        
    }

    render() {
        if(this.props.country.selected){
            return (
                <div className='sidebarItem' style={this.getStyle()} onClick={this.handleClick.bind(this)}>
                    <p >{this.props.country.title + ' -'}</p>
                </div>
            )
        }else{
            return (
                <div className='sidebarItem' style={this.getStyle()} onClick={this.handleClick.bind(this)}>
                    <p >{this.state.text}</p>
                </div>
            )
        }
    }
}

//Prop types
CountryItem.propTypes = {
    country: PropTypes.object.isRequired
}

export default CountryItem
