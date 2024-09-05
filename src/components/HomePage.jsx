import React from 'react';
import './HomePage.css';
import InfoCard from './InfoCard';
import Header from './Header';
import { faCalendarCheck, faListCheck, faMagnifyingGlassDollar  } from '@fortawesome/free-solid-svg-icons';
import Support from './Support';

function HomePage() {
    return (
        <div className='homepage'>
            <Header />
            <div className='info-card-container'>
                <InfoCard icon={faCalendarCheck} text="Schedule Payment" />
                <InfoCard icon={faListCheck} text="Manage Bills" />
                <InfoCard icon={faMagnifyingGlassDollar} text="Track Payments" />
            </div>
            <Support />
        </div>
    );
    }

export default HomePage;