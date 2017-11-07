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

        this.addToCartCallback = this.addToCartCallback.bind(this);
        this.fetchCartCallback = this.fetchCartCallback.bind(this);
        this.fetchShoppingCart();
    }


    /**
     *
     * @param id
     */
    addToCartCallback(id){
        this.shoppingCart.push(new ProductId(id.data.id, id.data.timeStamp, this));
        console.log(this.shoppingCart[this.shoppingCart.length - 1]);
        location.reload();
    }

    /**
     *
     * @param model
     */
    addToCart(model){
        this.axiosInstance.post("addToCart", {username: this.username, modelNumber: model},{cancelToken: this.source.token})
            .then(this.addToCartCallback)
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
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
        for(let i = 0; i < this.shoppingCart.length; i++){
            if(id === this.shoppingCart[i].serialNumber){
                this.shoppingCart.splice(i, 1);
                break;
            }
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
        console.log(data.data.timestamps);
        for(let i = 0; i< data.data.cart.length; i++){
            let product = data.data.cart[i];

            this.shoppingCart.push(new ProductId(product, data.data.timestamps[product.SerialNumber], this));
        }
        console.log(this.shoppingCart);
    }
}