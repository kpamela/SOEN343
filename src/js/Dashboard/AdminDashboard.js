/**
 * Created by CharlesPhilippe on 2017-10-21.
 */

import React from 'react';
import Catalogue from './Catalogue.js';
import NewProductRequest from './NewProductRequest.js';
import ProductListing from './ProductListing.js';


export class AdminDashboard extends Catalogue{
    constructor(props){
        super(props);
        this.state['uncommittedChanges'] = <div></div>;


        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.commitChanges = this.commitChanges.bind(this);
        this.revertChanges = this.revertChanges.bind(this);
        this.handleUncommittedChanges = this.handleUncommittedChanges.bind(this);
        this.handleUncommittedChangesCB = this.handleUncommittedChangesCB.bind(this);
    }


    //Adding new product to product list upon receiving new item signal
    handleNewItem(){

        this.setState({
            PRODUCTS: this.state.usr.p, sorting:""
        }, function(){
            console.log(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.addItem(this.state.usr.p[this.state.usr.p.length-1]);
            this.handleUncommittedChanges();
        });

    }

    handleCommit(){
        this.setState({
            PRODUCTS: this.state.usr.p, sorting:""
        }, function(){
            console.log(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.addItem(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.commitChanges();
            this.handleUncommittedChanges();
        });
    }

    commitChanges(){
        this.state.usr.commitChanges();
        this.handleUncommittedChanges();
    }

    revertChanges(){
        this.state.usr.revertChanges();
        this.handleUncommittedChanges();
        this.state.usr.data.then(this.handleGetData);
        this.forceUpdate();
    }

    handleUncommittedChangesCB(response){

        if(response){
            this.setState({uncommittedChanges:
                <div>
                    <button onClick={()=> this.commitChanges()}>
                        Commit
                    </button>
                    <button onClick={() => this.revertChanges()}>
                        Revert
                    </button>
                </div>
             });
        }
        else{
            this.setState({uncommittedChanges: <div></div>});
        }
    }

    handleUncommittedChanges() {
        this.state.usr.hasUncommittedChanges.then(this.handleUncommittedChangesCB);
    }


    render(){
       // this.handleUncommittedChanges();
        return(
            <div>
                {super.render()}
                <NewProductRequest
                    usr={this.state.usr}
                    onAnother={this.handleNewItem}
                    onSubmit={this.handleCommit}
                />

                <ProductListing
                    userType="admin"
                    products={this.state.PRODUCTS}
                    filterText={this.state.filterText}
                    include={this.state.include}
                    usr={this.state.usr}
                    toggleDisableSort={this.toggleDisableSort}
                    onChanges={this.handleUncommittedChanges}
                />
                <br/>
                {this.state.uncommittedChanges}
            </div>

        );
    }
}