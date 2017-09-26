import React from 'react';
import ReactDOM from 'react-dom';

export default class Product extends React.Component{

    constructor(){
        super();

        this.state = {
            name: 'test',
        };
    }

    getName(){
        return this.state.name;
    }

    render(){
        return(
            <button className="product">
                {this.props.value}
            </button>
        );
    }


}