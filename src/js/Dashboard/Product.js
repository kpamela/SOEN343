import React from 'react';
import ReactDOM from 'react-dom';

export default class Product extends React.Component{

    displayDescription(){

        let desc =[];

        for(let i in this.props.item.description){
            desc.push(<p>{i }: {this.props.item.description[i] }</p>);

        }

        return desc;
    }

    func(){
        alert("hh");
    }

    render(){
       // console.log(JSON.stringify(this.props.description));

        return (
            <div>
            <button className="product">
                <b>{this.props.item.name}</b><br/>
                <i>{this.props.item.category}</i><br/>
                {this.displayDescription()}
                {this.props.item.amount}
                <span>
                <button onClick={()=> this.func()}>

                </button>
                </span>
            </button>
                <br/>

            </div>
        );
    }
}