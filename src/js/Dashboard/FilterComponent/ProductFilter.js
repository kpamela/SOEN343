import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';

export default class ProductFilters extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      priceMax: '',
      priceMin: '',
      weight: '',
    }
      this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, function(){
      this.props.handleFilterChange(this.state);
    });
  }


  render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form>
                <label>
                  Maximum price
                    <input name="priceMax" type="number" value={this.state.priceMax} onChange={this.handleInputChange} />
                </label>

                <label>
                  Minimum price
                    <input name="priceMin" type="number" value={this.state.priceMin} onChange={this.handleInputChange} />
                </label>

                <label>
                  Maximum Weight:
                    <input name="weight" type="number" value={this.state.weight} onChange={this.handleInputChange} />
                </label>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
