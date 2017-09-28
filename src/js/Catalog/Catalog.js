import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Product.js';



export default class Catalog extends React.Component{
    constructor(){
        super();
        this.state={
            products: [{name: ''}],
            listing: Array()
        };
    }

   handleAddProduct(){
        this.setState({products: this.state.products.concat([{name: ''}])});
   }

   handleNewProduct(index, evt){
       this.setState({products: this.state.products[index] = [{name: evt.target.value}]});

   }
   handleCancelProduct(index){
        this.setState({products: this.state.products.filter((prod,i) => index !== i)});
    }

   submitProduct(index){
       var name = this.state.products[index].name;
       console.log(name);
       this.setState({listing: this.state.listing.concat([<Product value={name}/>])});

        var test = <Product value={'test'}/>;
        console.log(test.props.value);
       this.handleCancelProduct(index);
   }



    render(){

        return(
            <div>
                <button className="add" onClick={() => this.handleAddProduct()} >
                    {'+'}
                </button>
                {this.state.products.map((product, index) => (
                    <div className="list">
                        <input
                            type="text"
                            placeholder={`Product #${index + 1} name`}
                            value={product.name}
                            onChange={evt => this.handleNewProduct(index, evt)}
                            />
                        <button type="button" onClick={() => this.submitProduct(index)} className="add">Submit</button>
                        <button type="button" onClick={() => this.handleCancelProduct(index)} className="rem">-</button>
                    </div>
                ))}
                {this.state.listing}
            </div>
        );
    }

}

