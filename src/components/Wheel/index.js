import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import spinSound from '../../Lucky wheel spin sound effect.mp3';

export default class Wheel extends React.Component {

  //The constructor initializes the component state with selectedItem set to null.
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    //It binds the selectItem function to the component instance.
    this.selectItem = this.selectItem.bind(this);
    this.playSpinSound = this.playSpinSound.bind(this); // Binding the playSpinSound method
    this.stopSpinSound = this.stopSpinSound.bind(this);
    this.audio = null;
    console.log("props", props)
    // this.divRef = React.createRef();
  }

  playSpinSound() {
    this.audio = new Audio(spinSound); // Create new Audio object with the spin sound file
    this.audio.play(); // Play the audio  
  }
  stopSpinSound() {
    if (this.audio) {
      this.audio.pause();
    }
  }
  
  autoClickDiv = () => {

    if (this.divRef.current) {
      this.divRef.current.click();
    }
  };


  componentDidUpdate(prevProps) {
    if (
      this.props.automaticSpin && // Check if automatic spin is enabled
      !prevProps.spinning && // Check if spinning just stopped
      this.props.spinning && // Check if spinning just started
      this.state.selectedItem !== null // Check if an item is already selected

    ) {
      setTimeout(this.selectItem, 3000);
      // Show loser modal after 3 seconds
    }
     if (!this.props.spinning) {
      this.stopSpinSound(); // Play sound when spinning starts
     }
     if (this.props.spinning){
      this.playSpinSound();
     }
     

  }




  selectItem() {



    if (this.props.items.length === 0) {
      console.log("Can't spin a empty wheel or spinning wheel with 0");
      return;
    }
    if (this.props.items.length === 1) {
      console.log("Can't spin a empty wheel or spinning wheel with 1");
      return;
    }
    if (this.props.spinning === true) {
      console.log("Already spinning");
      return;
    }
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      this.props.onChange(selectedItem);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
      console.log("1");
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
      console.log("2");
    }

  }


  render() {

    const { location } = this.props;


    //This function renders the JSX structure of the component.

    const { selectedItem } = this.state;
    const { items } = this.props;
    //It sets up CSS variables based on component state and props.
    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";
    //It calculates the spinning duration from the local storage or defaults to a predefined value.
    let spinDuration = localStorage.getItem("duration");
    //It checks if the wheel and font colors are provided as props, otherwise, it sets default colors.


    let cssProperties = {};

    cssProperties["--spinning-duration"] = `${spinDuration}s`;
    cssProperties["--wheel-color"] = `${this.props.wheelColor}`;
    cssProperties["--neutral-color"] = `${this.props.fontColor}`;
    cssProperties["--font-sizee"] = `${this.props.fontSize}`;


    if (cssProperties["--wheel-color"] === "null")
      cssProperties["--wheel-color"] = "#d38c12";

    if (cssProperties["--neutral-color"] === "null")
      cssProperties["--neutral-color"] = "#FFFFFF";

    if (cssProperties["--font-sizee"] === "null")
      cssProperties["--font-sizee"] = '20px';



    return (
      <div style={cssProperties} >
        {location.pathname !== '/live' && (
        <h1 className="text-center" style={{color: "white", fontFamily:"Andalus", fontSize:"50px"}} >اضغط على العجلة للبداية</h1>
        )}
        <div className="wheel-container">
          <div
            lg={true}
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={this.selectItem}
            ref={this.props.reference}
          >

            {items.map((item, index) => (
              <div
                className="wheel-item"
                key={index}
                style={{ "--item-nb": index }}
              >
                {item}
              </div>
            ))}

          </div>
           <div class="ag-wheel_lamp ag-wheel_lamp-1"></div>
           <div class="ag-wheel_lamp ag-wheel_lamp-2"></div>
            <div class="ag-wheel_lamp ag-wheel_lamp-3"></div>
           <div class="ag-wheel_lamp ag-wheel_lamp-4"></div>
          <div class="ag-wheel_lamp ag-wheel_lamp-5"></div>
           <div class="ag-wheel_lamp ag-wheel_lamp-6"></div>
           <div class="ag-wheel_lamp ag-wheel_lamp-7"></div>
            <div class="ag-wheel_lamp ag-wheel_lamp-8"></div>
           <div class="ag-wheel_lamp ag-wheel_lamp-9"></div>
          <div class="ag-wheel_lamp ag-wheel_lamp-10"></div>
           <div class="ag-wheel_lamp ag-wheel_lamp-11"></div>
          <div class="ag-wheel_num-stand"></div>
            <div class="ag-wheel_num-stand ag-wheel_num-stand_shadow"></div>
  </div>
        </div>
    );
  }
}


// Define prop types
Wheel.propTypes = {
  items: PropTypes.array.isRequired,
  automaticSpin: PropTypes.bool.isRequired


};

// Define default prop values
Wheel.defaultProps = {
  items: [
    "Ali",
    "Beatriz",
    "Charles",
    "Diya",
    "Eric",
    "Fatima",
    "Gabriel",
    "Hanna",
  ],
};


