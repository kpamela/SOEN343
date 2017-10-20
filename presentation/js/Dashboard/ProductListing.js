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
      modifyForm:<div></div>,
        currentPosition: -1
    };

    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleModify = this.handleModify.bind(this);
  }

  handleShowForm(item){
        //resetting the state before any change is requested
      this.props.toggleDisableSort("disabled");
      const pos = this.props.mapper.lookForModel(item.description.modelNumber);
      this.setState({modifyForm: <div>...</div>, currentPosition: pos}, function(){
          this.setState({modifyForm: <div>
              <ModifyProduct item={item} onModify={this.handleModify}/>
              <button onClick={()=>this.cancel()}>
                  Cancel
              </button>
          </div>})
      });

  }
    cancel(){
        this.props.toggleDisableSort("");
        this.setState({modifyForm: <div></div>});

    }

  handleModify(item){
      const i = this.props.mapper.lookForModel(item.description.modelNumber);//looking for already existing model numbers
      if( i === this.state.currentPosition || i == -1){
          this.props.toggleDisableSort("");
          this.props.mapper.modify(item, this.state.currentPosition);
          this.setState({modifyForm: <div></div>});
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
            listing.push(<Product item={product}
                          onShowForm={this.handleShowForm}
                            />);
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
