/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import axios from 'axios';
import React from 'react';
import User from './User.js';

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
        console.log(q);
        this.p.push(q);

        return this.p.length - 1;//returning index for future use
    }




    /**
     * specifies description of product at index 'product'
     * @param product
     * @param desc
     */
    specify(product, desc){

        this.p[product].setDescription(desc);

    }

    commitChanges(){
        this.axiosInstance.post('commitChanges', {},{ cancelToken: this.source.token})
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

    modify(item, pos){
        this.p[pos] = item;
        // console.log(pos);
    }

    addItem(data){

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