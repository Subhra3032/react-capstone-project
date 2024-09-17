import React, { useEffect, useState } from 'react';
import './ReminderSettings.css';
import { motion } from 'framer-motion';
import Header from './Header';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';

function ReminderSettings() {

    const [category, setCategory] = useState('');
    const [billName, setBillName] = useState('');
    const [showReminderOptions, setShowReminderOptions] = useState(false);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setShowReminderOptions(!!e.target.value && !!billName);
    }

    const handleBillNameChange = (e) => {
        setBillName(e.target.value);
        setShowReminderOptions(!!category && !!e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='reminder-settings-page'
        >
            <Header />
            <InfoCard icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <div className='settings-container'>
                {/* Left Side Div */}
                <div className='left-side'>
                    <div className='form-group'>
                        <label htmlFor="bill-category">Bill Category</label>
                        <Dropdown 
                            id="bill-category"
                            options={['Services', 'Rent', 'Loan', 'Utilities', 'Credit Card', 'Subscriptions', 'Insurance', 'Others']}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="bill-name">Bill Name</label>
                        <input 
                            type="text"
                            id="bill-name"
                            placeholder="Search Bill Name"
                            value={billName}
                            onChange={handleBillNameChange}
                        />
                    </div>
                </div>

                {/* Right Side Div */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: showReminderOptions ? 1 : 0, scale: showReminderOptions ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                    className='right-side'
                >
                    {showReminderOptions && (
                        <>
                            <div className='upper-right'>
                                <div className='form-group'>
                                <label htmlFor="reminder-frequency">Reminder Frequency</label>
                                    <Dropdown
                                        id="reminder-frequency"
                                        options={['Daily', 'Weekly', 'Monthly']}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="message-customization">Message Customization</label>
                                    <textarea
                                        id="message-customization"
                                        placeholder="Customize your reminder message"
                                        rows="2"
                                    />
                                </div>
                            </div>

                            <div className='lower-right'>
                                <div className='form-group'>
                                    <label htmlFor="reminder-date">Reminder Starting Date</label>
                                    <DatePicker 
                                        id="reminder-date"
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="notification-preference">Notification Preferences</label>
                                    <Dropdown
                                        id="notification-preference"
                                        options={['Email', 'SMS', 'Push Notifications']}
                                    />
                                </div>
                            </div>

                            <div className='form-group recurring-switch'>
                                <label htmlFor="recurring-bill">Recurring Bill</label>
                                <input type="checkbox" id="recurring-bill" />
                            </div>

                            <button className='submit-btn'>Submit</button>
                        </>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ReminderSettings;