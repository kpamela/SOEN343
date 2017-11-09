import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import auth from '../General/auth.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
<<<<<<< HEAD
import Client from '../General/Client';
=======
>>>>>>> master



export const ShoppingCartModal = React.createClass({

    getInitialState() {
        // noinspection JSAnnotator
        return {
            showModal: false,
            selectRow:{mode:'checkbox'}
        };
    },

    close(){
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },

    submit() {
<<<<<<< HEAD
        alert('Your purchase is confirmed!');
    },

    handleDeleteRow(next, dropRowKeys){
        const dropRowKeysStr = dropRowKeys.join(',');
        if (confirm(`Are you sure you want to delete ${dropRowKeysStr}?`)) {
            next();
        }
    },


    addProducts(quantity, array) {
        const startId = array.length;
        for (let i = 0; i < quantity; i++) {
            const modelNumber = startId + i;
           array.push({
                serialNumber: 500 + i,
                modelNumber: modelNumber,
                productName: `Item name ${modelNumber}`,
                price: 2100 + i
            });
        }
    },

    totalPrice(){

    },

    render(){
        // When user is not logged in
        if (!auth.loggedIn()) {
            return (
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

<<<<<<< HEAD
        // When user is logged in as client
        const options = {
            afterDeleteRow:this.handleDeleteRow
        };
=======

        const user = this.props.user;

        // When user is logged in as client
        const options = {
            afterDeleteRow: function(keys){
                user.removeIdsFromCart(keys);
            }
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true
        };

        //Hard coded products
        const products = this.props.user.shoppingCart;
       // this.addProducts(5, products);

        if (auth.getIsAdmin() == 0) {
            return (
                <div id="ShoppingCartModal">
                    <Button bsStyle="primary" onClick={this.open} >Shopping Cart</Button>

                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header closeButton>
                            <Modal.Title>Shopping Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BootstrapTable data={products}  selectRow={selectRow} deleteRow={true} options={options}>
                                <TableHeaderColumn dataField='serialNumber'  dataAlign="left" isKey>Serial Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='modelNumber'>Product Model</TableHeaderColumn>
                                {/*<TableHeaderColumn dataField='productName'>Product Name</TableHeaderColumn>*/}
                                <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
                            </BootstrapTable>
                        </Modal.Body>
                        <Modal.Footer>
                            {/*<p>Total:{sumofPrices}</p>*/}
                            <Button onClick={this.close}>Cancel</Button>
                            <Button onClick={this.submit}>Confirm Transaction</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }

        // When user is an admin
        if(auth.getIsAdmin() == 1){
            return(null);
        }
}
});
>>>>>>> master

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true
        };

        //Hard coded products
        const products = [];
        this.addProducts(5, products);

        if (auth.getIsAdmin() == 0) {
            return (
                <div>
                    <Button bsStyle="primary" onClick={this.open} >Shopping Cart</Button>
                    {/*<p>Hello, {localStorage.getItem('username')}</p>*/}

                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header closeButton>
                            <Modal.Title>Shopping Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BootstrapTable data={products} options={options && {noDataText: 'The shopping cart is empty'}} selectRow={selectRow} deleteRow >
                                <TableHeaderColumn dataField='serialNumber'  dataAlign="left" isKey={true}>Serial Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='modelNumber'>Product Model</TableHeaderColumn>
                                <TableHeaderColumn dataField='productName'>Product Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
                            </BootstrapTable>
                        </Modal.Body>
                        <Modal.Footer>
                            {/*<p>Total:{sumofPrices}</p>*/}
                            <Button onClick={this.close}>Cancel</Button>
                            <Button onClick={this.submit}>Confirm Transaction</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }

        // When user is an admin
        if(auth.getIsAdmin() == 1){
            return(null);
        }
    }
});
