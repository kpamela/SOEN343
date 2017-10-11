/**
 * Created by CharlesPhilippe on 2017-10-02.
 */
import $ from 'jquery';
import {Television, Monitor, Tablet, Laptop, Desktop} from './ProductTest.js';

export  class Mapper{
    constructor() {
        this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDY1NDI2MDQsImV4cCI6MTUzODA3ODYwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.AJ4hiuABiG2SkUgVOsU9xNRCpKcDtIVnMKMbfgxPCts";
        this.data = new $.Deferred();

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

        return this.p.length - 1;//returning length for future use
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

}


export function getData(mapper){
    $.ajax({
        url: '/products/view',
        type: 'get',

        headers: {
            Authorization: mapper.token
        },
        dataType: 'json',
        success: function (data) {
            mapper.data.resolve(data);
           // console.log(data);
        },
        error: function(data){
            console.log(data);
        }
    });
}

export function postData(mapper, data){

}