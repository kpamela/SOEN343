/**
 * Created by CharlesPhilippe on 2017-09-28.
 */
import React from 'react';
import { FormGroup, FormControl, Button, Checkbox, ControlLabel} from 'react-bootstrap';

export default class DescriptionForm extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            currentDescription: {modelNumber:this.props.modelNumber, price:this.props.price}};//mandatory fields

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Returning the appropriate form depending on the category submitted
     * @returns {*}
     */
    categoryDescription(){
        switch(this.props.category){
            case 'Television': return this.televisionDescription();
            case 'Monitor': return this.monitorDescription();
            case 'Tablet':
            case 'TabletComputer': return this.computerDescription('tablet');
            case 'Desktop':
            case 'DesktopComputer': return this.computerDescription('desktop');
            case 'Laptop':
            case 'LaptopComputer': return this.computerDescription('laptop');
            default: return;
        }
    }

    /**
     * Television
     * @returns {XML}
     */
    televisionDescription(){
        return(   
            <div>
                <ControlLabel>Television Type</ControlLabel>
                <FormControl componentClass="select" id="TelevisionType" value={this.state.currentDescription["type"]} onChange={this.handleChange}>
                    <option value="" default>Select Type</option>
                    <option value="HD LED">LED</option>
                    <option value="Smart">Smart</option>
                    <option value="3d">3d</option>
                </FormControl>
            </div>
        );
    }

    /**
     * Monitor
     * @returns {XML}
     */
    monitorDescription(){
        return(
            <div>
                <ControlLabel>Monitor Size</ControlLabel>
                <FormControl
                    className={this.props.errors["size"] ? "error":""}
                    type="text"
                    placeholder={'Enter Monitor Size'}
                    value={this.state.currentDescription["size"]}
                    id="size"
                    onChange={this.handleChange}
                />
                <br/>
            </div>
        );
    }

    /**
     * Depending on the computer type, the appropriate form is returned
     * @param computerType
     * @returns {XML}
     */
    computerDescription(computerType){
        let typeDescription;
        switch (computerType){
            case 'tablet': typeDescription = this.tabletDescription();
                            break;
            case 'desktop': typeDescription = this.desktopDescription();
                            break;
            case 'laptop':typeDescription = this.laptopDescription();
                            break;
            default: break;
        }
        return(
            <div>
                <ControlLabel>Processor Type</ControlLabel>
                <FormControl
                    className={this.props.errors["processorType"] ? "error":""}
                    type="text"
                    placeholder={'Enter Processor Type'}
                    value={this.state.currentDescription["processorType"]}
                    id="processorType"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>RAM Size</ControlLabel>
                <FormControl
                    className={this.props.errors["RAMSize"] ? "error":""}
                    type="text"
                    placeholder={'Enter RAM size'}
                    value={this.state.currentDescription["RAMSize"]}
                    id="RAMSize"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Number of Cores</ControlLabel>
                <FormControl
                    className={this.props.errors["numberOfCores"] ? "error":""}
                    type="text"
                    placeholder={'Enter Number of CPU cores'}
                    value={this.state.currentDescription["numberOfCores"]}
                    id="numberOfCores"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Hard Drive Size</ControlLabel>
                <FormControl
                    className={this.props.errors["hardDriveSize"] ? "error":""}
                    type="text"
                    placeholder={'Enter Hard Drive Size'}
                    value={this.state.currentDescription["hardDriveSize"]}
                    id="hardDriveSize"
                    onChange={this.handleChange}
                />
                <br/>
                {typeDescription}
                <br/>
            </div>
        );
    }

    /**
     * Tablet
     * @returns {XML}
     */
    tabletDescription(){
        return(
            <div>
                <ControlLabel>Television type</ControlLabel>
                <FormControl
                    className={this.props.errors["operatingSystem"] ? "error":""}
                    type="text"
                    placeholder={'Enter Built-in Operating System'}
                    value={this.state.currentDescription["operatingSystem"]}
                    id="operatingSystem"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Battery Information</ControlLabel>
                <FormControl
                    className={this.props.errors["batteryInfo"] ? "error":""}
                    type="text"
                    placeholder={'Enter Battery Information'}
                    value={this.state.currentDescription["batteryInfo"]}
                    id="batteryInfo"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Display Size</ControlLabel>
                <FormControl
                    className={this.props.errors["displaySize"] ? "error":""}
                    type="text"
                    placeholder={'Enter Display Size'}
                    value={this.state.currentDescription["displaySize"]}
                    id="displaySize"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Camera Information</ControlLabel>
                <FormControl
                    className={this.props.errors["cameraInfo"] ? "error":""}
                    type="text"
                    placeholder={'Enter Camera Information'}
                    value={this.state.currentDescription["cameraInfo"]}
                    id="cameraInfo"
                    onChange={this.handleChange}
                />
                <br/>
            </div>
        );
    }

    /**
     * desktop doesn't have particularities
     */
    desktopDescription(){}

    /**
     * Laptop
     * @returns {XML}
     */
    laptopDescription(){
        return(
            <div>
                <ControlLabel>Operating System</ControlLabel>
                <FormControl
                    className={this.props.errors["operatingSystem"] ? "error":""}
                    type="text"
                    placeholder={'Enter Built-in Operating System'}
                    value={this.state.currentDescription["operatingSystem"]}
                    id="operatingSystem"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Battery Information</ControlLabel>
                <FormControl
                    className={this.props.errors["batteryInfo"] ? "error":""}
                    type="text"
                    placeholder={'Enter Battery Information'}
                    value={this.state.currentDescription["batteryInfo"]}
                    id="batteryInfo"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Display Size</ControlLabel>
                <FormControl
                    className={this.props.errors["displaySize"] ? "error":""}
                    type="text"
                    placeholder={'Enter Display Size'}
                    value={this.state.currentDescription["displaySize"]}
                    id="displaySize"
                    onChange={this.handleChange}
                />
                <br/>

                <Checkbox value={this.state.currentDescription["hasCamera"]} id="hasCamera" onChange={this.handleChange}>
                    Camera
                </Checkbox>
                <Checkbox value={this.state.currentDescription["touchScreen"]} id="touchScreen" onChange={this.handleChange}>
                    Touchscreen
                </Checkbox>
        </div>
        );
    }


    /**
     * Changes are sent to newProductRequest component
     * @param e
     */
    handleChange(e){
        var desc = this.state.currentDescription;
        switch(e.target.id){
            case 'price':
            case 'weight':
            case 'hardDriveSize':
            case 'size':
            case 'RAMSize':
            case 'dimensions':
            case 'numberOfCores':
            case 'displaySize':
                if(e.target.value){

                    desc[e.target.id] = parseFloat(e.target.value);
                    if(isNaN(desc[e.target.id]) || e.target.value.indexOf(".") === e.target.value.length -1){
                        desc[e.target.id] = e.target.value;
                    }
                    break;
                }


            default:
                desc[e.target.id] = e.target.value;
                break;
        }


        this.setState({currentDescription: desc});
        this.props.onDescriptionChange(this.state.currentDescription);
    }

    render(){
        return(
        <form className="catalogForm">
            <FormGroup>
                <hr/>
                <h4> Adding a {this.props.category}</h4>
                <ControlLabel>Price</ControlLabel>
                <FormControl
                    className={this.props.errors["price"] ? "error":""}
                    type="text"
                    placeholder={'Enter Price'}
                    value={this.state.currentDescription['price']}
                    id="price"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Model Number</ControlLabel>
                <FormControl
                    className={this.props.errors["modelNumber"] ? "error":""}
                    type="text"
                    placeholder={'Enter Product Model Number'}
                    value={this.state.currentDescription['modelNumber']}
                    id="modelNumber"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Product Dimensions</ControlLabel>
                <FormControl
                    className={this.props.errors["dimensions"] ? "error":""}
                    type="text"
                    placeholder={'Enter Product Dimensions'}
                    value={this.state.currentDescription['dimensions']}
                    id="dimensions"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Weight</ControlLabel>
                <FormControl
                    className={this.props.errors["weight"] ? "error":""}
                    type="text"
                    placeholder={'Enter Product Weight'}
                    value={this.state.currentDescription['weight']}
                    id="weight"
                    onChange={this.handleChange}
                />
                <br/>
                <ControlLabel>Brand Name</ControlLabel>
                <FormControl
                    className={this.props.errors["brandName"] ? "error":""}
                    type="text"
                    placeholder={'Enter Product Brand Name'}
                    value={this.state.currentDescription['brandName']}
                    id="brandName"
                    onChange={this.handleChange}
                />
                <br/>
                {this.categoryDescription()}
                <ControlLabel>Additional Information</ControlLabel>
                <FormControl
                    type="text"
                    placeholder={'Enter Additional Information'}
                    value={this.state.currentDescription['additionalInfo']}
                    id="additionalInfo"
                    onChange={this.handleChange}
                />
            </FormGroup>
        </form>
        );

    }

}