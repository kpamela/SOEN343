/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import Product from './Product.js'
import ModifyProduct from './ModifyProduct.js'

export default class ProductListing extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      modifyForm:<div></div>
    };

    this.handleShowForm = this.handleShowForm.bind(this);
  }

  handleShowForm(item){
    this.setState({modifyForm: <ModifyProduct item={item}/>})
  }
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
            listing.push(<Product item={product}
                          onShowForm={this.handleShowForm}/>);
        });
/*
name={product.name}
                      category={product.category}
                      description={product.description}
                      price={product.price}
                      amount={product.amount}

*/
        return(
            <div>
                {listing}
                {this.state.modifyForm}
            </div>
        );

    }

}
