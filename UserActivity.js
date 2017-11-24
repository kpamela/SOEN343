import React, { Component } from 'react';
import {Logout} from './Logout.js';
import {PageHeader} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';



export default class UserActivity extends Component{
  
    constructor() {
        super();
        this.username = 'username';
        this.date = 'date';
        this.activeUser = [];
        this.getActiveUsers()
    }
    
getActiveUsers(){
     axios.get('/users/activeUsers')
            .then((res) => {  
                this.activeUser = res.data;
            });
    }
    
renderUsers(username,date){
    return(
        <div>
            <tbody>
                <table>
                 <tr>
                    <td>{username = this.activeUser[0]}</td>
                    <td>{date = this.activeUser[1]}</td>
                </tr>
                </table>      
            </tbody>
        </div>
    )};
    
    /*
    Inside render maybe add these 2 lines
     const user = this.props.user;

    const usersList = this.props.user.registeredUsers;
    
    and change <BootstrapTable> to <BootstrapTable data = {usersList}> but adding this in gives a fatal error
    
    This should pull the username data using the RegisteredUserModal but pulling the login time is where I am having the issue
    */
render() {
   
    
    for(let i = 0; i < this.activeUser.length; i++){
        console.log(this.activeUser[i]); 
    }
    return( <div id = "UserActivity">
            <PageHeader>Active User Registry</PageHeader>
            <BootstrapTable>
            <TableHeaderColumn dataField='Username'  dataAlign="left" isKey>Username</TableHeaderColumn>
            <TableHeaderColumn dataField='Date'>Login Date</TableHeaderColumn>

           </BootstrapTable>
           
           </div>
       
        //Issue is in the body, it doesnt read/execute the above line for some reason even though it should be able to read and add elements from a dynamic array
    )};
}