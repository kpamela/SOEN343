/**
 * Created by CharlesPhilippe on 2017-10-21.
 */

import React from 'react';
import Catalogue from './Catalogue.js';
import NewProductRequest from './NewProductRequest.js';
import ProductListing from './ProductListing.js';


export class AdminDashboard extends Catalogue{
    constructor(props){
        super(props);
        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
    }


    //Adding new product to product list upon receiving new item signal
    handleNewItem(){

        this.setState({
            PRODUCTS: this.state.usr.p, sorting:""
        }, function(){
            console.log(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.addItem(this.state.usr.p[this.state.usr.p.length-1]);
        });

    }

    handleCommit(){
        this.setState({
            PRODUCTS: this.state.usr.p, sorting:""
        }, function(){
            console.log(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.addItem(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.commitChanges();
        });
    }


    render(){

        return(
            <div>
                {super.render()}
                <NewProductRequest
                    usr={this.state.usr}
                    onAnother={this.handleNewItem}
                    onSubmit={this.handleCommit}
                />

                <ProductListing
                    userType="admin"
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