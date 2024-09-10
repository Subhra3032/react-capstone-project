import React from 'react';
import './Dropdown.css';

function Dropdown({ id, options, onChange }) {
    return (
        <select id={id} className='dropdown' onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;