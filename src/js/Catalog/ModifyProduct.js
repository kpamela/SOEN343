/**
  * Created by Yan Ming on 2017-10-11
  */
import React from 'react';
//descriptionform

export default class ModifyProduct extends React.Component{
  handleChange(e){
    var item = this.state.newItem;
    item[e.target.id] = e.target.value;
    //could use setState but it does a forceUpdate and since its just on a child value its overkill
    this.forceUpdate({newItem: item});
  }

  handleDescriptionChange(desc){
      var item = {name:this.state.newItem.name,
          category: this.state.newItem.category,
          description:desc,
          price:this.state.newItem.price,
          amount:this.state.newItem.amount};
      console.log(item);
      this.forceUpdate({newItem: item});
  }

  showDescriptionForm(){
      //checking for different categories of input => different forms
      console.log(this.state.newItem.category);
      return(
        <DescriptionForm category={this.state.newItem.category} onDescriptionChange={this.handleDescriptionChange}/>
      );

  }


  //modifying product field view toggle
  modifyProductField(){
      if(this.state.dispField){
          this.state.dispSign = '+';
          return(
              <form onSubmit={this.handleNewItemOnClick}>
                  <input
                      type="text"
                      placeholder={'Enter Product Name'}
                      value={this.state.nitem.name}
                      id="name"
                      onChange={this.handleChange}
                  />
                  <input
                      type="text"
                      placeholder={'Enter Product Price'}
                      value={this.state.item.price}
                      id="price"
                      onChange={this.handleChange}
                  />
                  <br/>
                  <input
                      value ={this.state.item.amount}
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
  handleNewItemOnClick(e){
      var item = {name:this.state.newItem.name,
          category: this.state.newItem.category,
          description:this.state.newItem.description,
          price:this.state.newItem.price,
          amount:this.state.newItem.amount};
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
