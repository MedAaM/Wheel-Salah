import React from "react";

export default class Result extends React.Component {

  //clearList is an arrow function that triggers the onChange function passed as a prop to the component
  clearList = () => {
    this.props.onChange();
  };




  render() {
    return (
      <div>
        <button
          id="clearListButton"
          style={{ marginTop: "10px", color:"white" }}
          className="btn btn-outline-secondary disableElement"
          onClick={this.clearList}
        >
          Clear the list
        </button>
        <ul>
          {this.props.winners.map((winner, index) => (
            <li key={index} style={{ marginTop: "10px" , color:"white"}}>
              {winner}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

