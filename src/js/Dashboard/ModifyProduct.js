
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

              disabled: false,
              productIndex: 0,
              fieldValue: props.item,
              currentForm:
                  <button className="Edit" onClick={() => this.modifyProductRequest()}  >
                     Edit {this.props.item.description.modelNumber}
                  </button>

          };

          this.handleFieldChange = this.handleFieldChange.bind(this);
          // this.handleOnModifyProduct = this.handleOnModifyProduct.bind(this);
          this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      }

      handleOnModifyProduct(){
        this.props.onModify(this.state.fieldValue)

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
          this.setState({disabled: err.disabled}, function(){
              this.setState( {currentForm: this.modifyProductForm(err)});
          });


      }

      /**
       * handle change to set state values
       * @param e
       */
      handleFieldChange(e){
          let value = this.state.fieldValue;
          value[e.target.id] = e.target.value;

          this.setState({fieldValue: value}, function(){
              this.validateModify();
              //this.validateDescription();
          });

      }


      /**
       * Handling the changes in description form, setting the description in fieldValue
       * @param desc
       */
      handleDescriptionChange(desc){

          let value = this.state.fieldValue;
          for(let i in desc){
              value.description[i] = desc[i];
          }
          //value['description'] = desc;
          this.setState({fieldValue: value}, function(){
              this.validateModify();
          });


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
                              {/*<option value="Television">Television</option>*/}
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
                  </form>
                  {this.validateDescription()}

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
                      case 'size':
                      case 'HDSize':
                      case 'RAM':
                      case 'cores': err[ind] = parseFloat(this.state.fieldValue.description[ind]) != this.state.fieldValue.description[ind];
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



          let d = (this.state.disabled || err.disabled);


          this.setState({disabled: d});

          return this.showDescriptionForm(err)

      }


      /**
       * Returns the form for specifications
       *
       */
      showDescriptionForm(errors){

          return(
              <div>
                  <DescriptionForm errors={errors} category={this.state.fieldValue.category} onDescriptionChange={this.handleDescriptionChange}/>

                  <button disabled={this.state.disabled || errors.disabled} className="Submit-mod" onClick={()=>this.handleOnModifyProduct()}>
                      Submit
                  </button>

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

