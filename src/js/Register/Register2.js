import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, FormControl, FieldGroup, Checkbox, Button, ControlLabel, PageHeader} from 'react-bootstrap';
import axios from 'axios';
import auth from '../General/auth';

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
                Username:'',
                Password:'',
                FirstName:'',
                LastName:'',
                AddressId:1, //TODO : Change this when address table is created
                EmailAddress:'',
                PhoneNumber:'',
                Administrator: '',

                redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e){
        if(e.target.type === 'checkbox'){
            this.setState({[e.target.name]: e.target.checked});
        }
        else{
            this.setState({[e.target.name]: e.target.value});
        }
    }

    handleSubmit(e){
        e.preventDefault();

        axios.post('/users/register', {
            Username: this.state.Username,
            Password: this.state.Password,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            AddressId: this.state.AddressId,
            EmailAddress: this.state.EmailAddress,
            PhoneNumber: this.state.PhoneNumber,
            Administrator: this.state.Administrator
        })
            .then(res => {
                this.setState({redirect: true});
            });
    }

    render(){
        if(this.state.redirect){
            return(
                <Redirect to={{pathname:"/catalog"}}/>
            )
        }
        return(
            <div className="register-container">
                <PageHeader className="register-header">Create an account</PageHeader>
                <form className="registerForm" onSubmit={this.handleSubmit}>
                    <FormGroup controlId="registerForm">

                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            type="text"
                            name="Username"
                            value={this.state.Username}
                            placeholder="Enter your username"
                            onChange={this.handleChange}
                        />

                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            name="Password"
                            value={this.state.Password}
                            placeholder="Enter your password"
                            onChange={this.handleChange}
                        />

                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type="text"
                            name="FirstName"
                            value={this.state.FirstName}
                            placeholder="Enter your first name"
                            onChange={this.handleChange}
                        />

                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type="text"
                            name="LastName"
                            value={this.state.LastName}
                            placeholder="Enter your last name"
                            onChange={this.handleChange}
                        />

                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="text"
                            name="EmailAddress"
                            value={this.state.EmailAddress}
                            placeholder="Enter your email address"
                            onChange={this.handleChange}
                        />

                        <ControlLabel>Phone Number</ControlLabel>
                        <FormControl
                            type="text"
                            name="PhoneNumber"
                            value={this.state.PhoneNumber}
                            placeholder="Enter your phone number"
                            onChange={this.handleChange}
                        />

                        <Checkbox type="checkbox" name="Administrator" checked={this.state.Administrator} onChange={this.handleChange}>I am an administrator</Checkbox>

                        <Button type="submit">Register</Button>

                    </FormGroup>
                </form>
            </div>
        );
    }
}