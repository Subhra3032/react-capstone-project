import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './InfoCard.css';

const InfoCard = ({ icon, text }) => {
    return (
        <div className='info-card'>
            <div className='info-card-icon'>
                <FontAwesomeIcon icon={icon} size='5x' />
            </div>
            <div className='info-card-text'>{text}</div>
        </div>
    );
}

export default InfoCard;