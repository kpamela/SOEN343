/**
 * Created by CharlesPhilippe on 2017-10-09.
 */
import React from 'react';
import DescriptionForm from './DescriptionForm.js'
export default class NewProductRequest extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            productIndex: 0,
            fieldValue: {category:'', amount:''},
            currentForm: <div>
                <button className="add" onClick={() => this.newProductRequest()}  >
                    +
                </button>
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
        let i = this.props.mapper.addProduct(this.state.fieldValue.category, this.state.fieldValue.amount);
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
        this.props.mapper.specify(this.state.productIndex, this.state.fieldValue.description);
        this.props.onSubmit();//sending signal to update product listing
        this.newProductRequest();
    }

    /**
     * Handling user finished with adding new products
     * @param e
     */
    handleOnSubmit(e){
        this.props.mapper.specify(this.state.productIndex, this.state.fieldValue.description);
        this.props.mapper.submit();
        this.props.onSubmit();
    }

    /**
     * returns the specify category and amount Form
     */
    addProductForm(errors){
        return(
            <div>
                <form onSubmit={this.handleOnAddProduct}>

                    <label>
                        Select Category
                        <select value={this.state.fieldValue.category} id="category"  onChange={this.handleFieldChange}>
                            <option value="" default> Select Category</option>
                            <option value="Television">Television</option>
                            <option value="Monitor">Monitor</option>
                            <option value="TabletComputer">TabletComputer</option>
                            <option value="DesktopComputer">DesktopComputer</option>
                            <option value="LaptopComputer">LaptopComputer</option>

                        </select>
                    </label>
                    <br/>
                    <label>
                        Enter amount

                        <input
                            className={errors.amount ? "error" : ""}
                            type="number"
                            value={this.state.fieldValue.amount}
                            min="0"
                            id="amount"
                            onChange={this.handleFieldChange}
                        />
                    </label>
                    <input disabled={errors.disabled} type="submit" value="Add" />
                </form>
            </div>
        );
    }

    /**
     * type validation before showing form, and before updating it
     */
    validateSpecify(){
        let err = {disabled: false, modelNumber: true};
        if(this.state.fieldValue.description) {
            for(let ind in this.state.fieldValue.description){
                switch(ind){
                    case 'price':
                    case 'weight':
                    case 'HDSize':
                    case 'RAM':
                    case 'cores': err[ind] = parseFloat(this.state.fieldValue.description[ind]) != this.state.fieldValue.description[ind];
                        break;
                    default: err[ind] = this.state.fieldValue.description[ind].length <= 0;
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
                <DescriptionForm errors={errors} category={this.state.fieldValue.category} onDescriptionChange={this.handleDescriptionChange}/>
                <button disabled={errors.disabled} className="another" onClick={() => this.handleAnotherProduct()}  >
                    Add Another
                </button>
                <button disabled={errors.disabled} className="done"  onClick={() => this.handleOnSubmit()}>Done</button>
            </div>
        );
    }


    /**
     * On request, display form, and start passing values to the mapper
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
