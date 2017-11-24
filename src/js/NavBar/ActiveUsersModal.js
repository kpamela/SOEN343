import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import auth from '../General/auth.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';



export class ActiveUsersModal extends React.Component{

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
          this.props.user.getActiveUsers()
          this.setState({showModal: true});
      }

      render(){

          var user = this.props.user;

          var usersList = this.props.user.activeUsers;

          if (auth.getIsAdmin() == 1) {
              return (
                  <div id="ActiveUsersModal">
                      <Button bsStyle="primary" onClick={this.open} >View Active Users</Button>

                      <Modal show={this.state.showModal} onHide={this.close} >
                          <Modal.Header closeButton>
                              <Modal.Title>Active Users</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              <BootstrapTable data={usersList}  >
                                  <TableHeaderColumn dataField='username'  dataAlign="left" isKey>Username</TableHeaderColumn>
                                  <TableHeaderColumn dataField='timestamp'>Timestamp</TableHeaderColumn>
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
