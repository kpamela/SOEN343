/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleIncludeChange = this.handleIncludeChange.bind(this);
    }

    //gets input from textField and pass it to Catalog via onFilterTextInput()
    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
    }

    handleIncludeChange(e){
        var include = this.props.include;
        include[e.target.id] = e.target.checked;
        this.props.onIncludeChange(include);
    }

    render(){
        return(
            <form>
                <input type="text" placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.handleFilterTextInputChange}
                />
                <br/>

                <input type="checkbox"
                       checked={this.props.include.names}
                       onChange={this.handleIncludeChange}
                       id="names"
                />
                <label> Names </label>

                <input type="checkbox"
                       checked={this.props.include.descriptions}
                       onChange={this.handleIncludeChange}
                       id="descriptions"
                />
                <label> Descriptions </label>

                <input type="checkbox"
                       checked={this.props.include.categories}
                       onChange={this.handleIncludeChange}
                       id="categories"
                />
                <label> Categories</label>
            </form>
        );
    }
}