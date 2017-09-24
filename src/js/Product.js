import React from 'react';
import ReactDOM from 'react-dom';

export default class Product extends React.Component{

    render(){
        return(
            <button className="product">
                {this.props.value}
            </button>
        );
    }


}