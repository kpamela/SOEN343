// Created by Yan Ming on 2017-10-11

import React from ' react ';

export default class deleteProduct extends React.Component{

  contructor(props){
    super(props);

    this.state({

    })
  }
  remove(id){
    this.setState({
      items: this.state.items.filter((el) => id !== el.id)
    })

}

render(){
  return (
    <div>
      <button className="del" onClick:() => this.remove(this.id) >
      </button>
    </div>

  )
}
