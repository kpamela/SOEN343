import React from 'react';
import ReactDOM from 'react-dom';

export default class Product extends React.Component{

    displayDescription(){

        let desc =[];

        for(let i in this.props.description){
            desc.push(<p>{i }: {this.props.description[i] }</p>);

        }

        return desc;
    }

    func(){
        console.log("jdj");
    }

    render(){
       // console.log(JSON.stringify(this.props.description));

        return (
            <span>
            <button className="product">
                <b>{this.props.name}</b><br/>
                <i>{this.props.category}</i><br/>
                {this.displayDescription()}

                {this.props.amount}
            </button>
                <br/>
                <button onclick={()=> this.func()}>

                </button>
            </span>
        );
    }
}