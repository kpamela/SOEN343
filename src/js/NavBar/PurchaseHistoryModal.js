/**
 * Created by CharlesPhilippe on 2017-11-07.
 */
import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import auth from '../General/auth.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



export class PurchaseHistoryModal extends React.Component{


    constructor() {
        super();
        // noinspection JSAnnotator
        this.state= {
            showModal: false,
            selectRow:{mode:'checkbox'},
            selection: new Array()
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.returnItem = this.returnItem.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.createCustomButtonGroup =this.createCustomButtonGroup.bind(this);


    }

    onRowSelect(row, isSelected){

        if(isSelected){
            this.setState({selected: this.state.selection.push(row.SerialNumber +""+row.PurchaseTimeStamp)});
        }
        else{
            for(let i = 0; i<this.state.selection.length; i++){
                if(this.state.selection[i] === row.SerialNumber){
                    this.state.selection.splice(i, 1);
                }
            }
        }
    }

    returnItem(value){
        for(let i = 0; i< this.state.selection.length; i++){
            this.props.user.returnItem(this.state.selection[i]);
            this.state.selection.splice(i,1);
        }

    }

    createCustomButtonGroup() {

        return (
            <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
                <button type='button'
                        className={ `btn btn-primary` }
                        onClick={this.returnItem}>
                    Return
                </button>
            </ButtonGroup>
        );
    }

    close(){
        this.setState({showModal: false});
    }

    open() {
        if(this.props.user.purchaseHistory.length === 0){
            this.props.user.fetchPurchaseHistory();
        }
        this.setState({showModal: true});

    }


    timeFormat(cell, row){
        let date = new Date(cell);
        return date.toISOString();
    }

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
            btnGroup: this.createCustomButtonGroup,

        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect,
            unselectable:this.props.user.getReturnedItems()
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
                            <BootstrapTable data={products}  selectRow={selectRow} options={options} hover>
                                <TableHeaderColumn dataField='PurchaseID'  dataAlign="left" isKey>PurchaseID</TableHeaderColumn>
                                <TableHeaderColumn dataField='SerialNumber'  dataAlign="left" >Serial Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='ModelNumber'>Product Model</TableHeaderColumn>
                                <TableHeaderColumn dataField='PurchaseTimeStamp' dataFormat={this.timeFormat}>Time</TableHeaderColumn>
                                <TableHeaderColumn dataField='IsReturned'>Returned</TableHeaderColumn>
                            </BootstrapTable>
                        </Modal.Body>
                        <Modal.Footer>
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
}



