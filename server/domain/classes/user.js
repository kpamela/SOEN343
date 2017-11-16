const express = require('express');


class User{
    constructor(user){
        this.Username       = user.Username;
        this.Password       = user.Password;
        this.FirstName      = user.FirstName;
        this.LastName       = user.LastName;
        this.EmailAddress   = user.EmailAddress;
        this.PhoneNumber    = user.PhoneNumber;
        this.Administrator  = user.Administrator;
        this.Apt            = user.Apt;
        this.StreetNumber   = user.StreetNumber;
        this.Street         = user.Street;
        this.City           = user.City;
        this.ZIP            = user.ZIP;
        this.Country        = user.Country;


    }






}

module.exports = User;
