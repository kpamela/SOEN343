import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';

export default class FilterMonitor extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      monitorSize: '',

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
                  Enter Monitor Size
                    <input
                    name="monitorSize"
                    type="number"
                    value={this.state.monitorSize}
                    onChange={this.handleInputChange} />
                </label>


              </form>
            </div>
          </div>
        </div>
      );
    }
  }
