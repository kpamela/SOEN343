/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import User from "./User.js"
import axios from 'axios';
import ProductId from './ProductId.js'

export default class Client extends User{
    constructor(username){
        super(username);

        this.shoppingCart = [];
        this.purchaseHistory = [];

        this.purchaseHistoryCallback = this.purchaseHistoryCallback.bind(this);
        this.addToCartCallback = this.addToCartCallback.bind(this);
        this.fetchCartCallback = this.fetchCartCallback.bind(this);
        this.fetchShoppingCart();
        this.fetchPurchaseHistory();
    }


    /**
     *
     * @param id
     */
    addToCartCallback(id){
        if(id.data.success){
            this.shoppingCart.push(new ProductId(id.data.id, id.data.timeStamp, this));
            alert(this.shoppingCart[this.shoppingCart.length - 1].modelNumber + " was added to cart");
            //location.reload();
        }
        else{
            window.alert("You can't add more then 7 items to your cart");
        }
    }

    /**
     *
     * @param model
     */
    addToCart(model){
        this.axiosInstance.post("addToCart", {username: this.username, modelNumber: model},{cancelToken: this.source.token})
            .then(this.addToCartCallback)
            .catch(function (thrown) {
                if (axios.isCancel(thrown.error)) {
                    console.log(thrown.message);
                }
                else{
                    window.alert("Looks like the product is unavailable at the moment");
                    console.log(thrown);
                    location.reload();
                }
            });
    }

    /**
     *
     * @param id
     * @param model
     */
    removeFromShoppingCart(id, model){
        let productId = this.popId(id);

        if(!model){
            model = productId.modelNumber;
        }

        if(localStorage.getItem('jwtToken')){
            this.axiosInstance.post("removeFromCart", {username: this.username, modelNumber: model, serialNumber: id})
                .then(function(response){
                    console.log(response);
                }).catch(function(err){
                console.log(err);
            });
            console.log(this.shoppingCart);
        }
        else{
            location.reload();
        }
    }

    popId(serial){
        for(let i = 0; i < this.shoppingCart.length; i++){
            if(serial === this.shoppingCart[i].serialNumber){
                let id = this.shoppingCart[i];
                this.shoppingCart.splice(i, 1);
                return id;
            }
        }
    }

    /**
     * Removes an array of serial numbers from the cart
     */
    removeIdsFromCart(arr){
        for(let i = 0; i< arr.length; i++){
            this.removeFromShoppingCart(arr[i])
        }
    }

    /**
     * Gets shopping cart from server side and sets the client's cart
     */
    fetchShoppingCart(){
        this.axiosInstance.get("getShoppingCart?username="+this.username, {cancelToken: this.source.token})
            .then(this.fetchCartCallback)
            .catch(function(err){
                console.log(err);
            });
    }

    /**
     *
     * @param data
     */
    fetchCartCallback(data){

        for(let i = 0; i< data.data.cart.length; i++){
            let product = data.data.cart[i];

            this.shoppingCart.push(new ProductId(product, data.data.timestamps[product.SerialNumber], this));
        }

    }

    /**
     *
     */
    completeTransaction(){

        this.shoppingCart = [];
        this.axiosInstance.post("completeTransaction", {username: this.username},{cancelToken: this.source.token} )
            .then(function(response){
                alert("transaction completed! ");
                location.reload();
            }).catch(function(response){
                console.log(response);
        });
    }

    /**
     *
     * @param response
     */
    purchaseHistoryCallback(response){
        this.purchaseHistory = response.data;
        
    }

    getReturnedItems(){
        let returned = [];
        for(let i = 0; i<this.purchaseHistory.length; i++){
            if(this.purchaseHistory[i].IsReturned){
                returned.push(this.purchaseHistory[i].SerialNumber);
            }
        }
        return returned;
    }

    /**
     *
     */
    fetchPurchaseHistory(){
        this.axiosInstance.get("getPurchaseHistory?username="+this.username,{cancelToken: this.source.token})
            .then(this.purchaseHistoryCallback)
            .catch(function(response){
                console.log(response);
        })
    }

    returnItem(serial){
        this.axiosInstance.post("returnItem", {username: this.username, serialNumber: serial})
            .then(function(response){
                alert("Return of " + serial + " successful!");
                console.log(response);
                location.reload();
            }).catch(function(err){
                console.log(err);
        })
    }


    deleteAccount(){
        axios.post('/users/deleteAccount', {username: this.username})
            .then(function(response){
                alert(response.data);
            }).catch(function(err){
                console.log(err);
        })
    }

}