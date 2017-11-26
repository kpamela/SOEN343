import React from 'react';
import { FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';

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
        <div >
          <form>
            <FormGroup className="filters">
              <ControlLabel className="filterControl">
                Maximum price
                  <FormControl name="priceMax" type="number" value={this.state.priceMax} onChange={this.handleInputChange} />
              </ControlLabel>

              <ControlLabel className="filterControl">
                Minimum price
                  <FormControl name="priceMin" type="number" value={this.state.priceMin} onChange={this.handleInputChange} />
              </ControlLabel>

              <ControlLabel className="filterControl">
                Maximum Weight:
                  <FormControl name="weight" type="number" value={this.state.weight} onChange={this.handleInputChange} />
              </ControlLabel>
            </FormGroup>
          </form>
        </div>
      );
    }
  }
