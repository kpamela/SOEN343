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

            //searching for substrings when selected
            if ((this.props.include.names || this.props.include.descriptions || this.props.include.categories)
            && this.props.filterText) {

                if (!((this.props.include.names || product.name.indexOf(this.props.filterText) === -1)
                    && (this.props.include.categories || product.category.indexOf(this.props.filterText) === -1)
                    && (this.props.include.descriptions || product.description.indexOf(this.props.filterText) === -1))) {
                 return;
             }
            }
            //if category is selected

            //Converting product object to product component
            listing.push(<Product item={product}/>);
        });

        /*
         name={product.name}
         category={product.category}
         description={product.description}
         price={product.price}
         amount={product.amount}
         */
        console.log(this.props.products);
        return(
            <div>
                {listing}

            </div>
        );

    }

}
