import React from 'react';
import './ManageBills.css';
import Header from './Header';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Feature from './Feature';

function ManageBills() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='manage-bills'
        >
            <Header />
            <div className='info-card-container'>
                <InfoCard icon={faListCheck} text="Manage Bills" />
            </div>
            <div className='features-container'>
                <Feature text="Add New Bill" />
                <Feature text="Upcoming/Overdue Bills" />
                <Feature text="Reminder Settings" />
                <Feature text="Bills Overview" />
                <Feature text="Snooze or Mark Paid Bills" />
            </div>
        </motion.div>
    );
}

export default ManageBills;