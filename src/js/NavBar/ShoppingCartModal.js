import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import auth from '../General/auth.js';


export const ShoppingCartModal = React.createClass({
    getInitialState() {
        return { showModal: false };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render(){
        if(auth.loggedIn()){
            return(
                <Button>Shopping Cart</Button>
                );
        }

        return(
            <div>
                <Button bsStyle="primary" onClick={this.open}>Shopping Cart</Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Shopping Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      You must login to access the shopping cart!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});


