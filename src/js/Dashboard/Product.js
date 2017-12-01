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
            let label;
            switch(i){
                case 'isDeleted':
                    continue;
                    break;
                case 'brandName':
                    label = 'Brand Name';
                    break;
                case 'modelNumber':
                    label = 'Model Number';
                    break;
                case 'dimensions':
                    label = 'Dimensions';
                    break;
                case 'price':
                    label = 'Price';
                    break;
                case 'weight':
                    label = 'Weight';
                    break;
                case 'processorType':
                    label = 'Processor Type';
                    break;
                case 'RAMSize':
                    label = 'RAM Size';
                    break;
                case 'numberOfCores':
                    label = 'Number of Cores';
                    break;
                case 'hardDriveSize':
                    label = 'Hard Drive Size';
                    break;
                case 'modelNumber':
                    label = 'Model Number';
                    break;
                case 'displaySize':
                    label = 'Display Size';
                    break;
                case 'batteryInfo':
                    label = 'Battery Information';
                    break;
                case 'size':
                    label = 'Size';
                    break;
                case 'hasCamera':
                    label = 'Has a Camera';
                    break;
                case 'operatingSystem':
                    label = 'Operating System';
                    break;
                case 'touchScreen':
                    label = 'Touch Screen';
                    break;
                case 'additionalInfo':
                    label = 'Additional Information';
                    break;
                
            }
            desc.push(<p><b>{label }</b>: {this.props.item.description[i] }</p>);

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
