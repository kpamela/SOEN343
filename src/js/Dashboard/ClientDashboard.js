/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import React from 'react';
import Catalogue from './Catalogue.js';
import ProductListing from './ProductListing.js';
import {PageHeader} from 'react-bootstrap';
import {ShoppingCartModal} from '../NavBar/ShoppingCartModal.js';
import {PurchaseHistoryModal} from '../NavBar/PurchaseHistoryModal.js';


export class ClientDashboard extends Catalogue{
    constructor(props){
        super(props);


    }

    render() {
        let shopping =<ShoppingCartModal user={this.state.usr}/>;
        let purchases = <PurchaseHistoryModal user={this.state.usr}/>;
        let history = document.getElementById("PurchaseHistory");
        let cart = document.getElementById("ShoppingCart");
        if(cart) {
            ReactDOM.render(shopping, cart);
        }
        if(history){
            ReactDOM.render(purchases, history);
        }


        return(
            <div>

                <PageHeader className="catalogHeader">Client Dashboard</PageHeader>
                {super.render()}
                <ProductListing
                    userType="client"
                    products={this.state.PRODUCTS}
                    filterText={this.state.filterText}
                    include={this.state.include}
                    usr={this.state.usr}
                    toggleDisableSort={this.toggleDisableSort}
                />
            </div>
        );
    }
}