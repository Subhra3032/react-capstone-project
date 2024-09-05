import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'; 

function Header() {
    return (
        <div className='header'>
            <div className='logo'>PayPilot</div>
            <div className='tab-container'>
                <div className='tab'>
                    <FontAwesomeIcon icon={faBell} className='fa-icon' />   
                    Notification
                </div>
                <div className='tab'>
                    Profile
                    <FontAwesomeIcon icon={faUser} className='fa-icon' />
                </div>
            </div>
        </div>
    );
}

export default Header;