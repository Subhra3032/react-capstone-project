import React from 'react';
import './BillsOverview.css';
import Header from './Header';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';
import { Link } from 'react-router-dom';

function BillsOverview() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='bills-overview'
        >
            <Header />
            <InfoCard icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <h2>Bills Overview</h2>
            <div className='overview-content'>
                <div className='form-group'>
                    <label htmlFor='bill-category'>Bill Category</label>
                    <Dropdown
                        id='bill-category'
                        options={['Electricity', 'Water', 'Internet', 'Rent']}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='bill-date-from'>Bill Date From</label>
                    <DatePicker id='bill-date-from' />
                </div>
                <div className='form-group'>
                    <label htmlFor='bill-date-to'>Bill Date To</label>
                    <DatePicker id='bill-date-to' />
                </div>
                <div className='form-group'>
                    <label htmlFor='bill-status'>Bill Status</label>
                    <Dropdown
                        id='bill-status'
                        options={['Paid', 'Pending', 'Overdue']}
                    />
                </div>
            </div>
            <button className='submit-button'>Submit</button>
        </motion.div>
    );
}

export default BillsOverview;