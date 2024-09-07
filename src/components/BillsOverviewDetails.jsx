import React from 'react';
import './BillsOverviewDetails.css';
import { faBolt, faCalendarAlt, faCreditCard, faHome, faListCheck, faMoneyBill, faWifi } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import InfoCard from './InfoCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

function BillsOverviewDetails() {
    const components = [
        { icon: faHome, category: 'House Rent', status: '3 Paid / 1 Overdue / 2 Upcoming' },
        { icon: faMoneyBill, category: 'Debt Payments', status: '2 Paid / 0 Overdue / 1 Upcoming' },
        { icon: faCreditCard, category: 'Credit Card Bills', status: '1 Paid / 2 Overdue / 1 Upcoming' },
        { icon: faCalendarAlt, category: 'Utilities', status: '4 Paid / 0 Overdue / 1 Upcoming' },
        { icon: faBolt, category: 'Electricity', status: '5 Paid / 1 Overdue / 0 Upcoming' },
        { icon: faWifi, category: 'Internet', status: '2 Paid / 0 Overdue / 1 Upcoming' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='bills-overview-details'
        >
            <Header />
            <InfoCard icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <h2 className='page-title'>Bills Overview Details</h2>

            <div className='row'>
                {components.slice(0, 3).map((item, index) => (
                    <div key={index} className='info-component'>
                        <div className='icon'><FontAwesomeIcon icon={item.icon} size='3x' /></div>
                        <div className='text'>{item.category}</div>
                        <div className='status'>{item.status}</div>
                    </div>
                ))}
            </div>

            <div className='row'>
                {components.slice(3).map((item, index) => (
                    <div key={index} className='info-component'>
                        <div className='icon'><FontAwesomeIcon icon={item.icon} size='3x' /></div>
                        <div className='text'>{item.category}</div>
                        <div className='status'>{item.status}</div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default BillsOverviewDetails;