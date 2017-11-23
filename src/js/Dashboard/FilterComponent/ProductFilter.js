import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';

export default class ProductFilters extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      productName: '',
      brandName: '',
      modelNumber: '',
      dimensions: '',
      price: '',
      amountRemaining: '',
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
    });
  }

  render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">

              <form>
                <label>
                  Product Name
                    <input
                    name="productName"
                    type="text"
                    value={this.state.productName}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Brand Name:
                    <input
                    name="brandName"
                    type="text"
                    value={this.state.brandName}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                    Model Number
                    <input
                    name="modelNumber"
                    type="number"
                    value={this.state.modelNumber}
                    onChange={this.handleInputChange} />
                </label>
                <label>
                  Dimensions:
                    <input
                    name="dimensions"
                    type="number"
                    value={this.state.dimensions}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Price
                    <input
                    name="price"
                    type="number"
                    value={this.state.price}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Amount Remaining:
                    <input
                    name="amountRemaining"
                    type="number"
                    value={this.state.amountRemaining}
                    onChange={this.handleInputChange} />
                </label>

                <label>
                  Weight:
                    <input
                    name="weight"
                    type="number"
                    value={this.state.weight}
                    onChange={this.handleInputChange} />
                </label>



              </form>
            </div>
          </div>
        </div>
      );
    }
  }
