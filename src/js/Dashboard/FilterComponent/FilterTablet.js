import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';
import FilterComputers from './FilterComputers.js';

export default class FilterTablet extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      oS: '',
      batteryInfo: '',
      displaySize: '',
      cameraInfo: '',
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
        <div className="container">
          <div className="row">
            <div className="col-sm-12">

              <form>
                <label>
                  Operating System
                    <input
                    name="oS"
                    type="text"
                    value={this.state.oS}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Battery Info:
                    <input
                    name="batteryInfo"
                    type="text"
                    value={this.state.batteryInfo}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Display size:
                    <input
                    name="displaySize"
                    type="text"
                    value={this.state.displaySize}
                    onChange={this.handleInputChange} />
                </label>
                <label>
                  Camera Information
                    <input
                    name="cameraInfo"
                    type="text"
                    value={this.state.cameraInfo}
                    onChange={this.handleInputChange} />
                </label>

              </form>
            </div>
          </div>
        </div>
      );
    }
  }
