import React from 'react';
import './Dropdown.css';

function Dropdown({ id, options }) {
    return (
        <select id={id} className='dropdown'>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;