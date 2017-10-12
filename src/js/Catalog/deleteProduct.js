// Created by Yan Ming on 2017-10-11

import React from ' react ';

export default class deleteProduct extends React.Component{

  remove(id){
    this.setState({
      items: this.state.items.filter((el) => id !== el.id)
    })

}

//render(){ return (<div> <buttoon className="del" onClick: this.remove(this.id)</div>)}
