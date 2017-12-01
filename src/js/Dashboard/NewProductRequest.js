/**
 * Created by CharlesPhilippe on 2017-10-09.
 */
import React from 'react';
import DescriptionForm from './DescriptionForm.js'
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
export default class NewProductRequest extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            productIndex: 0,
            fieldValue: {category:'', amount:''},
            currentForm: 
                <div className="addButton">
                    <br/>
                    <Button bsStyle="primary" className="add" onClick={() => this.newProductRequest()}  >
                        Add Product
                    </Button>
                </div>
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleOnAddProduct = this.handleOnAddProduct.bind(this);
        this.handleAnotherProduct = this.handleAnotherProduct.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    /**
     * going through validation process before showing form
     */
    validateAdd(){
        let err = {amount: true, disabled: true};//setting erroneous at first
        err.amount = parseInt(this.state.fieldValue.amount) != this.state.fieldValue.amount;//amount is integer
        err.amount = parseInt(this.state.fieldValue.amount) <= 0; //amount is not negative
        //if category is empty and amount is not an integer prevent submission
        err.disabled = this.state.fieldValue.category == "" || err.amount;
        //applying form change
        this.setState( {currentForm: this.addProductForm(err)})

    }

    /**
     * handle change to set state values
     * @param e
     */
    handleFieldChange(e){
        let value = this.state.fieldValue;
        value[e.target.id] = e.target.value;

        this.setState({fieldValue: value});
        this.validateAdd();

    }

    /**
     * Handle the submission of form
     * @param e
     */
    handleOnAddProduct(e){
        e.preventDefault();
        let i = this.props.usr.addProduct(this.state.fieldValue.category, this.state.fieldValue.amount);
        this.setState({productIndex: i});
        this.validateSpecify();

    }

    /**
     * Handling the changes in description form, setting the description in fieldValue
     * @param desc
     */
    handleDescriptionChange(desc){
        let value = this.state.fieldValue;
        value['description'] = desc;
        this.setState({fieldValue: value});
        this.validateSpecify();

    }

    /**
     * Handling new product addition, resetting the form to 'addForm'
     * @param e
     */
    handleAnotherProduct(e){
       // e.preventDefault();
        if(this.props.usr.lookForModel(this.state.fieldValue.description.modelNumber)>=0){
            window.alert("Model number " +this.state.fieldValue.description.modelNumber + " already exists")
        }
        else {
            this.props.usr.specify(this.state.productIndex, this.state.fieldValue.description);
            this.props.onAnother();//sending signal to update product listing
            this.newProductRequest();
        }
    }

    /**
     * Handling user finished with adding new products
     * @param e
     */
    handleOnSubmit(e){
        if(this.props.usr.lookForModel(this.state.fieldValue.description.modelNumber)>=0){
            window.alert("Model number " +this.state.fieldValue.description.modelNumber + " already exists")
        }
        else {
            this.props.usr.specify(this.state.productIndex, this.state.fieldValue.description);
            this.props.onSubmit();

            this.setState({currentForm: 
                <div className="addButton">
                    <br/>
                    <Button bsStyle="primary" className="add" onClick={() => this.newProductRequest()}  >
                        Add Product
                    </Button>
                </div>});
        }
    }

    /**
     * returns the specify category and amount Form
     */
    addProductForm(errors){
        return(
            <div className="CatalogForm">
                <hr/>
                <form onSubmit={this.handleOnAddProduct}>
                    <FormGroup>
                        <ControlLabel>Select Category</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select" value={this.state.fieldValue.category} id="category"  onChange={this.handleFieldChange}>
                            <option value="" default> Select Category</option>
                            {/* <option value="Television">Television</option>*/}
                            <option value="Monitor">Monitor</option>
                            <option value="TabletComputer">TabletComputer</option>
                            <option value="DesktopComputer">DesktopComputer</option>
                            <option value="LaptopComputer">LaptopComputer</option>
                        </FormControl>
                        <br/>
                        <ControlLabel>Amount</ControlLabel>
                        <FormControl
                            className={errors.amount ? "error" : ""}
                            type="text"
                            placeholder="Enter amount"
                            value={this.state.fieldValue.amount}
                            min="0"
                            id="amount"
                            onChange={this.handleFieldChange}
                        />
                        <br/>
                        <Button bsStyle="primary" disabled={errors.disabled} type="submit">Add</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }

    /**
     * type validation before showing form, and before updating it
     */
    validateSpecify(){
        let err = {disabled: false};
        if(this.state.fieldValue.description) {
            for(let ind in this.state.fieldValue.description){
                switch(ind){
                    case 'modelNumber':err[ind] = this.state.fieldValue.description[ind].length <= 0;
                                      break;
                    case 'price': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                                      break;
                    case 'weight': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                                      break;
                    case 'hardDriveSize': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                                      break;
                    case 'size': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                                      break;
                    case 'RAMSize': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                                      break;
                    case 'dimensions': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                                      break;
                    case 'numberOfCores': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                                      break;
                    case 'displaySize': err[ind] = parseInt(this.state.fieldValue.description[ind]) <= 0;
                        err[ind] = parseFloat(this.state.fieldValue.description[ind]) != this.state.fieldValue.description[ind];
                        break;
                    default: err[ind] = this.state.fieldValue.description[ind].length < 0;
                }
                if(err[ind]){
                    err['disabled'] = true;
                }
            }
        }
        else{
            err.disabled = true;
        }

        this.setState({currentForm: this.specifyForm(err)});
    }

    /**
     * Returns the form for specifications
     *
     */
    specifyForm(errors){
        return(
            <div>
                <DescriptionForm errors={errors}
                                 modelNumber=""
                                 price=""
                                 category={this.state.fieldValue.category}
                                 onDescriptionChange={this.handleDescriptionChange}/>
                <span className="addButton">
                    <Button bsStyle="primary" disabled={errors.disabled} className="submit"  onClick={() => this.handleOnSubmit()}>Submit</Button>
                    <Button disabled={errors.disabled} className="addAnother" onClick={() => this.handleAnotherProduct()}>Add Another</Button>
                </span>
            </div>
        );
    }


    /**
     * On request, display form, and start passing values to the usr
     */
    newProductRequest(){
       // let newForm = this.addProductForm(errors);
        //synchronizing state reset and validate form
        this.setState({fieldValue: {category:'', amount:''}}, function(){
            this.validateAdd();
        });
    }



    render(){
        return(
            <div>
                {this.state.currentForm}
            </div>
        );
    }
}
