import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { login } from '../api/api';

const Login = ( ) => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });
    const navigate = useNavigate();

    // handle Inputs change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData); 
            console.log(response);// API call to login
            if (response.message == "Login successful"){
                   localStorage.setItem('isAdmin', true); // Set isAdmin to true in localStorage
                   window.location.reload();
             // Redirect to home page
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure
        }
    };
    return (
        <>
        <Container className="d-flex align-items-center justify-content-center vh-100" >          
                <Row>
                    <Col xs={12} md={16}>

                        <div className="border rounded p-4 " style={{ backgroundColor: '#ffff' }}>
                            <h1 style={{textAlign:"center", color:"black"}}>التسجيل</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="form-goupe">
                                    <Form.Control type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name" />
                                </Form.Group>
                                <Form.Group className="form-goupe">
                                    <Form.Control type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password " />
                                </Form.Group>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="primary" type="submit" >
                                    تسجيل
                                </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
  
}

export default Login