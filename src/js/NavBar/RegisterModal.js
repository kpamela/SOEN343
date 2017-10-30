import React, {Component } from 'react';
import {Modal, Button, FieldGroup} from 'react-bootstrap';
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
                  Register
                  <form onSubmit={this.register}>
                    <label>
                      First Name: <input type="text" name="FirstName" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                      Last Name: <input type="text" name="LastName"  onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                      E-mail: <input type="email" name="EmailAddress" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                      Street Number: <input type="number" name="StreetNumber" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                      Street Name: <input type="text" name="streetName" onChange={this.handleChange}/>
                    </label>
                    <label>
                      Apt: <input type="text" name="apt" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                      City: <input type="text" name="city" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                      Postal Code: <input type="text" name="postalCode" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                      Country:
                      <select name="country" onChange={this.handleChange}>
                        <option value="canada">Canada</option>
                      </select>
                    </label>
                    <br/>
                    <label>
                      Phone Number: <input type="tel" name="PhoneNumber" onChange={this.handleChange} />
                    </label>
                    <br/><br/>
                    <label>
                      Username: <input type="text" name="Username" value={this.state.Username} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                      Password: <input type="password" name="Password" value={this.state.Password} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                      Confirm Password: <input type="password" name="Password" />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
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
