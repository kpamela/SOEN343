/**
 * Created by CharlesPhilippe on 2017-10-21.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import Catalogue from './Catalogue.js';
import NewProductRequest from './NewProductRequest.js';
import ProductListing from './ProductListing.js';
import {RegisteredUsersModal} from '../NavBar/RegisteredUsersModal'
import {PageHeader, Button} from 'react-bootstrap';
import { ActiveUsersModal } from '../NavBar/ActiveUsersModal';


export class AdminDashboard extends Catalogue{
    constructor(props){
        super(props);
        this.state['uncommittedChanges'] = <div></div>;


        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(){
        this.setState({
            PRODUCTS: this.state.usr.p, sorting:""
        }, function(){
            console.log(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.addItem(this.state.usr.p[this.state.usr.p.length-1]);
            this.state.usr.hasUncommittedChanges.then(this.commitChanges);//waiting for addItem;

        });
    }

    commitChanges(){
        let confirm = window.confirm("Are you sure you want to commit changes?");
        if(confirm){
            this.state.usr.commitChanges();
            this.handleUncommittedChanges();
        }

    }

    revertChanges(){
        this.state.usr.revertChanges();
        this.handleUncommittedChanges();
        this.state.usr.data.then(this.handleGetData);
    }

     handleUncommittedChangesCB(response){
        if(response){
            this.setState({uncommittedChanges:
                <div className="uncommittedChanges">
                    <h3>Are you sure you want to commit these changes?</h3>
                    <Button bsStyle="primary" onClick={()=> this.commitChanges()}>Commit</Button>
                    <Button onClick={() => this.revertChanges()}>Revert</Button>
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
      let registered =<RegisteredUsersModal user={this.state.usr}/>;
      let usersList = document.getElementById("RegisteredUser");
      if(usersList) {
          ReactDOM.render(registered, usersList);
      }

      let active = <ActiveUsersModal user={this.state.usr}/>;
      let activeUsersList = document.getElementById("ActiveUsers")
      if(activeUsersList){
          ReactDOM.render(active, activeUsersList);
      }

        if(this.state.usr.hasUncommittedChanges.state() === "pending"){
            this.state.usr.getCommitState();
            this.handleUncommittedChanges();
        }
       // this.handleUncommittedChanges();
        return(
            <div>
                <PageHeader className="catalogHeader">Administrator Dashboard</PageHeader>
                {super.render()}
                <NewProductRequest
                    usr={this.state.usr}
                    onAnother={this.handleNewItem}
                    onSubmit={this.handleSubmit}
                />

                {this.state.uncommittedChanges}

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
                
            </div>

        );
    }
}