import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';

export default class FilterComputer extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      processor: '',
      ramSize: '',
      numberOfCores: '',
      hardDriveSize: '',
    }
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
        <div>
              <form>
                <label>
                  Processor
                    <input
                    name="processor"
                    type="number"
                    value={this.state.processor}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Ram Size:
                    <input
                    name="ramSize"
                    type="number"
                    value={this.state.ramSize}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Number of Cores:
                    <input
                    name="numberOfCores"
                    type="number"
                    value={this.state.numberOfCores}
                    onChange={this.handleInputChange} />
                </label>
                
                <label>
                  Hard Drive Size:
                    <input
                    name="hardDriveSize"
                    type="number"
                    value={this.state.hardDriveSize}
                    onChange={this.handleInputChange} />
                </label>
              </form>
        </div>
      );
    }
  }
