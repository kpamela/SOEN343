/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import User from "./User.js"
import axios from 'axios';

export default class Client extends User{
    constructor(username){
        super(username);
    }

    addToCart(model){

        this.axiosInstance.post("addToCart", {username: this.username, modelNumber: model},{cancelToken: this.source.token})
            .then(function(response){
                location.reload();
                console.log(response);
            })
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
}