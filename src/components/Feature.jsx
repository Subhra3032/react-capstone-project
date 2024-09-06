import React from 'react';
import './Feature.css';

function Feature( {text} ) {
    return (
        <div className='feature-card'>
            <p className='feature-card-text'>{text}</p>
        </div>
    );
}

export default Feature;