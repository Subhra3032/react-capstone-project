import React from 'react';
import './BillDetailsPage.css';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import InfoCard from './InfoCard';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

function BillDetailsPage() {

    const { category } = useParams();

    // Example data for the table
    const billsData = [
        { id: 1, loanType: 'Personal Loan', monthlyEMI: '10,000', dueDate: '2024-09-10', totalLoanAmount: '2,00,000' },
        { id: 2, loanType: 'Car Loan', monthlyEMI: '8,000', dueDate: '2024-09-15', totalLoanAmount: '1,50,000' },
    ];

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
                <h2>Bills Overview</h2>
            </Link>
            <div className='bills-table-container'>
                <table className='bills-table'>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Loan Type</th>
                            <th>Monthly EMI (in Rs)</th>
                            <th>Due Date</th>
                            <th>Total Loan Amount (in Rs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billsData.map((bill) => (
                            <tr key={bill.id}>
                                <td>{bill.id}</td>
                                <td>{bill.loanType}</td>
                                <td>{bill.monthlyEMI}</td>
                                <td>{bill.dueDate}</td>
                                <td>{bill.totalLoanAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default BillDetailsPage;