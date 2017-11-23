/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import CatalogFilterCategory from './FilterComponent/CatalogFilterCategory.js';
import FilterDesktop from './FilterComponent/FilterDesktop.js';
import FilterLaptop from './FilterComponent/FilterLaptop.js';
import FilterMonitor from './FilterComponent/FilterMonitor.js';
import FilterTablet from './FilterComponent/FilterTablet.js';
import FilterTelevision from './FilterComponent/FilterTelevision';


export default class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state={
          categoryFilter: <div>"No filters selected"</div>
        };
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleIncludeChange = this.handleIncludeChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    //gets input from textField and pass it to AdminDashboard via onFilterTextInput()
    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
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
        }
        this.setState({categoryFilter: <FilterTablet>});
    }

    handleSortChange(e){
        this.props.onSortChange(e.target.value)
    }

    render(){
        return(
          <div>
            <form className="catalogForm">
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
            {this.state.categoryFilter}
          </div>
        );
    }
}
