import React from 'react';
import './BillsOverviewDetails.css';
import { faBolt, faCalendarAlt, faCreditCard, faHome, faListCheck, faMoneyBill, faWifi } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Feature from './Feature';
import InfoCard from './InfoCard';

function BillsOverviewDetails() {
    const components = [
        { icon: faHome, category: 'House Rent', status: '3 Paid / 1 Overdue / 2 Upcoming', path: '/manageBills/billsOverview/houseRent' },
        { icon: faMoneyBill, category: 'Debt Payments', status: '2 Paid / 0 Overdue / 1 Upcoming', path: '/manageBills/billsOverview/debtPayments' },
        { icon: faCreditCard, category: 'Credit Card Bills', status: '1 Paid / 2 Overdue / 1 Upcoming', path: '/manageBills/billsOverview/creditCardBills' },
        { icon: faCalendarAlt, category: 'Utilities', status: '4 Paid / 0 Overdue / 1 Upcoming', path: '/manageBills/billsOverview/utilities' },
        { icon: faBolt, category: 'Electricity', status: '5 Paid / 1 Overdue / 0 Upcoming', path: '/manageBills/billsOverview/electricity' },
        { icon: faWifi, category: 'Internet', status: '2 Paid / 0 Overdue / 1 Upcoming', path: '/manageBills/billsOverview/internet' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='bills-overview-details'
        >
            <Header />
            <InfoCard className="info-component" icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <h2 className='page-title'>Bills Overview Details</h2>

            <div className='info-component-container'>
                {components.map((item, index) => (
                    <Feature key={index} icon={item.icon} text={item.category} to={item.path} />
                ))}
            </div>
        </motion.div>
    );
}

export default BillsOverviewDetails;