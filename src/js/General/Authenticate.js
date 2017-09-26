import React, { Component } from 'react';
import auth from './auth.js';

/**
 * If user is not signed in, prevents access to page
 */

export default function(Comp){
    class Authenticate extends Component{
        constructor(props){
            super(props);

            this.state={
                isAuthenticated: false,
                user: null
            }
        }

        componentWillMount(){
            let user = auth.getCredentials(localStorage.getItem('jwtToken'));
            this.renewAuth(user);
        }

        renewAuth = (user) =>{
            if(user){
                this.setState({user: user});
            }
            else{
                this.context.router.push('/login');
            }
        }

        render(){
            let newProps = { user: this.state.user, renewAuth: this.renewAuth };
            return <Comp {...this.props} {...newProps} />
        }
    }

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    
    return Authenticate;
}