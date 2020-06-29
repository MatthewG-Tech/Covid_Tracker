import React, { Component, createRef } from 'react'

export class NavBar extends Component {

    contextRef = createRef()

    //Render out nav bar
    render() {
        return (
            <h1 className="navTitle" ><a href="_self">Covid Tracker 101</a></h1>
        )
    }
}

export default NavBar