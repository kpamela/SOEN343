/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
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
    }

    handleSortChange(e){
        this.props.onSortChange(e.target.value);
    }

    render(){
        return( 
            <form>
                <input type="text" placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.handleFilterTextInputChange}
                />
                <br/>
                <select value ={this.props.include} onChange={this.handleIncludeChange}>
                    <option value="" default>Select filter</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Computer">all Computers</option>
                </select>
                <select disabled={this.props.disableSort} value={this.props.sorting} onChange={this.handleSortChange}>
                    <option value="" default>Select Sorting Option</option>
                    <option value="true">Sort by Ascending Price</option>
                    <option value="false">Sort by Descending price</option>
                </select>
            </form>
        );
    }
}
