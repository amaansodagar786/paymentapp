import React, { useState } from 'react';
import './Home.scss';

const Home = () => {
    const itemName = "image";
    const itemPrice = 500;
    const [quantity, setQuantity] = useState(1);
    const [finalAmount, setFinalAmount] = useState(itemPrice);
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    const decrement = () => {
        if (quantity <= 1) {
            setQuantity(1);
            setFinalAmount(itemPrice);
        } else {
            setQuantity(quantity - 1);
            setFinalAmount(finalAmount - itemPrice);
        }
    };

    const increment = () => {
        setQuantity(quantity + 1);
        setFinalAmount(finalAmount + itemPrice);
    };

    const checkout = async () => {
        try {
            const res = await fetch("http://localhost:5000/checkout", {
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
            const data = await res.json();
            window.location.href = data.url; // Redirect to the payment URL returned from the server
        } catch (error) {
            console.log(error);
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
            <button className="checkout-btn" onClick={checkout}>Checkout</button>
        </div>
    );
};

export default Home;
