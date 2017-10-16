/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';

export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    //gets input from textField and pass it to Dashboard via onFilterTextInput()
    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
    }

    render(){
        return( 
            <form>
                <input type="text" placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.handleFilterTextInputChange}
                />
            </form>
        );
    }
}
