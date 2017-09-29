import React from 'react';
import ReactDOM from 'react-dom';

export default class Product extends React.Component{
    render(){
        console.log(JSON.stringify(this.props.description));

        return (
            <button className="product">
                <b>{this.props.name}</b><br/>
                <i>{this.props.category}</i><br/>
                {JSON.stringify(this.props.description)}<br/>
                {this.props.price}<br/>
                {this.props.amount}
            </button>
        );
    }
}