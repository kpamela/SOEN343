/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import CatalogueFilterCategory from './FilterComponent/CatalogueFilterCategory.js';
import FilterDesktop from './FilterComponent/FilterDesktop.js';
import FilterLaptop from './FilterComponent/FilterLaptop.js';
import FilterMonitor from './FilterComponent/FilterMonitor.js';
import FilterTablet from './FilterComponent/FilterTablet.js';
import FilterTelevision from './FilterComponent/FilterTelevision';
import ProductFilter from './FilterComponent/ProductFilter.js';
import FilterComputers from './FilterComponent/FilterComputers.js';



export default class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state={
          categoryFilter: <div>"No filters selected"</div>,
        };

        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleIncludeChange = this.handleIncludeChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    //gets input from textField and pass it to AdminDashboard via onFilterTextInput()
    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
    }

    handleDimensionsInputChange(e) {
        this.props.onDimensionsInput(e.target.value);
    }

    handlePriceMaxInputChange(e) {
        this.props.onPriceMaxInput(e.target.value);
    }

    handlePriceMinInputChange(e) {
        this.props.onPriceMinInput(e.target.value);
    }

    handleAmountRemainingInputChange(e){
        this.props.onAmountRemainingInput(e.target.value);
    }

    handleWeightMaxInputChange(e){
        this.props.onWeightMaxInput(e.target.value);
    }

    handleWeightMinInputChange(e){
        this.props.onWeightMinInput(e.target.value);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.props.onFilterTypeInput(e.target.name);

      this.setState({
        [name]: value
      });
    }

    handleIncludeChange(e){
        this.props.onIncludeChange(e.target.value);
        switch(e.target.value){
          case 'Desktop':
              return   this.setState({categoryFilter: <div> <FilterDesktop /> </div> });
          case 'Laptop':
              return   this.setState({categoryFilter: <div> <FilterLaptop /> </div> });
          case  'Monitor':
              return   this.setState({categoryFilter: <div> <FilterMonitor /> </div> });
          case  'Tablet':
              return   this.setState({categoryFilter: <div> <FilterTablet /> </div> });
          case  'Television':
              return   this.setState({categoryFilter: <div> <FilterTelevision /> </div> });
          case 'Computer':
              return   this.setState({categoryFilter: <div> <FilterComputers   /> </div> });
        };
    }

    handleSortChange(e){
        this.props.onSortChange(e.target.value)
    }

    render(){
        return(
          <div>
            <form className="CatalogueForm">
                <FormGroup>
                    <ControlLabel>Search</ControlLabel>
                    <FormControl type="text" placeholder="Search..."
                        value={this.props.filterText}
                        onChange={this.handleFilterTextInputChange}
                    />
                    <br/>
                    <ControlLabel>Select Filter</ControlLabel>
                    <FormControl componentClass="select" value ={this.props.include} onChange={this.handleIncludeChange}>
                        <option value="" default>Select filter</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Computer">all Computers</option>
                    </FormControl>
                    <br/>
                    <ControlLabel>Select Sorting Option</ControlLabel>
                    <FormControl componentClass="select" disabled={this.props.disableSort} value={this.props.sorting} onChange={this.handleSortChange}>
                        <option value="" default>Select Sorting Option</option>
                        <option value="true">Sort by Ascending Price</option>
                        <option value="false">Sort by Descending price</option>
                    </FormControl>
                </FormGroup>
            </form>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <form>
                    <label>
                      Max Dimensions:
                        <input name="dimensions" type="number" value={this.state.dimensions} onChange={this.handleDimensionsInputChange} />
                    </label>
                    <label>
                      Maximum price
                        <input name="priceMax" type="number" value={this.state.priceMax} onChange={this.handlePriceMaxInputChange} />
                    </label>
                    <label>
                      Minimum price
                        <input name="priceMin" type="number" value={this.state.priceMin} onChange={this.handlePriceMinInputChange} />
                    </label>
                    <label>
                      Amount Remaining:
                        <input name="amountRemaining" type="number" value={this.state.amountRemaining} onChange={this.handleAmountRemainingInputChange} />
                    </label>
                    <label>
                      Maximum Weight:
                        <input name="weightMax" type="number" value={this.state.weightMax} onChange={this.handleWeightMaxInputChange} />
                    </label>
                    <label>
                      Minimum Weight:
                        <input name="weightMin" type="number" value={this.state.weightMin} onChange={this.handleWeightMinInputChange} />
                    </label>
                  </form>
                </div>
              </div>
            </div>

            {this.state.categoryFilter}
          </div>
        );
    }
}
