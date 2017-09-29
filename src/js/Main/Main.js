import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar.js'

/**
 * Login and sign up page
 */

export default class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let path = this.props.location.pathname;
        return(
            <div className="main">
                <NavBar />
            </div>
        );
    }


}