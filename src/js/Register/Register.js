import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import auth from '../General/auth';

/**
 * Render the signup form
 */
export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username:'',
            password:'',
            firstName:'',
            lastName:'',
            emailAddress:'',
            phoneNumber:'',
            administrator:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    /**
     * User submits the signup form
     */
    handleSubmit(e) {
        e.preventDefault();

        axios.post('/users/register', {
            user: this.state
        })
            .then(res => {
                // if successful, save token in local storage
                if(res.success){
                    const token = res.data.token;
                    localStorage.setItem('jwtToken', token);
                    auth.setAuthToken(token);
                    this.context.router.push('/catalog') // redirect to catalog
                }
                else{
                    console.log(res.msg);
                }
            })
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSelect(e){
        if(e.target.value == 'administrator'){
            this.setState({administrator: true});
        }
        else{
            this.setState({administrator: false});
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="register-form">
                <h1>Create an Account</h1>
                <FormGroup
                    type="text"
                    label="username"
                    value={this.state.username}
                    name="username"
                    placeholder="Enter your username"
                    onChange={this.handleChange}
                />
                <FormGroup
                    type="password"
                    label="password"
                    value={this.state.password}
                    name="password"
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                />
                <FormGroup
                    type="text"
                    label="firstName"
                    value={this.state.firstName}
                    name="firstName"
                    placeholder="Enter your first name"
                    onChange={this.handleChange}
                />
                <FormGroup
                    type="text"
                    label="lastName"
                    value={this.state.lastName}
                    name="lastName"
                    placeholder="Enter your last name"
                    onChange={this.handleChange}

                />
                <FormGroup
                    type="text"
                    label="email"
                    value={this.state.emailAddress}
                    name="emailAddress"
                    placeholder="Enter your email"
                    onChange={this.handleChange}
                />
                <FormGroup
                    type="text"
                    label="phoneNumber"
                    value={this.state.phoneNumber}
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    onChange={this.handleChange}
                />
                
                <SelectGroup
                    label="User type"
                    value={this.state.administrator}
                    onSelect={this.handleSelect}
                />
                <div className="form-group">
                    <button className="form-button">REGISTER</button>
                </div>
            </form>
        );
    }
}

/**
 * Component to render one field in a form
 */
const FormGroup = ({ name, value, label, type, placeholder, onChange }) => {
    return (
        <div className= "form-group">
            <label className="form-label">{label.toUpperCase()}</label>
            <input
                type={type}
                value={value}
                name={name}
                className="form-input"
                placeholder={placeholder}
                onChange={onChange}
            />  
        </div>
    );
}

/**
 * Component to render a drop-down menu
 */
const SelectGroup = ({ label, value, onSelect }) => {
    return (
        <div className="form-group">
            <label className="form-label">{label.toUpperCase()}</label>
            <select id="type" defaultValue="" onChange={onSelect}>
                <option disabled value="">Select</option>
                <option value="administrator">Administrator</option>
                <option value="client">Client</option>
            </select>
        </div>
    );
}