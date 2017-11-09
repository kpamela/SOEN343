/**
 * Created by CharlesPhilippe on 2017-11-07.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import auth from '../General/auth.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



export const PurchaseHistoryModal = React.createClass({

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
        if(this.props.user.purchaseHistory.length === 0){
            this.props.user.fetchPurchaseHistory();
        }
        this.setState({showModal: true});

    },

    submit() {
        this.props.user.completeTransaction();
        alert('Your purchase is underway!');
    },


    timeFormat(cell, row){
        let date = new Date(cell);
        return date.toISOString();
    },

    render(){
        // When user is not logged in
        if (!auth.loggedIn()) {
            return (
                <div>
                    <Button bsStyle="primary" onClick={this.open}>Purchases</Button>

                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Purchase History</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You must login to access the purchase history!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }


        const user = this.props.user;

        // When user is logged in as client
        const options = {

        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true
        };

        //Hard coded products
        const products = this.props.user.purchaseHistory;
        // this.addProducts(5, products);

        if (auth.getIsAdmin() == 0) {
            return (
                <div id="PurchaseHistoryModal">
                    <Button bsStyle="primary" onClick={this.open} >Purchases</Button>

                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header closeButton>
                            <Modal.Title>Purchases</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BootstrapTable data={products}  selectRow={selectRow} options={options}>
                                <TableHeaderColumn dataField='SerialNumber'  dataAlign="left" isKey>Serial Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='ModelNumber'>Product Model</TableHeaderColumn>
                                {/*<TableHeaderColumn dataField='productName'>Product Name</TableHeaderColumn>*/}
                                <TableHeaderColumn dataField='PurchaseTimeStamp' dataFormat={this.timeFormat}>Time</TableHeaderColumn>
                            </BootstrapTable>
                        </Modal.Body>
                        <Modal.Footer>
                            {/*<p>Total:{sumofPrices}</p>*/}
                            <Button onClick={this.close}>Close</Button>

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


