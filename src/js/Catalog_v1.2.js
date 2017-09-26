/**
 * Created by CharlesPhilippe on 2017-09-24.
 */
import React from 'react';
import ReactDOM from 'react-dom';




class Product extends React.Component{
    render(){
        return (
            <button className="product">
                <b>{this.props.name}</b><br/>{this.props.description}<br/>{this.props.price}<br/>{this.props.amount}
        </button>
        );
    }
}

class ProductListing extends React.Component{
    render(){
        var listing = [];

        //going through pass-by products adding them to current listing
        this.props.products.forEach((product) => {

            if(product.name.indexOf(this.props.filterText) === -1){
                return;
            }

            listing.push(<Product name={product.name} description={product.description} price={product.price} amount={product.amount}/>);
        });

        return(
            <div>
                {listing}
            </div>
        );

    }

}

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
    }

    render(){
        return(
            <form>
                <input type="text" placeholder="Search..."
                       value={this.props.filterText}
                        onChange={this.handleFilterTextInputChange}
                />
            </form>
        );
    }
}

class AddProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            newItem:{name:'', description:'', price:'', amount: null},
            dispField: false,
            dispSign: '+'
        }

        this.handleNewItemOnClick = this.handleNewItemOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        var item = this.state.newItem;
        item[e.target.id] = e.target.value;
        this.setState({newItem: item});
    }

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
                        value={this.state.newItem.price}
                        id="price"
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
            this.state.newItem = {name:'', description:'', price:'', amount: null};
            return;
        }
    }

    handleNewItemOnClick(e){
        var item = {name:this.state.newItem.name,
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

class Catalog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            PRODUCTS : [
                {name: 'MacBook', description:'Aluminium', price:'$$$', amount:4},
                {name: 'Windows', description:'Plastic', price:'$', amount:5}
            ],
            filterText: '',

        };
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
    }

    handleFilterTextInput(filterText){
        this.setState({
            filterText: filterText
        });
    }

    handleNewItem(newItem){

        this.setState({
            PRODUCTS: this.state.PRODUCTS.concat(newItem)

        });
    }

    render(){
        var test = <Product name={'test'}/>;
        console.log(test.props.name);
        return(
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                />
                <AddProduct
                    onNewItem={this.handleNewItem}
                />

                <ProductListing
                    products={this.state.PRODUCTS}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}


ReactDOM.render(
    <Catalog />,
    document.getElementById('Catalogue')
);