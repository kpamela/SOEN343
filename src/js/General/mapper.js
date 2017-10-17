/**
 * Created by CharlesPhilippe on 2017-10-02.
 */
import React from 'react';
import $ from 'jquery';
import {Television, Monitor, Tablet, Laptop, Desktop} from './ProductTest.js';
import {AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import axios from 'axios'


export  class Mapper{
    constructor() {
        this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDY1NDI2MDQsImV4cCI6MTUzODA3ODYwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.AJ4hiuABiG2SkUgVOsU9xNRCpKcDtIVnMKMbfgxPCts";
        this.data = new $.Deferred();
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        this.axiosInstance = axios.create({
            baseURL: '/products/',
            headers: {'Authorization': this.token}
        });

        this.p = new Array();
    }

    /**
     * Creates a new instance of product description and returns its position in array p
     * @param category
     * @param amount
     * @returns {number}
     */
    addProduct(category, amount){
        let q = this.newProduct(category, amount);
        this.p.push(q);

        return this.p.length - 1;//returning index for future use
    }

    /**
     * Returns an instanciated product, depending on its category
     * @param category
     * @param amount
     * @returns {*}
     */
    newProduct(category, amount){
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
       // location.reload();
    }

    modify(item, pos){
        this.p[pos] = item;
      // console.log(pos);
    }

    lookForModel(model){
        let pos = -1;
        for(let i in this.p){
            if(this.p[i].description.modelNumber === model){
                pos = i;//looking through all the array
            }
        }
        return pos;
    }

    cancelGetData(){
        this.source.cancel('Operation canceled by the user');
    }

    modifyData(data){
        this.axiosInstance.post('modify', {data});
    }

    postData(data){

        this.axiosInstance.post('add', {data});

    }

    getData(){
        this.axiosInstance.get("view", {cancelToken: this.source.token})
            .then(function(response){
                console.log(response.data);
            })
            .catch(function(thrown){
                if(axios.isCancel(thrown)){
                    console.log(thrown.message);
                }
                else console.log(thrown.message);
            });
      //  this.source.cancel('Operation canceled');
       /* return(
            <div>
                <Get url="view" instance ={this.axiosInstance}>
                    {(error, response, isLoading) => {
                        if(error){
                            console.log(this.token);
                            return (<div> Something bad occurred: {error.message}</div>)
                        }
                        else if(isLoading){
                            return (<div>Loading...</div>)
                        }
                        else if(response !== null){
                            this.data.resolve(response.data);
                            return (<div>{response.data.message}</div>)
                        }

                        return <div>Get request was made</div>
                    }}
                </Get>
            </div>
        );*/
    }

}

