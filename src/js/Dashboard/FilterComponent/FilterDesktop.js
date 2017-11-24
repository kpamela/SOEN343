import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';
import FilterComputers from './FilterComputers.js';

export default class FilterDesktop extends React.Component {

  constructor(props){
    super(props);
    this.state= {}
      this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <FilterComputers />
            </div>
          </div>
        </div>
      );
    }
  }
