import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Product.js';



class Catalogue extends React.Component{
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

   handleChangeProduct(index, evt){
       this.setState({products: this.state.products[index] = [{name: evt.target.value}]});

   }
   handleRemoveProduct(index){
        this.setState({products: this.state.products.filter((prod,i) => index !== i)});
    }

   submitProduct(index){
       var name = this.state.products[index].name;
       console.log(name);
       this.setState({listing: this.state.listing.concat([<Product value={name}/>])});


       this.handleRemoveProduct(index);
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
                            onChange={evt => this.handleChangeProduct(index, evt)}
                            />
                        <button type="button" onClick={() => this.submitProduct(index)} className="add">Submit</button>
                        <button type="button" onClick={() => this.handleRemoveProduct(index)} className="rem">-</button>
                    </div>
                ))}
                {this.state.listing}
            </div>
        );
    }

}

ReactDOM.render(
    <Catalogue/>,
    document.getElementById('Catalogue')
);
