import React, {Component } from 'react';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import auth from '../General/auth.js';
import axios from 'axios';


export const RegisterModal = React.createClass({
    getInitialState() {
        return {
            showModal: false,
            formStatusFirstName:'',
            formStatusLastName:'',
            formStatusEmail:'',
            formStatusStreetNumber:'',
            formStatusStreetName:'',
            formStatusCity:'',
            formStatusZip:'',
            formStatusPhone:'',
            formStatusUser:'',
            formStatusPassword:'',
            formStatusConfirmPassword:'',

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

    //Check if not empty and ensures no digits in name
    handleChangeFirstName(e){
        this.setState({[e.target.name]: e.target.value});
         const re = /^[a-z ,.'-]+$/;

        if(e.target.value != '' && re.test(e.target.value)){
          this.setState({formStatusFirstName: 'success'});
        }
        else{
          this.setState({formStatusFirstName: 'error'});
        }

    },


    //Check if not empty and ensures no digits in name
    handleChangeLastName(e){
        this.setState({[e.target.name]: e.target.value});
         const re = /^[a-z ,.'-]+$/;

        if(e.target.value != '' && re.test(e.target.value)){
          this.setState({formStatusLastName: 'success'});
        }
        else{
          this.setState({formStatusLastName: 'error'});
        }

    },

    //Check if not empty and is a valid email format
    handleChangeEmail(e){
        this.setState({[e.target.name]: e.target.value});
         const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if(e.target.value != '' && re.test(e.target.value)){
          this.setState({formStatusEmail: 'success'});
        }
        else{
          this.setState({formStatusEmail: 'error'});
        }

    },

    //Check if not empty and only numerical values
    handleChangeStreetNumber(e){
        this.setState({[e.target.name]: e.target.value});
         const re = /^\d+$/;

        if(e.target.value != '' && re.test(e.target.value)){
          this.setState({formStatusStreetNumber: 'success'});
        }
        else{
          this.setState({formStatusStreetNumber: 'error'});
        }

    },

    //Check if not empty and matches street name format
    handleChangeStreetName(e){
        this.setState({[e.target.name]: e.target.value});
         const re = /^[a-z\d\-_\s]+$/;

        if(e.target.value != '' && re.test(e.target.value)){
          this.setState({formStatusStreetName: 'success'});
        }
        else{
          this.setState({formStatusStreetName: 'error'});
        }

    },

    //Check if not empty and name not containing digits
    handleChangeCity(e){
        this.setState({[e.target.name]: e.target.value});
         const re = /^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/;

        if(e.target.value != '' && re.test(e.target.value)){
          this.setState({formStatusCity: 'success'});
        }
        else{
          this.setState({formStatusCity: 'error'});
        }

    },


    //Check if not empty and valid Canadian or U.S. postal code
    handleChangeZip(e){
        this.setState({[e.target.name]: e.target.value});
         const re = /^(\d{5}|[A-z]\d[A-z] ?\d[A-z]\d)$/;

        if(e.target.value != '' && re.test(e.target.value)){
          this.setState({formStatusZip: 'success'});
        }
        else{
          this.setState({formStatusZip: 'error'});
        }

    },

        //Check if not empty and valid 10 digit number
        handleChangePhone(e){
            this.setState({[e.target.name]: e.target.value});
             const re = /^\d{10}$/;

            if(e.target.value != '' && re.test(e.target.value)){
              this.setState({formStatusPhone: 'success'});
            }
            else{
              this.setState({formStatusPhone: 'error'});
            }
      },

        //Check if not empty and username containing letters, digits or a mixed of both
        handleChangeUser(e){
            this.setState({[e.target.name]: e.target.value});
             const re = /^[a-zA-Z0-9]+$/;

            if(e.target.value != '' && re.test(e.target.value)){
              this.setState({formStatusUser: 'success'});
            }
            else{
              this.setState({formStatusUser: 'error'});
            }

      },
        //Verifies that string is not empty and password minimum eight characters, at least one letter and one number
        handleChangePassword(e){
            this.setState({[e.target.name]: e.target.value});
             const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            if(e.target.value != '' && re.test(e.target.value)){
              this.setState({formStatusPassword: 'success'});
            }
            else{
              this.setState({formStatusPassword: 'error'});
            }

      },

        //Check if not empty and confirm passwar matches original password
        handleChangeConfirmPassword(e){
            this.setState({[e.target.name]: e.target.value});


            if(e.target.value != '' && e.target.value == this.state.Password){
              this.setState({formStatusConfirmPassword: 'success'});
            }
            else{
              this.setState({formStatusConfirmPassword: 'error'});
            }

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
      console.log(this.state.formStatus)
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

                      <FormGroup validationState={this.state.formStatusFirstName}>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl type="text" name="FirstName" onChange={this.handleChangeFirstName} placeholder="Enter First Name" />
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusLastName}>
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl type="text" name="LastName"  onChange={this.handleChangeLastName} placeholder="Enter Last Name"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusEmail}>
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl type="email" name="EmailAddress" onChange={this.handleChangeEmail} placeholder="Enter E-mail"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusStreetNumber}>
                        <ControlLabel>Street Number</ControlLabel>
                        <FormControl type="number" name="StreetNumber" onChange={this.handleChangeStreetNumber} placeholder="Enter Street Number"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusStreetName}>
                        <ControlLabel>Street Name</ControlLabel>
                        <FormControl type="text" name="streetName" onChange={this.handleChangeStreetName} placeholder="Enter Street Name"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <ControlLabel>Apt (If applicable):</ControlLabel>
                      <FormControl type="text" name="apt" onChange={this.handleChange} placeholder="Enter Apt Number"/>

                      <FormGroup validationState={this.state.formStatusCity}>
                        <ControlLabel>City</ControlLabel>
                        <FormControl type="text" name="city" onChange={this.handleChangeCity} placeholder="Enter City"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusZip}>
                        <ControlLabel>Postal Code</ControlLabel>
                        <FormControl type="text" name="postalCode" onChange={this.handleChangeZip} placeholder="Enter Postal Code"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <ControlLabel>Country</ControlLabel>
                        <FormControl componentClass="select" name="country" onChange={this.handleChange}>
                        <option disabled selected>Select Country</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                      </FormControl>

                      <FormGroup validationState={this.state.formStatusPhone}>
                        <ControlLabel>PhoneNumber</ControlLabel>
                        <FormControl type="tel" name="PhoneNumber" onChange={this.handleChangePhone} placeholder="Enter Phone Number" />
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusUser}>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl type="text" name="Username" value={this.state.Username} onChange={this.handleChangeUser} placeholder="Enter Username"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusPassword}>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password" name="Password" value={this.state.Password} onChange={this.handleChangePassword} placeholder="Enter Password"/>
                        <FormControl.Feedback/>
                      </FormGroup>

                      <FormGroup validationState={this.state.formStatusConfirmPassword}>
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl type="password" name="ConfirmPassword" onChange={this.handleChangeConfirmPassword} placeholder="Confirm Password"/>
                        <FormControl.Feedback/>
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
