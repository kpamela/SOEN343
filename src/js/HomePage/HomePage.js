import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import LoginModal from '../NavBar/LoginModal';
import Catalogue from '../Dashboard/Catalogue.js';
/**
 * HomePage rendered by going to path "/"
 */

export default class HomePage extends Component{
    constructor(props){
        super(props);

        this.state = {
            viewCatalog: false
        }

        this.handleViewCatalogClick = this.handleViewCatalogClick.bind(this);
    }

    handleViewCatalogClick(){
        this.setState({viewCatalog: true});
    }

    componentWillUnmount(){
        this.setState({viewCatalog: false});
    }

    render(){
        if(this.state.viewCatalog){
            return(
                <Redirect to="/ClientDashboard" />
            );
        }
        else{
            return (
                <div className="HomePage-Container">
                    <Jumbotron className="HomePage-Jumbotron">
                        <h1>TecMarket</h1>
                        <p>Online Electronics Store</p>
                        <Button bsStyle="primary" onClick={this.handleViewCatalogClick}>View Catalog</Button>
                    </Jumbotron>
                </div>
            );
        }
    }


}