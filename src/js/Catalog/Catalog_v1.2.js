/**
 * Created by CharlesPhilippe on 2017-09-24.
 */
import React from 'react';
import ReactDOM from 'react-dom';




class Product extends React.Component{
    render(){
        return (
            <button className="product">
            {this.props.name}
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

            listing.push(<Product name={product.name}/>);
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
            newItem:'',
            dispField: false,
            dispSign: '+'
        }

        this.handleNewItemOnClick = this.handleNewItemOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        this.setState({newItem: e.target.value});
    }

    addProductField(){
        if(this.state.dispField){
            this.state.dispSign = '+';
            return(
                <form onSubmit={this.handleNewItemOnClick}>
                    <input
                        type="text"
                        placeholder={'Enter Product Name'}
                        value={this.state.newItem}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
            );
        }
        else{
            this.state.dispSign = '-';
            return;
        }
    }

    handleNewItemOnClick(e){
        this.props.onNewItem(this.state.newItem);
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
                {name: 'MacBook'},
                {name: 'Windows'}
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
            PRODUCTS: this.state.PRODUCTS.concat([{name: newItem}])

        });
    }

    render(){
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