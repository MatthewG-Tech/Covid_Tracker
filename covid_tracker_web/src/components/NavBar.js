import React, { Component, createRef } from 'react'

export class NavBar extends Component {
    getTitleStyle = () => {
        return {
            height: '75px',
            padding: '15px',
            backgroundColor: 'white',
            width: '100%',
            borderBottom: '1px #ddd solid'
        }
    }

    contextRef = createRef()

    render() {
        
        return (
            <h1 style={this.getTitleStyle()}><a href="_self">Covid Tracker 101</a></h1>
        )
    }
}

export default NavBar