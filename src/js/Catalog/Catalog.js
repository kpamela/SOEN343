/**
 * Created by CharlesPhilippe on 2017-09-24.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ProductListing from './ProductListing.js';
import SearchBar from './SearchBar.js';
import AddProduct from './AddProduct.js';
import $ from 'jquery';

 export default class Catalog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            PRODUCTS : [
                {name: 'MacBook', category: 'computer', description: {additionalInfo: 'aluminium'}, price:'$$$', amount:4},
                {name: 'Windows', category: 'computer', description:{additionalInfo: 'plastic'}, price:'$', amount:5}
            ],
            filterText: '',
            include: {names: true, descriptions: false, categories:false}

        };
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleSearchIncludes = this.handleSearchIncludes.bind(this);
    }
    //Changing filterText state upon receive new value
    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }
    //Selecting where the search searches
     handleSearchIncludes(include){
        this.setState({
            include: include
        });
        console.log(this.state.include);
     }
    //Adding new product to product list upon receiving new item
    handleNewItem(newItem){

        this.setState({
            PRODUCTS: this.state.PRODUCTS.concat(newItem)

        });
        console.log('test');
        $.ajax({
            url: 'http://localhost:3000/products/add',
            type: 'post',
            data: {
                newItem
            },
            headers: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDY1NDI2MDQsImV4cCI6MTUzODA3ODYwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.AJ4hiuABiG2SkUgVOsU9xNRCpKcDtIVnMKMbfgxPCts"
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
            },
            error: function(data){
                console.log(data);
            }
        });
        console.log('test');
    }

    render(){
        return(
            <div>
                <h1>TecMarket</h1>
                <h3>Catalog</h3>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                    include={this.state.include}
                    onIncludeChange={this.handleSearchIncludes}
                />
                <AddProduct
                    onNewItem={this.handleNewItem}
                />

                <ProductListing
                    products={this.state.PRODUCTS}
                    filterText={this.state.filterText}
                    include={this.state.include}
                />
            </div>
        );
    }
}
