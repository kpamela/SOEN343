/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import Product from './Product.js'
export default class ProductListing extends React.Component{
    render(){
        var listing = [];

        //going through pass-by products adding them to current listing
        this.props.products.forEach((product) => {

            if(product.name.indexOf(this.props.filterText) === -1){
                return;
            }
            //Converting product object to product component
            listing.push(<Product name={product.name} description={product.description} price={product.price} amount={product.amount}/>);
        });

        return(
            <div>
                {listing}
            </div>
        );

    }

}