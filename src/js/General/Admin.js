/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import axios from 'axios';
import React from 'react';
import User from './User.js';
import $ from 'jquery';

export default class Admin extends User {

    constructor() {
        super();
        this.hasUncommittedChanges = new $.Deferred();

        this.setUncommittedChange = this.setUncommittedChange.bind(this);
        this.handleRevert = this.handleRevert.bind(this);
    }

    /**
     * Creates a new instance of product description and returns its position in array p
     * @param category
     * @param amount
     * @returns {number}
     */
    addProduct(category, amount) {
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
    specify(product, desc) {
        this.p[product].setDescription(desc);

    }

    setUncommittedChange(response) {

        this.hasUncommittedChanges.resolve(response.data.hasUncommittedChanges);
    }

    handleRevert(response) {
        console.log(response);
        this.hasUncommittedChanges.resolve(response.data.hasUncommittedChanges);
        this.setListing(response.data);
    }

    commitChanges() {
        this.hasUncommittedChanges = new $.Deferred();
        this.axiosInstance.post('commitChanges', {}, {cancelToken: this.source.token})
            .then(this.setUncommittedChange)
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log(thrown.message);
                }
                else console.log(thrown);
            });
    }

    revertChanges() {
        this.data = new $.Deferred();
        this.hasUncommittedChanges = new $.Deferred();
        this.axiosInstance.get("revertChanges", {cancelToken: this.source.token})
            .then(this.handleRevert)
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log("canceled: " + thrown);
                }
                else console.log("error: " + thrown);
            });
    }

    modify(item, pos, model) {
        this.p[pos] = item;
        this.hasUncommittedChanges = new $.Deferred();
        this.axiosInstance.patch('modify', {previous: model, current: item}, {cancelToken: this.source.token})
            .then(this.setUncommittedChange)
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log(thrown.message);
                }
                else console.log(thrown);
            });

    }

    remove(index, model) {
        this.p.splice(index, 1);
        this.hasUncommittedChanges = new $.Deferred();
        this.axiosInstance.post('remove', {model: model}, {cancelToken: this.source.token})
            .then(this.setUncommittedChange)
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log(thrown.message);
                }
                else console.log(thrown);
            });

    }

    getCommitState() {
        this.hasUncommittedChanges = new $.Deferred();
        this.axiosInstance.get("getCommitState", {cancelToken: this.source.token})
            .then(this.setUncommittedChange)
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log("canceled: " + thrown);
                }
                else console.log("error: " + thrown);
            });
    }

    addItem(data) {
        this.hasUncommittedChanges = new $.Deferred();
        this.axiosInstance.post('add', {data}, {cancelToken: this.source.token})
            .then(this.setUncommittedChange)
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log(thrown.message);
                }
                else console.log(thrown);
            });
    }
}
