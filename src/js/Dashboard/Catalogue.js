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
            filters: {},
            include: "",
            sorting:"",
            disableSort: ""
        };

        //this.state.usr.getData();
        //this.setState({PRODUCTS: this.state.usr.p});
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleSearchIncludes = this.handleSearchIncludes.bind(this);
        this.handleGetData = this.handleGetData.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.toggleDisableSort = this.toggleDisableSort.bind(this);
        // this.handleDimensionsInput = this.handleDimensionsInput.bind(this);
        // this.handlePriceMaxInput = this.handlePriceMaxInput.bind(this);
        // this.handlePriceMinInput = this.handlePriceMinInput.bind(this);
        // this.handleAmountRemainingInput = this.handleAmountRemainingInput.bind(this);
        // this.handleWeightMaxInput = this.handleWeightMaxInput.bind(this);
        // this.handleWeightMinInput = this.handleWeightMinInput.bind(this);
    }


     /**
      * Changing filterText state upon receive new value
      */
    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleFilterChange(values){
      this.setState({
        filters: values
      });
    }

    // handleDimensionsInput(dimensions) {
    //   this.setState({
    //       dimensions: dimensions
    //   });
    // }
    //
    // handlePriceMaxInput(priceMax) {
    //   this.setState({
    //       priceMax: priceMax
    //   });
    // }
    //
    // handlePriceMinInput(priceMin) {
    //   this.setState({
    //       priceMin: priceMin
    //   });
    // }
    //
    // handleAmountRemainingInput(amountRemaining){
    //   this.setState({
    //       amountRemaining: amountRemaining
    //   });
    // }
    //
    // handleWeightMaxInput(weightMax){
    //   this.setState({
    //       weightMax: weightMax
    //   });
    // }
    //
    // handleWeightMinInput(weightMin){
    //   this.setState({
    //       weightMin: weightMin
    //   });
    // }


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
        if(!this.state.usr.username){//if the user is not registered, show listing
           return( <ProductListing
                userType="regular"
                products={this.state.PRODUCTS}
                filterText={this.state.filterText}
                filters = {this.state.filters}
                include={this.state.include}
                usr={this.state.usr}
                toggleDisableSort={this.toggleDisableSort}
            />);
        }
    }
    render(){

        if(this.state.usr.data.state() === "pending"){//TODO get commit state on reload;
            this.state.usr.getData();
            this.state.usr.data.then(this.handleGetData);
        }


        return(
            <div>
                {/*this.state.usr.getData()*/}
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                    include={this.state.include}
                    onIncludeChange={this.handleSearchIncludes}
                    sorting={this.state.sorting}
                    onSortChange={this.handleSortChange}
                    disableSort={this.state.disableSort}
                    onFilterChange={this.handleFilterChange}
                    //filter part2
                //     dimensions={this.state.dimensions}
                //     onDimensionsInput={this.handleDimensionsInputChange}
                //     priceMax={this.state.priceMax}
                //     onPriceMaxInput={this.handlePriceMaxInputChange}
                //     priceMin={this.state.priceMin}
                //     onPriceMinInput={this.handlePriceMinInputChange}
                //     amountRemaining={this.state.amountRemaining}
                //     onAmountRemainingInput={this.handleAmountRemainingInputChange}
                //     weightMax={this.state.weightMax}
                //     onWeightMaxInput={this.handleWeightMaxInputChange}
                //     weightMin={this.state.weightMin}
                //     onWeightMinInput={this.handleWeightMinInputChange}
                />

               {this.showCatalogueOnly()}

            </div>
        );
    }
}
