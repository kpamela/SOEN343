/**
 * Created by CharlesPhilippe on 2017-10-21.
 */


import React from 'react';
import Catalogue from './Catalogue.js';
import ProductListing from './ProductListing.js';


export class ClientDashboard extends Catalogue{
    constructor(props){
        super(props);

    }

    render(){

        return(
            <div>
                {super.render()}

                <ProductListing
                    isAdmin="client"
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