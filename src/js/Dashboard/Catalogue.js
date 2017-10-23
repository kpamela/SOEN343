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
import {Mapper} from  "../General/mapper.js";
import auth from '../General/auth.js';


 export default class Catalogue extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usr: auth.login(),
            prods: <div>no data</div>,
            PRODUCTS : [],
            filterText: '',
            include: "",
            sorting:"",
            disableSort: ""
        };

        //this.state.usr.getData();
        //this.setState({PRODUCTS: this.state.usr.p});
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleSearchIncludes = this.handleSearchIncludes.bind(this);
        this.handleGetData = this.handleGetData.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.toggleDisableSort = this.toggleDisableSort.bind(this);
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


    handleGetData(data){

        //this.setState({PRODUCTS: [data]});
        this.setState({PRODUCTS: this.state.usr.p});
    }

    handleSortChange(asc){
        this.state.usr.orderPrice(asc);
        this.setState({sorting: asc});
        this.forceUpdate();
    }

    toggleDisableSort(disabled){
            this.setState({disableSort: disabled});

    }
    showCatalogueOnly(){
        if(!auth.loggedIn()){
           return( <ProductListing
                userType="regular"
                products={this.state.PRODUCTS}
                filterText={this.state.filterText}
                include={this.state.include}
                usr={this.state.usr}
                toggleDisableSort={this.toggleDisableSort}
            />);
        }
    }
    render(){

        if(this.state.usr.data.state() === "pending"){
            this.state.usr.getData();
            this.state.usr.data.then(this.handleGetData);
        }

        {this.state.usr.getData()}
        //console.log(this.state.prods);
        return(
            <div>
                <h1>TecMarket</h1>
                <h3>Catalogue</h3>
                {/*this.state.usr.getData()*/}
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                    include={this.state.include}
                    onIncludeChange={this.handleSearchIncludes}
                    sorting={this.state.sorting}
                    onSortChange={this.handleSortChange}
                    disableSort={this.state.disableSort}
                />
                {this.showCatalogueOnly()}

            </div>
        );
    }
}

