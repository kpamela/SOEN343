import React from 'react';
import {FormGroup} from 'react-bootsrap';

export default class CatalogFilter extends React.Component{
  constructor(props){
    super(props);
    this.handleShowFilterClick = this.handleShowFilterClick.bind(this);
    this.handleHideFilterClick = this.handleHideFilterClick.bind(this);
    this.state = {isShowFilter: false};
  }

  handleShowFilterClick() {
    this.setState({isShowFilter: true});
  }

  handleHideFilterClick() {
    this.setState({isShowFilter: false});
  }


  render(){
    const isShowFilter = this.state.isShowFilter;

    let button = null;
    if (isShowFilter) {
      button = <ShowFilterButton onClick={this.handleShowFormClick} />;
    } else {
      button = <HideFilterButton onClick={this.handleHideFilterClick} />;
    }

    return(
      <div>
        <FilteringCatalog isShowFilter={isShowFilter} />
        {button}
      </div>
    );
  }
}

function ShowFilter(props) {
  return(
    <div>
      <h1>THIS IS WHERE THE FILTER FORM WILL BE</h1>
      <h2> some more random text </h2>
    </div>
  )
}


function HideFilter(props) {
  return(
  <div>
    <h1>Press here to show filter</h1>
    <h2> some more random text </h2>
  </div>
  )
}

function FilteringCatalog(props) {
  const isShowFilter = props.isShowFilter;
  if (isShowFilter) {
    return <ShowFilter />;
  }
  return <HideFilter />;
}

function ShowFilterButton(props) {
  return(
    <button onClick={props.onClick}>
      Show Filter
    </button>
  );
}

function HideFilterButton(props) {
  return (
    <button onClick={props.onCLick}>
      Hide Filter
    </button>
  );
}

ReactDOM.render(
  <CatalogFilter />,
  document.getElementById('root')
);
