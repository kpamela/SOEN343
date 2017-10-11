/**
 * Created by CharlesPhilippe on 2017-09-24.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import NewProductRequest from './NewProductRequest.js';
import ProductListing from './ProductListing.js';
import SearchBar from './SearchBar.js';
import AddProduct from './AddProduct.js';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import $ from 'jquery';
import {Mapper, getData, postData} from  "../General/mapper.js";

 export default class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mapper:new Mapper(),
            prods: <div>no data</div>,
            PRODUCTS :[],
            filterText: '',
            include: {names: true, descriptions: false, categories:false}

        };
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleSearchIncludes = this.handleSearchIncludes.bind(this);
        this.handleGetData = this.handleGetData.bind(this);
    }

     /**
      * Changing filterText state upon receive new value
      */
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

     }
    //Adding new product to product list upon receiving new item signal
    handleNewItem(){

        this.setState({
            PRODUCTS: this.state.mapper.p

        });

    }

    handleGetData(data){

        //this.setState({PRODUCTS: [data]});
        this.setState({prods :<div>{JSON.stringify(data)}</div> });
    }

    render(){
/*
        if(this.state.mapper.data.state() === "pending"){
            getData(this.state.mapper);
            this.state.mapper.data.then(this.handleGetData);
        }
*/

        //console.log(this.state.prods);
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

                <NewProductRequest
                mapper={this.state.mapper}
                onSubmit={this.handleNewItem}
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
