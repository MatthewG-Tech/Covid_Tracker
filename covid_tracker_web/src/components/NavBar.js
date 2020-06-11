import React, { Component, createRef } from 'react'
import {
    Header,
    Sticky
  } from 'semantic-ui-react'

export class NavBar extends Component {
    getTitleStyle = () => {
        return {
            position: 'sticky',
            top: '0',
            height: '50px',
            left: '10px',
            zIndex: '1',
            backgroundColor: 'white',
            width: '100%',
            borderBottom: '1px #ccc solid'
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
//<StickyHeader header={
//    <h1 style={this.getTitleStyle()}><a href="_self">Covid Tracker</a></h1>
//}></StickyHeader>