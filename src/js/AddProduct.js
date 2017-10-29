/**
 * Created by CharlesPhilippe on 2017-09-25.
 */
import React from 'react';

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

    }
    //modifying value of new item upon change of textFields
    handleChange(e){
        var item = this.state.newItem;
        item[e.target.id] = e.target.value;
        this.setState({newItem: item});
    }
    //add product field view toggle
    addProductField(){
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
                        value={this.state.newItem.Price}
                        id="price"
                        onChange={this.handleChange}
                    />
                    <br/>
                    <input
                        type="text"
                        placeholder={'Enter ProductCategory'}
                        id="category"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        placeholder={'Enter Product Amount'}
                        id="amount"
                        onChange={this.handleChange}
                    />
                    <br/>
                    <textarea
                        type="text"
                        placeholder={'Enter Product Description'}
                        value={this.state.newItem.description}
                        id="description"
                        onChange={this.handleChange}
                    />
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
            Price:this.state.newItem.Price,
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
