// src/App.js
import './App.css';
import React from 'react';
import NewPayment from './Componants/Payment/NewPayment';
import CheckoutForm from './Componants/Payment/CheckoutForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Componants/NewFolder/Home';

function App() {
  return (
    <div>

      <BrowserRouter>

      <Routes>
        <Route path='/' element = {<Home/>} />
      </Routes>

      {/* <NewPayment/> */}
      </BrowserRouter>
     
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
