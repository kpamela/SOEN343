/**
  * Created by Yan Ming on 2017-10-11
  */
import React from 'react';
import DescriptionForm from './DescriptionForm.js'
//descriptionform

export default class ModifyProduct extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      modItem:{
        name: this.props.item.name,
        category: this.props.item.category,
        description: this.props.item.description,
        price: this.props.item.price,
        amount: this.props.item.price
      },
      dispField:false,
      dispSign: "Edit Product"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.showDescriptionForm = this.showDescriptionForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModItemOnClick = this.handleModItemOnClick.bind(this);

  }

  handleChange(e){
    var item = this.state.modItem;
    item[e.target.id] = e.target.value;
    //could use setState but it does a forceUpdate and since its just on a child value its overkill
    this.forceUpdate({modItem: item});
  }

  handleDescriptionChange(desc){
      var item = {name:this.state.modItem.name,
          category: this.state.modItem.category,
          description:desc,
          price:this.state.modItem.price,
          amount:this.state.modItem.amount};
      console.log(item);
      this.forceUpdate({modItem: item});
  }

  showDescriptionForm(){
      //checking for different categories of input => different forms
      console.log(this.state.modItem.category);
      return(
        <DescriptionForm category={this.state.modItem.category} onDescriptionChange={this.handleDescriptionChange}/>
      );

  }

  handleSubmit(event) {
   alert('A Product has been modified ' + this.state.modItem.name);
   event.preventDefault();
 }


  //modifying product field view toggle
  modifyProductField(){
      if(this.state.dispField){
          this.state.dispSign = 'Edit';
          return(
              <form onSubmit={this.handleModItemOnClick}>
                  <input
                      type="text"
                      placeholder={'Enter Product Name'}
                      value={this.state.modItem.name}
                      id="name"
                      onChange={this.handleChange}
                  />
                  <input
                      type="text"
                      placeholder={'Enter Product Price'}
                      value={this.state.modItem.price}
                      id="price"
                      onChange={this.handleChange}
                  />
                  <br/>
                  <input
                      value ={this.state.modItem.amount}
                      type="text"
                      placeholder={'Enter Product Amount'}
                      id="amount"
                      onChange={this.handleChange}
                  />
                  <br/>
                  <label>
                      Select Category
                  <select id="category" value={this.state.item.category} onChange={this.handleChange}>
                      <option value="" default> Select Category</option>
                      <option value="Television">Television</option>
                      <option value="Monitor">Monitor</option>
                      <option value="TabletComputer">TabletComputer</option>
                      <option value="DesktopComputer">DesktopComputer</option>
                      <option value="LaptopComputer">LaptopComputer</option>

                  </select>
                  </label>

                  <br/>
                  {this.showDescriptionForm()}
                  <br/>
                  <input type="submit" value="Submit" />
              </form>
          );
      }
      else{
          this.state.dispSign = '-';
          this.state.newItem = {name:'',category:'', description:'', price:'', amount: null};
          return;
      }
  }
  //On submit, pass newItem to Catalog via onNewItem()
  handleModItemOnClick(e){
      var item = {name:this.state.modItem.name,
          category: this.state.modItem.category,
          description:this.state.modItem.description,
          price:this.state.modItem.price,
          amount:this.state.modItem.amount};
      this.props.onNewItem(item);
      e.preventDefault();
  }

  render(){
      return(
          <div>
              <button className="Modify" onClick={() => {this.setState({dispField: !this.state.dispField})}} >
                  {this.state.dispSign}
              </button>
              {this.modifyProductField()}
          </div>
      );
  }


}
