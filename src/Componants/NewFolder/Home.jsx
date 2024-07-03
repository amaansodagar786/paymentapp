import React, { useState, useEffect } from 'react';
import './Home.scss';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51PBrnHSCoeIancTYpohTFi6sdV14HfblH7Wq9I2gukILjHe4OlBqLWKgZh8e6XULghXx2Kwl6Jsv7atTfCpNVnnk008CMf4QSD");

const Home = () => {
    const itemName = "image";
    const itemPrice = 500;
    const [quantity, setQuantity] = useState(1);
    const [finalAmount, setFinalAmount] = useState(itemPrice);
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state

    useEffect(() => {
        // Function to load Stripe.js asynchronously
        const loadStripeJs = async () => {
            await stripePromise;
        };

        loadStripeJs();
    }, []);

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setFinalAmount(finalAmount - itemPrice);
        }
    };

    const increment = () => {
        setQuantity(quantity + 1);
        setFinalAmount(finalAmount + itemPrice);
    };

    const checkout = async () => {
        setLoading(true); // Set loading state to true during checkout process

        try {
            const response = await fetch("https://paymentbackend.vercel.app/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [
                        {
                            id: 1,
                            quantity: quantity,
                            price: itemPrice,
                            name: itemName
                        }
                    ],
                    customerName: customerName,
                    customerAddress: customerAddress
                })
            });

            const session = await response.json();
            const stripe = await stripePromise;

            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId,
            });

            if (result.error) {
                console.error(result.error.message);
                setLoading(false); // Set loading state back to false if there is an error
            }
        } catch (error) {
            console.log(error);
            setLoading(false); // Set loading state back to false on error
        }
    };

    return (
        <div className="home-container">
            <h1>Product: {itemName}</h1>
            <h2>Price: ₹{itemPrice}</h2>
            <div className="quantity-controls">
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
            </div>
            <h3>Total Amount: ₹{finalAmount}</h3>
            <label htmlFor="customer-name">Customer Name:</label>
            <input
                type="text"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />
            <label htmlFor="customer-address">Customer Address:</label>
            <textarea
                id="customer-address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
            />
            <button className="checkout-btn" onClick={checkout} disabled={loading}>
                {loading ? 'Loading...' : 'Checkout'}
            </button>
        </div>
    );
};

export default Home;
