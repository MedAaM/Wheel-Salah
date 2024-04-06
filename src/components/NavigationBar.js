import React from "react";
import { useState } from "react";
import Customize from "./Customize/Customize";
import { Button, Modal, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavigationBar(props) {
    //state
  const [openModal, setOpenModal] = useState(false);
  const { automaticSpin,setAutomaticSpin } = props; // Destructure automaticSpin from props
  const [close,setClose] = useState(false);

   
 

    
  function cancelModal() {
    setOpenModal(false);
    const colorSettings = {
      wheelColor: localStorage.getItem("wheelColor"),
      fontColor: localStorage.getItem("fontColor"),
      fontSize: localStorage.getItem("fontSize"),
    };
    props.onChange(colorSettings);
  }
 
  return (
    <div>
      <Navbar bg="light" expand="lg" style={{paddingTop:"30px"}}>
        <Navbar.Brand href="#home">
          <h3 className="d-inline ms-5 fs-1" style= {{fontFamily :"Cairo", color: "red"}}>الرولت</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link onClick={() => setOpenModal(true)} className="me-4" style= {{fontFamily :"Cairo", color: "red"}}>
            <i className="bi bi-palette-fill me-2"></i>
            تخصيص
          </Nav.Link>
          
        </Navbar.Collapse>
      </Navbar>
      <Modal show={openModal} onHide={cancelModal} size="lg">
        <Modal.Body>
          <Customize automaticSpin={automaticSpin} setAutomaticSpin={setAutomaticSpin} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={cancelModal}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NavigationBar;