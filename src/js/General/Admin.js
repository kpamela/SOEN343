/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import axios from 'axios';
import React from 'react';
import User from './User.js';
import {Television, Monitor, Tablet, Laptop, Desktop} from './ProductTest.js';
export default class Admin extends User{

    constructor(){
        super();
        this.dashboard = <div></div>;
    }

    /**
     * Creates a new instance of product description and returns its position in array p
     * @param category
     * @param amount
     * @returns {number}
     */
    addProduct(category, amount){
        let q = Admin.newProduct(category, amount);
        this.p.push(q);

        return this.p.length - 1;//returning index for future use
    }

    /**
     * Returns an instanciated product, depending on its category
     * @param category
     * @param amount
     * @returns {*}
     */
     static newProduct(category, amount){
        switch(category){
            case 'Television':
            case 'television': return new Television(amount);
            case 'Monitor':
            case 'monitor': return new Monitor(amount);
            case 'Tablet':
            case 'TabletComputer': return new Tablet(amount);
            case 'Laptop':
            case 'LaptopComputer': return new Laptop(amount);
            case 'Desktop':
            case 'DesktopComputer': return new Desktop(amount);
            default: return null;
        }
    }


    /**
     * specifies description of product at index 'product'
     * @param product
     * @param desc
     */
    specify(product, desc){

        this.p[product].setDescription(desc);

    }

    submit(){
        console.log(this.p);
        for(let i in this.p){
            this.postData(this.p[i]);
        }
    }

    modify(item, pos){
        this.p[pos] = item;
        // console.log(pos);
    }

    postData(data){

        this.axiosInstance.post('add', {data},{ cancelToken: this.source.token})
            .then(function(response){
                console.log(response.data);
            })
            .catch(function(thrown){
                if(axios.isCancel(thrown)){
                    console.log(thrown.message);
                }
                else console.log(thrown);
            });
    }
}