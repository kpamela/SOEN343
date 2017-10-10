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
     * handle change to set state values
     * @param e
     */
    handleFieldChange(e){
        let value = this.state.fieldValue;
        value[e.target.id] = e.target.value;

        this.setState({fieldValue: value});
        //console.log(this.state.fieldValue);
    }

    /**
     * Handle the submission of form
     * @param e
     */
    handleOnAddProduct(e){
        e.preventDefault();
        let i = this.props.mapper.addProduct(this.state.fieldValue.category, this.state.fieldValue.amount);
        this.setState({currentForm: this.specifyForm(), productIndex: i});

    }

    handleDescriptionChange(desc){
        let value = this.state.fieldValue;
        value['description'] = desc;
        this.setState({fieldValue: value});
        //console.log(this.state.fieldValue);
    }

    handleAnotherProduct(e){
       // e.preventDefault();
        this.props.mapper.specify(this.state.productIndex, this.state.fieldValue.description);
        this.newProductRequest();
    }

    handleOnSubmit(e){
        this.props.mapper.specify(this.state.productIndex, this.state.fieldValue.description);
        this.props.mapper.submit();
    }

    /**
     * returns the specify category and amount Form
     */
    addProductForm(){
        return(
            <div>
                <form onSubmit={this.handleOnAddProduct}>

                    <label>
                        Select Category
                        <select id="category"  onChange={this.handleFieldChange}>
                            <option value="" default> Select Category</option>
                            <option value="Television">Television</option>
                            <option value="Monitor">Monitor</option>
                            <option value="TabletComputer">TabletComputer</option>
                            <option value="DesktopComputer">DesktopComputer</option>
                            <option value="LaptopComputer">LaptopComputer</option>

                        </select>
                    </label>

                    <label>
                        Enter amount
                        <input
                            type="text"
                            placeholder={'Enter Product Amount'}
                            id="amount"
                            onChange={this.handleFieldChange}
                        />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }

    /**
     * Returns the form for specifications
     *
     */
    specifyForm(){
        return(
            <div>
                <DescriptionForm category={this.state.fieldValue.category} onDescriptionChange={this.handleDescriptionChange}/>
                <button className="another" onClick={() => this.handleAnotherProduct()}  >
                    Add Another
                </button>
                <button className="done"  onClick={() => this.handleOnSubmit()}>Done</button>
            </div>
        );
    }


    /**
     * On request, display form, and start passing values to the mapper
     */
    newProductRequest(){
        let newForm = this.addProductForm();
        this.setState({fieldValue: {category:'', amount:''}, currentForm: newForm});
    }

    render(){
        return(
            <div>

                {this.state.currentForm}
            </div>
        );
    }
}
