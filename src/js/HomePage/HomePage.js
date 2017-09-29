import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar.js'

/**
 * Login and sign up page
 */

export default class HomePage extends Component{
    constructor(props){
        super(props);

        this.state = {
            formType: 'login'
        }
    }

    render(){
        let path = this.props.location.pathname;
        return(
            <div className="homepage">
                <NavBar />
            </div>
        );
    }


}