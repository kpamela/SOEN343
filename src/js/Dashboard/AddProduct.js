/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';
import DescriptionForm from './DescriptionForm.js'

export default class AddProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            newItem:{name:'',category:'', description:'', price:'', amount: null},
            dispField: false,
            dispSign: '+'
        }

        this.handleNewItemOnClick = this.handleNewItemOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDescriptionForm = this.showDescriptionForm.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    }
    //modifying value of new item upon change of textFields
    handleChange(e){
        var item = this.state.newItem;
        item[e.target.id] = e.target.value;
        this.setState({newItem: item});

    }

    handleDescriptionChange(desc){
        var item = {name:this.state.newItem.name,
            category: this.state.newItem.category,
            description:desc,
            price:this.state.newItem.price,
            amount:this.state.newItem.amount};
       // console.log(item);
        this.setState({newItem: item});
    }

    showDescriptionForm(){
        //checking for different categories of input => different forms
        //console.log(this.state.newItem.category);
        return(
          <DescriptionForm category={this.state.newItem.category} onDescriptionChange={this.handleDescriptionChange}/>
        );

    }


    //add product field view toggle
    addProductField(){
        this.props.p['n'] = 'a';
        //console.log(this.props.p);
        if(this.state.dispField){
            this.state.dispSign = '+';
            return(
                <form onSubmit={this.handleNewItemOnClick}>
                    <input
                        type="text"
                        placeholder={'Enter Product Name'}
                        value={this.state.newItem.name}
                        id="name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder={'Enter Product Price'}
                        value={this.state.newItem.price}
                        id="price"
                        onChange={this.handleChange}
                    />
                    <br/>
                    <input
                        type="text"
                        placeholder={'Enter Product Amount'}
                        id="amount"
                        onChange={this.handleChange}
                    />
                    <br/>
                    <label>
                        Select Category
                    <select id="category" value={this.state.newItem.category} onChange={this.handleChange}>
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
    //On submit, pass newItem to AdminDashboard via onNewItem()
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
                <button className="add" onClick={() => {this.setState({dispField: !this.state.dispField})}} >
                    {this.state.dispSign}
                </button>
                {this.addProductField()}
            </div>
        );
    }
}
