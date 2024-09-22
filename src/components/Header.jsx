import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

    // Get the username from the Redux store
    const username = useSelector((state) => state.user);

    return (
        <div className='header'>
            <Link to="/" className='link-wrapper'>
                <div className='logo'>PayPilot</div>
            </Link>
            <div className='tab-container'>
                <div className='tab'>
                    <FontAwesomeIcon icon={faBell} className='fa-icon' />   
                    Notification
                </div>
                <div className='tab'>
                    {username ? username : "Profile"}
                    <FontAwesomeIcon icon={faUser} className='fa-icon' />
                </div>
            </div>
        </div>
    );
}

export default Header;