import React , { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Home from './pages/home';
import Subscription from './pages/subscription';
import Live from './pages/Live';
import Login from './pages/Login';
import "./App.css"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  const [access, setAccess] = useState(false); // State to manage access

  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
    <Router>
      <div>
        <Routes >
        <Route path="/" element={isAdmin ? <Home /> : <Login/>} />
          <Route path="/subscription" exact element={<Subscription />} />
          <Route path="/live" exact element={<Live />} />
          <Route path="/login" exact element={<Login />} />

        </Routes>
      </div>
    </Router>
    </Elements>
  );
};

export default App;