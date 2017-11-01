import React, {Component } from 'react';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import auth from '../General/auth.js';
import axios from 'axios';


export const RegisterModal = React.createClass({
    getInitialState() {
        return {
            showModal: false,

            Username: '',
            Password: '',
            Administrator: 0};
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    },
    register(e){
        e.preventDefault();
        console.log(this.state);
        axios.post('/users/register', {Username: this.state.Username,
                                        Password: this.state.Password,
                                        FirstName: this.state.FirstName,
                                        LastName:this.state.LastName,
                                        EmailAddress:this.state.EmailAddress,
                                        PhoneNumber:this.state.PhoneNumber,
                                        Administrator:this.state.Administrator})
            .then(res => {
            console.log(res);
            if(res.data.success){
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                auth.setAuthToken(token);
                auth.setIsAdmin(res.data.user.administrator);
            }
            else{
                console.log(res.data.msg)
            }
        });
    },

    render() {
      if(auth.loggedIn()){
        if(auth.getIsAdmin() == 1){
          return(
            <Redirect push to="/AdminDashboard" />
          );
        }
        else if(auth.getIsAdmin() == 0){
          return(
            <Redirect push to="/ClientDashboard" />
          );
        }
      }
        return (
            <div>
              <Button bsStyle="default" bsSize="sm" onClick={this.open}>
                Register
              </Button>

              <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <FormGroup>
                      <ControlLabel>First Name</ControlLabel>
                      <FormControl type="text" name="FirstName" onChange={this.handleChange} placeholder="Enter First Name" />

                      <ControlLabel>Last Name</ControlLabel>
                      <FormControl type="text" name="LastName"  onChange={this.handleChange} placeholder="Enter Last Name"/>

                      <ControlLabel>E-mail</ControlLabel>
                      <FormControl type="email" name="EmailAddress" onChange={this.handleChange} placeholder="Enter E-mail"/>

                      <ControlLabel>Street Number</ControlLabel>
                      <FormControl type="number" name="StreetNumber" onChange={this.handleChange} placeholder="Enter Street Number"/>

                      <ControlLabel>Street Name</ControlLabel>
                      <FormControl type="text" name="streetName" onChange={this.handleChange} placeholder="Enter Street Name"/>

                      <ControlLabel>Apt:</ControlLabel>
                      <FormControl type="text" name="apt" onChange={this.handleChange} placeholder="Enter Apt Number"/>

                      <ControlLabel>City</ControlLabel>
                      <FormControl type="text" name="city" onChange={this.handleChange} placeholder="Enter City"/>

                      <ControlLabel>Postal Code</ControlLabel>
                      <FormControl type="text" name="postalCode" onChange={this.handleChange} placeholder="Enter Postal Code"/>

                      <ControlLabel>Country</ControlLabel>
                      <FormControl componentClass="select" name="country" onChange={this.handleChange}>
                        <option disabled selected>Select Country</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                      </FormControl>

                      <ControlLabel>PhoneNumber</ControlLabel>
                      <FormControl type="tel" name="PhoneNumber" onChange={this.handleChange} placeholder="Enter Phone Number" />

                      <ControlLabel>Username</ControlLabel>
                      <FormControl type="text" name="Username" value={this.state.Username} onChange={this.handleChange} placeholder="Enter Username"/>

                      <ControlLabel>Password</ControlLabel>
                      <FormControl type="password" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Enter Password"/>

                      <ControlLabel>Confirm Password</ControlLabel>
                      <FormControl type="password" name="Password" placeholder="Confirm Password"/>

                      <br/>
                      <Button bsStyle="primary" onClick={this.register}>Submit</Button>
                    </FormGroup>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
        );
    }

});
