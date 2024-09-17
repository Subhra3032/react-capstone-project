import React, { useEffect, useState } from 'react';
import './BillDetailsPage.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

function BillDetailsPage() {
    const location = useLocation();
    const { category, fromDate, toDate, status } = location.state || {}; // Get the state passed from the previous page

    const [billsData, setBillsData] = useState([]);
    
    useEffect(() => {
        // Fetch bills based on category, fromDate, toDate, and status
        const fetchBills = async () => {
            try {
                const response = await fetch(`http://localhost:8080/bill/overview?category=${category}&fromDate=${fromDate}&toDate=${toDate}&status=${status}`);
                if (response.ok) {
                    const data = await response.json();
                    setBillsData(data); // Set the fetched data to billsData state
                } else {
                    console.error('Failed to fetch bills');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (category && fromDate && toDate && status) {
            fetchBills();
        }
    }, [category, fromDate, toDate, status]); // Fetch data when these dependencies change

    return (
        <motion.div
            className='bill-details-page'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <InfoCard icon={faListCheck} text="Manage Bills" to='/manageBills' />
            <Link to='/manageBills/billsOverview/allDetails' className='link-wrapper'>
                <h2>{category}</h2>
            </Link>
            <div className='bills-table-container'>
                <table className='bills-table'>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Bill Name</th>
                            <th>Due Date</th>
                            <th>Reminder Frequency</th>
                            <th>Notes</th>
                            <th>Total Amount (in ₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billsData.length > 0 ? (
                            billsData.map((bill, index) => (
                                <tr key={bill.id}>
                                    <td>{index + 1}</td>
                                    <td>{bill.billName}</td>
                                    <td>{bill.dueDate}</td>
                                    <td>{bill.reminderFrequency}</td>
                                    <td>{bill.notes}</td>
                                    <td>{bill.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No bills found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default BillDetailsPage;