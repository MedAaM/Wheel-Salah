import { useState,useEffect } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { addToList,getSub ,payement} from '../api/api';
import './subscription.css'
const Subscription = () => {
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
    });

    const [payData, setPayData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        country:'',
        amount: null
    });

    const [openModal, setOpenModal] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState(null);
     const [om2, setOm2] = useState(false);
     const [priceTLoaded, setPriceTLoaded] = useState(false);
    const [price_type, setPrice_type] = useState(' ');


    // close modal
    const cancelModal = () => {
        setOpenModal(false);
        setOm2(false)

    }
    useEffect(() => {
        const fetchSubscriptionData = async () => {
            try {
                const result = await getSub();
                console.log(result)
                setSubscriptionData(result.subscriptions[0]);


            } catch (error) {
                console.error('Error fetching subscription data:', error);
            }
        };
        fetchSubscriptionData();
    }, []);

    useEffect(() => {
        if (subscriptionData) {
            setPrice_type(subscriptionData.price);
            setPayData(prevPayData => ({
                ...prevPayData,
                amount: subscriptionData.price,
            }));
            setPriceTLoaded(true);        }
    }, [subscriptionData]);
    // call add To list API
    const addToListfn = async (data) => {
        try {
            const result = await addToList(data);
            if (result.success)
             setOpenModal(true);


        } catch (error) {
            console.error('Error :', error);
        }

    }
    const addToListfnAfterPay = async (data) => {
        try {
            const result = await addToList(data);

        } catch (error) {
            console.error('Error :', error);
        }

    }
   
   
    // handle Inputs change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //handle payement change
    const handlePayChange = (e) => {
        const { name, value } = e.target;
        setPayData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handlePaySubmit = (e) => {
        e.preventDefault();
        payement(payData).then((responseData) => {
            window.location.href = responseData.redirect_url;

        });
        addToListfnAfterPay(formData);


    }
    //submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (priceTLoaded) {
        if (price_type === null) {
            // If payment is not done yet
            addToListfn(formData); 
        } else {
            setOm2(true);
             }
        }
        //console.log('Form Data:', formData);
    };
    
    console.log('thepriceTloaded,', priceTLoaded);
    console.log('price_type is', price_type);

    

    return (
        <>

            <Container className="d-flex align-items-center justify-content-center vh-100" >
              <Modal show={om2} onHide={cancelModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={handlePaySubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={payData.name} onChange={handlePayChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={payData.email} onChange={handlePayChange} />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" name="phone" value={payData.phone} onChange={handlePayChange} />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={payData.city} onChange={handlePayChange} />
                    </Form.Group>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="country" value={payData.country} onChange={handlePayChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                 
                <Modal show={openModal} onHide={cancelModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Alert </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Added to List!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelModal}>
                            Cancel
                        </Button>

                    </Modal.Footer>
                </Modal>     
                  
                <Row>
                    <Col  xs={12} md={16} >
                      
                        <div className="border rounded p-4 container-div" style={{ backgroundColor: '#ffff' }}>
                        {subscriptionData && (priceTLoaded === true) && (
                                <>
                                <h1 className="title"style={{ textAlign: "center", color: "red", fontSize: "4em"}}>{subscriptionData.title}</h1>
                                <p className='p' dangerouslySetInnerHTML={{ __html: subscriptionData.description.replace(/\n/g, '<br />') }}></p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={`http://localhost:8000/uploads/${subscriptionData.imageUrl}`} alt="Subscription" className='imagee' style={{ border: "2px solid orange" }} />
                                </div>
                                
                                {(subscriptionData.price) !== null ? (
                                   <h1>Price of subscription :{subscriptionData.price} AED</h1>) : (
                                         <h1>Free to Subscribe</h1>
                                     )} 
                               </>
                            )}
                            <h1 style={{textAlign:"center", color:"black"}}>التسجيل</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="form-goupe">
                                    <Form.Control type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name" 
                                        required/>
                                </Form.Group>
                                <Form.Group className="form-goupe">
                                    <Form.Control type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email address"
                                        required />
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
export default Subscription;