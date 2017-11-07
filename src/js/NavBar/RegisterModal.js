import React, {Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import auth from '../General/auth.js';
import axios from 'axios';
import AlertContainer from 'react-alert';

//Regex validation
const nameRegex = /^[a-z ,.'-]+$/,
      emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      numberRegex = /^\d+$/,
      streetNameRegex = /^[a-z\d\-_\s]+$/,
      cityRegex = /^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/,
      zipRegex = /^(\d{5}|[A-z]\d[A-z] ?\d[A-z]\d)$/,
      phoneRegex = /^\d{10}$/,
      usernameRegex = /^[a-zA-Z0-9]{4,10}$/,
      passwordRegex = /^[a-zA-Z0-9]{4,10}$/;

const alertOptions = {
  position: 'bottom center'
}

export const RegisterModal = React.createClass({
    getInitialState() {
        return {
            showModal: false,

            //Form data
            Username: '',
            Password: '',
            ConfirmPassword:'',
            FirstName: '',
            LastName: '',
            EmailAddress: '',
            PhoneNumber: '',
            Administrator: 0,
            Apt: '',
            StreetNumber: '',
            Street: '',
            City: '',
            ZIP: '',
            Country: '',

            // Validation status
            formStatusFirstName: null,
            formStatusLastName: null,
            formStatusEmail: null,
            formStatusStreetNumber: null,
            formStatusStreetName: null,
            formStatusApt: null,
            formStatusCity: null,
            formStatusCountry: null,
            formStatusZip: null,
            formStatusPhone: null,
            formStatusUsername: null,
            formStatusPassword: null,
            formStatusConfirmPassword: null,  
          };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
        this.validateOnChange(e.target.name, e.target.value);
    },
    
    /**
     * Checks if input is empty and tests the appropriate regex
     * Checks if both passwords match
     */
    validateOnChange(name, value){
      let regex;

      switch(name){
        case 'FirstName':
          regex = nameRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusFirstName: 'success'});
          }
          else{
            this.setState({formStatusFirstName: 'error'});
          }
          break;

        case 'LastName':
          regex = nameRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusLastName: 'success'});
          }
          else{
            this.setState({formStatusLastName: 'error'});
          }
          break;

        case 'EmailAddress':
          regex = emailRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusEmail: 'success'});
          }
          else{
            this.setState({formStatusEmail: 'error'});
          }
          break;

        case 'StreetNumber':
          regex = numberRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusStreetNumber: 'success'});
          }
          else{
            this.setState({formStatusStreetNumber: 'error'});
          }
          break;

        case 'streetName':
          regex = streetNameRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusStreetName: 'success'});
          }
          else{
            this.setState({formStatusStreetName: 'error'});
          }
          break;

        case 'apt':
          regex = numberRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusApt: 'success'});
          }
          else{
            this.setState({formStatusApt: 'error'});
          }
          break;

        case 'city':
          regex = cityRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusCity: 'success'});
          }
          else{
            this.setState({formStatusCity: 'error'});
          }
          break;
          
        case 'postalCode':
          regex = zipRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusZip: 'success'});
          }
          else{
            this.setState({formStatusZip: 'error'});
          }
          break;
        
        case 'country':
          if(value != 'select'){
            this.setState({formStatusCountry: 'success'});
          }
          else{
            this.setState({formStatusCountry: 'error'});
          }
          break;
          
        case 'PhoneNumber':
          regex = phoneRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusPhone: 'success'});
          }
          else{
            this.setState({formStatusPhone: 'error'});
          }
          break;

        case 'Username':
          regex = usernameRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusUsername: 'success'});
          }
          else{
            this.setState({formStatusUsername: 'error'});
          }
          break;

        case 'Password':
          regex = passwordRegex;
          if(value != '' && regex.test(value)){
            this.setState({formStatusPassword: 'success'});
          }
          else{
            this.setState({formStatusPassword: 'error'});
          }
          break;

        //Checks if passwords match
        case 'ConfirmPassword':
          regex = passwordRegex;
          if(value != '' && regex.test(value) && value === this.state.Password){
            this.setState({formStatusConfirmPassword: 'success'});
          }
          else{
            this.setState({formStatusConfirmPassword: 'error'});
          }
          break;
      }
    },

    /**
     * Returns true if every formStatus is set to 'success'
     * else returns false
     */
    validateOnSubmit(){
      if(this.state.formStatusFirstName === 'success' &&
         this.state.formStatusLastName === 'success' && 
         this.state.formStatusEmail === 'success' &&
         this.state.formStatusStreetNumber === 'success' &&
         this.state.formStatusStreetName === 'success' &&
         this.state.formStatusApt === 'success' &&
         this.state.formStatusFirstName === 'success' &&
         this.state.formStatusCity === 'success' &&
         this.state.formStatusZip === 'success' &&
         this.state.formStatusCountry === 'success' &&
         this.state.formStatusPhone === 'success' &&
         this.state.formStatusUsername === 'success' &&
         this.state.formStatusPassword === 'success' &&
         this.state.formStatusConfirmPassword === 'success'
        ){
          return true;
        }
        else{
          return false;
        }
    },

    register(e){
        e.preventDefault();
        if(this.validateOnSubmit()){
          axios.post('/users/register', { Username: this.state.Username,
                                        Password: this.state.Password,
                                        FirstName: this.state.FirstName,
                                        LastName:this.state.LastName,
                                        EmailAddress:this.state.EmailAddress,
                                        PhoneNumber:this.state.PhoneNumber,
                                        Administrator:this.state.Administrator,
                                        Apt: this.state.Apt,
                                        StreetNumber: this.state.StreetNumber,
                                        Street: this.state.Street,
                                        City: this.state.City,
                                        ZIP: this.state.ZIP,
                                        Country: this.state.Country
                                      })
            .then(res => {
            console.log(res);
            if(res.data.success){
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                auth.setAuthToken(token);
                auth.setIsAdmin(res.data.user.Administrator);
                this.setState({showModal:false});
            }
            else{
                this.msg.show(res.data.msg, {type: 'error'})
            }
          });
      }
      else{
        this.msg.show('Invalid fields', {type: 'error'});
      }
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
            <div>
              <Redirect push to="/ClientDashboard" />
            </div>
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
                    <AlertContainer ref={a => this.msg = a} {...alertOptions}/>
                    <FormGroup validationState={this.state.formStatusFirstName}>
                      <ControlLabel>First Name</ControlLabel>
                      <FormControl type="text" name="FirstName" onChange={this.handleChange} placeholder="Enter First Name" />
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusLastName}>
                      <ControlLabel>Last Name</ControlLabel>
                      <FormControl type="text" name="LastName"  onChange={this.handleChange} placeholder="Enter Last Name"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusEmail}>
                      <ControlLabel>E-mail</ControlLabel>
                      <FormControl type="email" name="EmailAddress" onChange={this.handleChange} placeholder="Enter E-mail"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusStreetNumber}>
                      <ControlLabel>Street Number</ControlLabel>
                      <FormControl type="text" name="StreetNumber" onChange={this.handleChange} placeholder="Enter Street Number"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusStreetName}>
                      <ControlLabel>Street Name</ControlLabel>
                      <FormControl type="text" name="streetName" onChange={this.handleChange} placeholder="Enter Street Name"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusApt}>                    
                      <ControlLabel>Apt:</ControlLabel>
                      <FormControl type="text" name="apt" onChange={this.handleChange} placeholder="Enter Apt Number"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusCity}>
                      <ControlLabel>City</ControlLabel>
                      <FormControl type="text" name="city" onChange={this.handleChange} placeholder="Enter City"/>
                      <FormControl.Feedback />
                    </FormGroup>
                    
                    <FormGroup validationState={this.state.formStatusZip}>
                      <ControlLabel>Postal Code</ControlLabel>
                      <FormControl type="text" name="postalCode" onChange={this.handleChange} placeholder="Enter Postal Code"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusCountry}>
                      <ControlLabel>Country</ControlLabel>
                      <FormControl componentClass="select" name="country" onChange={this.handleChange}>
                        <option disabled selected value="select">Select Country</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                      </FormControl>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusPhone}>
                      <ControlLabel>PhoneNumber</ControlLabel>
                      <FormControl type="tel" name="PhoneNumber" onChange={this.handleChange} placeholder="Enter Phone Number" />
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusUsername}>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl type="text" name="Username" value={this.state.Username} onChange={this.handleChange} placeholder="Enter Username"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusPassword}>
                      <ControlLabel>Password</ControlLabel>
                      <FormControl type="password" name="Password" value={this.state.Password} onChange={this.handleChange} placeholder="Enter Password"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup validationState={this.state.formStatusConfirmPassword}>
                      <ControlLabel>Confirm Password</ControlLabel>
                      <FormControl type="password" name="ConfirmPassword" value={this.state.ConfirmPassword} onChange={this.handleChange} placeholder="Confirm Password"/>
                      <FormControl.Feedback />
                    </FormGroup>

                    <br/>
                    <Button bsStyle="primary" onClick={this.register}>Submit</Button>
                    
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
