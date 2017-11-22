import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import auth from '../General/auth.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



export class RegisteredUsersModal extends React.Component{

      constructor() {
          super();
          // noinspection JSAnnotator
          this.state= {
              showModal: false
          };

          this.open = this.open.bind(this);
          this.close = this.close.bind(this);
      }


      close(){
          this.setState({showModal: false});
      }

      open() {
          console.log(this.props.user);
        if(this.props.user.registeredUsers.length === 0){
            this.props.user.fetchRegisteredUsers();
        }

        this.setState({showModal: true});
      }

      render(){

          const user = this.props.user;

          const usersList = this.props.user.registeredUsers;

          if (auth.getIsAdmin() == 1) {
              return (
                  <div id="RegisteredUsersModal">
                      <Button bsStyle="primary" onClick={this.open} >View Registered Users</Button>

                      <Modal show={this.state.showModal} onHide={this.close} >
                          <Modal.Header closeButton>
                              <Modal.Title>Registered Users</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              <BootstrapTable data={usersList}  >
                                  <TableHeaderColumn dataField='Username'  dataAlign="left" isKey>Username</TableHeaderColumn>
                                  <TableHeaderColumn dataField='FirstName'>First Name</TableHeaderColumn>
                                  <TableHeaderColumn dataField='LastName' >Last Name</TableHeaderColumn>
                              </BootstrapTable>
                          </Modal.Body>
                          <Modal.Footer>
                              <Button onClick={this.close}>Close</Button>
                          </Modal.Footer>
                      </Modal>
                  </div>
              );
          }
      }
}
