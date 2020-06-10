import React, { Component } from 'react'
import './StateItem';

//Component for States
export class States extends Component {
    render() {
        return (
            <div>
                <p>{ this.props.country.title }</p>
            </div>
        )
    }
}

export default States
