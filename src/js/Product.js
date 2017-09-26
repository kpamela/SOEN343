import React from 'react';
import ReactDOM from 'react-dom';

export default class Product extends React.Component{
    render(){
        return (
            <button className="product">
                <b>{this.props.name}</b><br/>
                {this.props.description}<br/>
                {this.props.price}<br/>
                {this.props.amount}
            </button>
        );
    }
}