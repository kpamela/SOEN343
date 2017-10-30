import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar.js'

/**
 * This class is rendered on every page
 */

export default class Main extends Component{
    constructor(props){
        super(props);
    }

    //
    render(){
        let path = this.props.location.pathname;
        return(
            <div className="main">
                <NavBar />
                <footer>SOEN 343 Team 15 Project</footer>
            </div>
        );
    }


}