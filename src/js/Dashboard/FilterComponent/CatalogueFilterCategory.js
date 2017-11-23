import React from 'react';
import {FormGroup} from 'react-bootstrap';
import Checkbox from './Checkbox.js';
import FilterDesktop from './FilterDesktop.js';
import FilterLaptop from './FilterLaptop.js';
import FilterMonitor from './FilterMonitor.js';
import FilterTablet from './FilterTablet.js';
import FilterTelevision from './FilterTelevision';

const categories = [
  'DesktopComputer',
  'LaptopComputer',
  'Monitor',
  'TabletComputer',
  'Television',
];


class CatalogueFilterCategory extends React.Component {
  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox(label) {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit(formSubmitEvent){
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');    //checkbox is a list of all checked items
      switch(checkbox){
        case 'DesktopComputer':
            return <div> <FilterDesktop /> </div>
        case 'LaptopComputer':
            return <div> <FilterLaptop /> </div>
        case  'Monitor':
            return <div> <FilterMonitor /> </div>
        case  'TabletComputer':
            return <div> <FilterTablet /> </div>
        case  'Television':
            return <div> <FilterTelevision /> </div>
        default:
          break;
      }
    }
  }


  createCheckbox(label){
     <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
      />
  }


  createCheckboxes(){
     categories.map(this.createCheckbox)
   }

  render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">

              <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}

                <button className="btn btn-default" type="submit">Save</button>
              </form>

            </div>
          </div>
        </div>
      );
    }
  }

export default CatalogueFilterCategory;
