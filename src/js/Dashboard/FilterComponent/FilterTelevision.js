import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default class FilterTelevision extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      televisionType: '',
    }
  }


  render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">




            <RadioGroup name="televisionType" value={''} onChange={onChange}>
                <input type="radio" value="hdLED" />HD LED
                <input type="radio" value="smart" />Smart
                <input tyle="radio" value="3D" />3D
            </RadioGroup>



            </div>
          </div>
        </div>
      );
    }
  }
