/*
created by CharlesPhilippe
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroupItem} from 'react-bootstrap';

import desktopIcon from '../../images/desktopicon.png';
import laptopIcon from '../../images/laptopicon.png';
import monitorIcon from '../../images/monitoricon.png';
import tabletIcon from '../../images/tableticon.png';



export default class Product extends React.Component{

    showModifyForm(){
        let item = {category: this.props.item.category, amount: this.props.item.amount, description:{}};

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
    
  getIcon(category){
    switch (category){
        case 'DesktopComputer':
            return <img src={desktopIcon} alt="desktopicon"/>
            break;
        case 'LaptopComputer':
            return <img src={laptopIcon} alt="laptopicon"/>
            break;
        case 'Monitor':
            return <img src={monitorIcon} alt="monitoricon"/>
            break;
        case 'TabletComputer':
            return <img src={tabletIcon} alt="tableticon"/>
            break;

     }
    }   


    render(){
       // console.log(JSON.stringify(this.props.description));

        return (
            <div className="prodcutContainer">
                <ListGroupItem bsStyle="secondary" className="product" onClick={() =>this.showModifyForm()}>
                    {this.getIcon(this.props.item.category)}
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
