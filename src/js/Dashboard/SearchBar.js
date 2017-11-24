/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import ProductFilter from './FilterComponent/ProductFilter.js';



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
              return   this.setState({categoryFilter: <div> <FilterDesktop handleFilterChange={this.props.onFilterChange}/> </div> });
          case 'Laptop':
              return   this.setState({categoryFilter: <div> <FilterLaptop handleFilterChange={this.props.onFilterChange}/> </div> });
          case  'Monitor':
              return   this.setState({categoryFilter: <div> <FilterMonitor handleFilterChange={this.props.onFilterChange}/> </div> });
          case  'Tablet':
              return   this.setState({categoryFilter: <div> <FilterTablet handleFilterChange={this.props.onFilterChange}/> </div> });
          case 'Computer':
              return   this.setState({categoryFilter: <div> <FilterComputers handleFilterChange={this.props.onFilterChange}/> </div> });
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
            <div>
                <ProductFilter handleFilterChange={this.props.onFilterChange} />
            </div>
            {this.state.categoryFilter}
          </div>
        );
    }
}
