/**
 * Created by CharlesPhilippe on 2017-09-24.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ProductListing from './ProductListing.js';
import SearchBar from './SearchBar.js';
import AddProduct from './AddProduct.js';

class Catalog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            PRODUCTS : [
                {name: 'MacBook', category: 'computer', description:'Aluminium', price:'$$$', amount:4},
                {name: 'Windows', category: 'computer', description:'Plastic', price:'$', amount:5}
            ],
            filterText: '',

        };
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
    }
    //Changing filterText state upon receive new value
    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }
    //Adding new product to product list upon receiving new item
    handleNewItem(newItem){

        this.setState({
            PRODUCTS: this.state.PRODUCTS.concat(newItem)

        });
    }

    render(){
        return(
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                />
                <AddProduct
                    onNewItem={this.handleNewItem}
                />

                <ProductListing
                    products={this.state.PRODUCTS}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}


ReactDOM.render(
    <Catalog />,
    document.getElementById('Catalogue')
);