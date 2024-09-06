import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Feature.css';

function Feature({ text }) {
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleClick = () => {
        if (text === "Add New Bill") {
            navigate('/addBills'); // Redirect to addBills page
        }
        // Add more conditional navigation if needed for other features
    };

    return (
        <div className='feature-card' onClick={handleClick}>
            <p className='feature-card-text'>{text}</p>
        </div>
    );
}

export default Feature;
