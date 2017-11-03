/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import axios from 'axios'
import $ from 'jquery';
//import Admin from './Admin.js';
//import Client from './Client.js';
const auth = require('./auth.js');
import {Monitor, Tablet, Laptop, Desktop} from './Product.js';
import decode from 'jwt-decode';

export default class User{

    constructor() {
        //TODO
        this.token = localStorage.getItem('jwtToken');//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDY1NDI2MDQsImV4cCI6MTUzODA3ODYwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.AJ4hiuABiG2SkUgVOsU9xNRCpKcDtIVnMKMbfgxPCts";
        //TODO

        this.data = new $.Deferred();
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        this.axiosInstance = axios.create({
            baseURL: '/products/',
            headers: {'Authorization': this.token}
        });

        this.p = new Array();


        this.setListing = this.setListing.bind(this);
        this.lookForModel = this.lookForModel.bind(this);
    }


    cancelGetData(){
        this.source.cancel('Operation canceled by the user');
    }

    setListing(response){
        this.p = [];
        this.data.resolve(response.data);
        for(let i in response.data){
            this.p.push(User.newProduct(response.data[i].Category, response.data[i]))
        }

    }

    /**
     * Returns an instanciated product, depending on its category
     * @param category
     * @param option
     * @returns {*}
     */
    static newProduct(category, option){

        switch(category){
            case 'Monitor':
            case 'monitor': return new Monitor(option);
            case 'Tablet':
            case 'TabletComputer': return new Tablet(option);
            case 'Laptop':
            case 'LaptopComputer': return new Laptop(option);
            case 'Desktop':
            case 'DesktopComputer': return new Desktop(option);
            default: return null;
        }
    }

    //
    /**
     * Getting the data from Http request through view route
     */
    getData(){

       this.axiosInstance.get("view", {cancelToken: this.source.token})
            .then(this.setListing)
            .catch(function(thrown){
                if(axios.isCancel(thrown)){
                    console.log("canceled: " + thrown);
                }
                else console.log("error: " + thrown);
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

    /**
     * Returns the index of the specified model number
     * @param model
     * @returns {number}
     */
    lookForModel(model){
        let pos = -1;
        for(let i in this.p){
            if(this.p[i].description.modelNumber === model){
                pos = i;//looking through all the array
            }
        }
        return pos;
    }

    /**
     * Ordering contents of array p by price
     * @param asc determines ascending or descending prices
     */
    orderPrice(asc){
        switch(asc) {
            case "true":
                this.p = User.quickSort(this.p, 0, this.p.length - 1, true);
                break;
            case "false":
                this.p = User.quickSort(this.p, 0, this.p.length - 1, false);
                break;
            default:
                break;
        }
        return this.p;
    }

    /**
     * Sorting an array of numbers
     * @param arr
     * @param left
     * @param right
     * @param asc
     * @returns {*}
     */
     static quickSort(arr, left, right, asc){
        let len = arr.length, pivot, partitionIndex;

        if(left < right){
            pivot = right;
            partitionIndex = asc ? User.partitionAscending(arr, pivot, left, right): User.partitionDescending(arr, pivot, left, right);

            //sort left and right
            User.quickSort(arr, left, partitionIndex-1,asc);
            User.quickSort(arr, partitionIndex+1, right,asc);
        }
        return arr;
    }

    /**
     * partitionning an array ascending order
     * @param arr
     * @param pivot
     * @param left
     * @param right
     * @returns {*}
     */
   static partitionAscending(arr, pivot, left, right){
        let pivotValue = arr[pivot].description.price;
        let partitionIndex = left;

        for(let i =left; i<right; i++){
            if(arr[i].description.price < pivotValue){
                User.swap(arr,i,partitionIndex);
                partitionIndex++;
            }
        }
        User.swap(arr,right,partitionIndex);
        return partitionIndex;
    }

    /**
     * partinionnin descending order
     * @param arr
     * @param pivot
     * @param left
     * @param right
     * @returns {*}
     */
    static partitionDescending(arr, pivot, left, right){
        let pivotValue = arr[pivot].description.price;
        let partitionIndex = left;

        for(let i =left; i<right; i++){
            if(arr[i].description.price >= pivotValue){
                User.swap(arr,i,partitionIndex);
                partitionIndex++;
            }
        }
        User.swap(arr,right,partitionIndex);
        return partitionIndex;
    }

    /**
     * swapping two members of an array
     * @param arr
     * @param i
     * @param j
     */
    static swap(arr,i,j){
        let temp = arr[i];
        arr[i] =arr[j];
        arr[j] = temp;
    }

}