import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './Payment.scss';

import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_51PBrnHSCoeIancTYpohTFi6sdV14HfblH7Wq9I2gukILjHe4OlBqLWKgZh8e6XULghXx2Kwl6Jsv7atTfCpNVnnk008CMf4QSD');

const NewPayment = () => {
  return (
    <div className="payment">
    <div className="pay">
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
    </div>
  </div>

  )
}

export default NewPayment
