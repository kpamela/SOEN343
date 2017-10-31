/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import Product from './Product.js'
import ModifyProduct from './ModifyProduct.js'
import {Button, ListGroup} from 'react-bootstrap';

export default class ProductListing extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      modifyForm:<div></div>,
        model: "",
        currentPosition: -1
    };

    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  handleShowForm(item){
      if(this.props.userType === "admin") {
          //resetting the state before any change is requested
          this.props.toggleDisableSort("disabled");
          const pos = this.props.usr.lookForModel(item.description.modelNumber);
          this.setState({modifyForm: <div>...</div>, currentPosition: pos, model: item.description.modelNumber}, function () {
              this.setState({
                  modifyForm: <div>
                      <ModifyProduct item={item} onModify={this.handleModify}/>
                      <Button bsStyle="danger" onClick={() => this.remove()}>
                          Delete {this.state.model}
                      </Button>
                      <Button onClick={() => this.cancel()}>
                          Cancel
                      </Button>
                  </div>
              })
          });
      }
      else{}//TODO handle add to cart

  }


  remove(){
      let confirm = window.confirm("Do you really want to delete " + this.state.model + " forever and ever?");

      if(confirm == true){
          this.props.toggleDisableSort("");
          this.setState({modifyForm: <div></div>});

          this.props.usr.remove(this.state.currentPosition, this.state.model);
          this.props.onChanges();
      }
  }

  cancel(){
        this.props.toggleDisableSort("");
        this.setState({modifyForm: <div></div>});
         this.props.onChanges();
    }

  handleModify(item){
      const i = this.props.usr.lookForModel(item.description.modelNumber);//looking for already existing model numbers
      if( i === this.state.currentPosition || i == -1){
          this.props.toggleDisableSort("");
          this.props.usr.modify(item, this.state.currentPosition, this.state.model);
          this.setState({modifyForm: <div></div>});
          this.props.onChanges();
      }
      else {
          window.alert("Model number " +item.description.modelNumber + " already exists");
      }
  }

  render(){
        var listing = [];

        //going through pass-by products adding them to current listing
        this.props.products.forEach((product) => {

            if(product.category.indexOf(this.props.include) === -1){
                    return;
            }
            const str = JSON.stringify(product);//easier to search through one string
            if(str.indexOf(this.props.filterText) === -1){
                return;
            }

            //Converting product object to product component
            listing.push(
                <Product item={product} onShowForm={this.handleShowForm}/>
            );
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
            <div className="productListing">
                <hr/>
                <h2>Product Listing</h2>
                <ListGroup>
                    {listing}
                </ListGroup>
                {this.state.modifyForm}
            </div>
        );

    }

}
