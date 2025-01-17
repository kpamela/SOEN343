/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import Product from './Product.js';
import ModifyProduct from './ModifyProduct.js';
import {Button, ListGroup} from 'react-bootstrap';


export default class ProductListing extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      modifyForm:<div></div>,
        model: "",
        currentPosition: -1,
    };

    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  handleShowForm(item){
    
      if(this.props.userType === "admin") {
          //resetting the state before any change is requested
          this.props.toggleDisableSort("disabled");
          const pos = this.props.usr.lookForModel(item.description.modelNumber);
          this.setState({modifyForm: <div id="modifyForm">...</div>, currentPosition: pos, model: item.description.modelNumber}, function () {
              this.setState({
                  modifyForm: <span id="modifyForm">
                      <ModifyProduct item={item} onModify={this.handleModify}/>
                      <Button bsStyle="danger" className="delete" onClick={() => this.remove()}>
                          Delete {this.state.model}
                      </Button>
                      <Button className="cancel" onClick={() => this.cancel()}>
                          Cancel
                      </Button>
                  </span>
              })
          });
          
      }
      else if(this.props.userType === "client"){
          this.props.usr.addToCart(item.description.modelNumber);
          item.amount -=1;
          this.forceUpdate();
      }//TODO handle add to cart
      document.getElementById('productListingh2').scrollIntoView();
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

  match(str, exp){
      let res = false;
      let reg = exp.split(" ");

      for(let i = 0; i< reg.length; i++){
          let regex = new RegExp(reg[i]);
          if(regex.test(str)){
              res = true;
              break;
          }
      }

      return res
  }

  handleFilterTypeInputChange(e){
      this.props.handleInputChange(e);
  }

  render(){
        var listing = [];

        //going through pass-by products adding them to current listing
        this.props.products.forEach((product) => {

            if(product.category.indexOf(this.props.include) === -1){
                    return;
            }

            const str = product.toString();//easier to search through one string

            if(!this.match(str, this.props.filterText)){
                return;
            }

            if(this.props.filters.priceMax && product.description['price'] >= this.props.filters.priceMax){
              return;
            }

            if(this.props.filters.priceMin && product.description['price'] < this.props.filters.priceMin){
              return;
            }

            if(this.props.filters.weight && product.description['weight'] >= this.props.filters.weight){
              return;
            }


            //Converting product object to product component
            listing.push(
                <div>
                    <Product className="product" item={product} onShowForm={this.handleShowForm}/>
                </div>
            );
            
        });


        console.log(this.props.products);

        return(
            <div className="productListing">
                <hr/>
                <h2 id="productListingh2">Product Listing</h2>
                {this.state.modifyForm}
                <ListGroup>
                    {listing}
                </ListGroup>
            </div>
        );

    }

}
