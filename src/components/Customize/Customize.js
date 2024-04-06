import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ColorPicker from "./ColorPicker";
import { Tabs, Tab } from "react-bootstrap";

export default function Customize({ automaticSpin,setAutomaticSpin }) {
  // wheel color
  const [state, updateState] = useState(localStorage.getItem("wheelColor"));

  // font color
  const [state2, updateState2] = useState(localStorage.getItem("fontColor"));

  //font size

  const [state3, updateState3] = useState(localStorage.getItem("fontSize"));

  



  const marks = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 60,
      label: "60",
    },
  ];

  function valuetext(value) {
    localStorage.setItem("duration", value);
    return `${value}`;

  }

  // handle wheel color input
  const handleInput = (e) => {
    updateState(e.target.value);
    localStorage.setItem("wheelColor", state);
  };

  // handle font color input
  const handleInput2 = (e) => {
    updateState2(e.target.value);
    localStorage.setItem("fontColor", state2);
  };
  
   // handle font size input
  const handleInput3 = (e) => {
    let newValue = e.target.value

    updateState3(newValue);
    localStorage.setItem("fontSize", newValue + 'px');
  };

  

  
  
  
  return (


    <Tabs
      defaultActiveKey="during-spin"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="during-spin" title="During spin">
        <div className="mt-3">
          <p>Spin time (seconds) </p>
          <Box sx={{ width: "100%" }}>
            <Slider
              aria-label="Custom marks"
              defaultValue={localStorage.getItem("duration")}
              getAriaValueText={valuetext}
              min={1}
              step={1}
              max={60}
              valueLabelDisplay="auto"
              marks={marks}
            />
           
          </Box>
          <Box>
            {/* Checkbox for automatic spin */}
              <input
           type="checkbox"
           checked={automaticSpin}
           onChange={(e) => setAutomaticSpin(e.target.checked)}
            />
            <label style={{color: "red", paddingLeft:"3px", fontWeight:"700"}}>Automatic Spin</label>
          </Box>
        </div>
      </Tab>
      <Tab eventKey="appearance" title="Appearance">
        <ColorPicker
          value={state}
          onChange={handleInput}
          value2={state2}
          onChange2={handleInput2}
          value3={state3}
          onChange3={handleInput3}
        />
      </Tab>

    </Tabs>
  );
}
