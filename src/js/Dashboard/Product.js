/*
created by CharlesPhilippe
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroupItem} from 'react-bootstrap';

export default class Product extends React.Component{

    showModifyForm(){
        let item = {category: this.props.item.category, amount: this.props.item.amount, description:{}}

        for(let i in this.props.item.description){
            item.description[i]= this.props.item.description[i];
        }

      this.props.onShowForm(item);
    }

    displayDescription(){

        let desc =[];

        for(let i in this.props.item.description){
            desc.push(<p>{i }: {this.props.item.description[i] }</p>);

        }

        return desc;
    }


    render(){
       // console.log(JSON.stringify(this.props.description));

        return (
            <div className="prodcutContainer">
                <ListGroupItem bsStyle="secondary" className="product" onClick={() =>this.showModifyForm()}>
                    <b>{this.props.item.name}</b><br/>
                    <i>{this.props.item.category}</i><br/>
                    {this.displayDescription()}
                    {this.props.item.amount}
                </ListGroupItem>
                <br/>
            </div>
        );
    }
}
