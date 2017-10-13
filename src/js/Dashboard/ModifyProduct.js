/**
  * Created by Yan Ming on 2017-10-11
  */
  /**
   * Created by CharlesPhilippe on 2017-10-09.
   */
  import React from 'react';
  import DescriptionForm from './DescriptionForm.js'
  export default class ModifyProduct extends React.Component{

      constructor(props){
          super(props);
          this.state ={
              productIndex: 0,
              fieldValue: props.item,
              currentForm: <div>
                  <button className="Edit" onClick={() => this.modifyProductRequest()}  >
                     Edit
                  </button>
              </div>
          };

          this.handleFieldChange = this.handleFieldChange.bind(this);
          // this.handleOnModifyProduct = this.handleOnModifyProduct.bind(this);
          this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      }

      handleOnModifyProduct(){
        this.props.onModify(this.state.fieldValue0)
      }


      /**
       * going through validation process before showing form
       */
      validateModify(){
          let err = {amount: true, disabled: true};//setting erroneous at first
          err.amount = parseInt(this.state.fieldValue.amount) != this.state.fieldValue.amount;//amount is integer
          //if category is empty and amount is not an integer prevent submission
          err.disabled = this.state.fieldValue.category == "" || err.amount;
          //applying form change
          this.setState( {currentForm: this.modifyProductForm(err)})

      }

      /**
       * handle change to set state values
       * @param e
       */
      handleFieldChange(e){
          let value = this.state.fieldValue;
          value[e.target.id] = e.target.value;

          this.setState({fieldValue: value});
          this.validateModify();

      }


      /**
       * Handling the changes in description form, setting the description in fieldValue
       * @param desc
       */
      handleDescriptionChange(desc){
          let value = this.state.fieldValue;
          value['description'] = desc;
          this.setState({fieldValue: value});
          this.validateDescription();

      }


      /**
       * Handling user finished with adding new products
       * @param e
       */
      handleOnSubmit(e){

      }

      /**
       * returns the specify category and amount Form
       */
      modifyProductForm(errors){
          return(
              <div>
                  <form onSubmit={this.handleOnSubmit}>

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
                  {this.validateDescription()};
                  <button className="Submit-mod" onClick={this.handleOnModifyProduct()}>
                      Submit
                  </button>
              </div>
          );
      }

      /**
       * type validation before showing form, and before updating it
       */
      validateDescription(){
          let err = {disabled: false};
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


          return this.showDescriptionForm(err);
      }

      /**
       * Returns the form for specifications
       *
       */
      showDescriptionForm(errors){
          return(
              <div>
                  <DescriptionForm errors={errors} category={this.state.fieldValue.category} onDescriptionChange={this.handleDescriptionChange}/>
              </div>
          );
      }


      /**
       * On request, display form, and start passing values to the mapper
       */
      modifyProductRequest(){
         // let newForm = this.addProductForm(errors);
          //synchronizing state reset and validate form
          //this.setState({fieldValue: {category:'', amount:''}}, function(){
              this.validateModify();

      }



      render(){
          return(
              <div>
                  {this.state.currentForm}
              </div>
          );
      }
  }
