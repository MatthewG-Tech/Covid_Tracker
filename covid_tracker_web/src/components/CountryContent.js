import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CountryContent extends Component {
    getLeftStyle = () => {
        return {
            width: '50%',
            float: 'left',
            bottom: 0,
        }
    }
    getRightStyle = () => {
        return {
            width: '50%',
            leftMagin: '200px',
            float: 'left',
            textAlign: 'right',
            paddingTop: '9px',
        }
    }

    render() {
        return(
            <div>
                <div>
                    <h2 style={this.getLeftStyle()}>Country Data</h2>
                    <p style={this.getRightStyle()}>Last updated at: </p>
                </div>
            </div>
        )
    }
}

export default CountryContent
