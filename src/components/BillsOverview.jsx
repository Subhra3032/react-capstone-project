import React, { useState } from 'react';
import './BillsOverview.css';
import Header from './Header';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';
import { Link, useNavigate } from 'react-router-dom';

function BillsOverview() {

    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const handleSubmit = () => {
        let path;
        
        switch(category) {
            case 'House Rent':
                path = '/manageBills/billsOverview/houseRent';
                break;

            case 'Debt Payments':
                path = '/manageBills/billsOverview/debtPayments';
                break;

            case 'Credit Card Bills':
                path = '/manageBills/billsOverview/creditCardBills';
                break;

            case 'Utilities':
                path = '/manageBills/billsOverview/utilities';
                break;

            case 'Electricity':
                path = '/manageBills/billsOverview/electricity';
                break;

            case 'Internet':
                path = '/manageBills/billsOverview/internet';
                break;

            case 'All':
                path = '/manageBills/billsOverview/allDetails';
                break;

            default:
                path = '/manageBills/billsOverview'; // Default path if none match
                break;
        }

        navigate(path);
    }

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
                        options={['All', 'House Rent', 'Debt Payments', 'Credit Card Bills', 'Utilities', 'Electricity', 'Internet']}
                        onChange={(e) => setCategory(e.target.value)}
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
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </motion.div>
    );
}

export default BillsOverview;