import React, { Component } from 'react';
import { PageHeader, Table } from 'react-bootstrap';


/**
 * AboutUs page rendered by going to path "/aboutus"
 */

export default class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="AboutUs-Container">
                <PageHeader>Team 15 Members</PageHeader>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Brandon Goldwax</td>
                            <td>40006986</td>
                        </tr>
                        <tr>
                            <td>Charles-Philippe Labbe</td>
                            <td>40002442</td>
                        </tr>
                        <tr>
                            <td>Francois Crispo-Sauve</td>
                            <td>27454139</td>
                        </tr>
                        <tr>
                            <td>Hasan Ahmed</td>
                            <td>27546467</td>
                        </tr>
                        <tr>
                            <td>Josephine Ng</td>
                            <td>40001872</td>
                        </tr>
                        <tr>
                            <td>Pamela Khouri</td>
                            <td>400016194</td>
                        </tr>
                        <tr>
                            <td>Raphaelle Giraud</td>
                            <td>27514204</td>
                        </tr>
                        <tr>
                            <td>Sarbeng Frimpong</td>
                            <td>29344039</td>
                        </tr>
                        <tr>
                            <td>William Leclerc</td>
                            <td>27424973</td>
                        </tr>
                        <tr>
                            <td>Yan Ming Hu</td>
                            <td>40005813</td>
                        </tr>
                    </tbody>
                
                </Table>
            </div>
        )
    }
}
