import React, { useState } from 'react';
import './AddBills.css';
import { motion } from 'framer-motion';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


function AddBills() {
    const [billName, setBillName] = useState('');
    const [category, setCategory] = useState('');
    const [billDate, setBillDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [reminderFrequency, setReminderFrequency] = useState('');
    const [notes, setNotes] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isRecurring, setIsRecurring] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Collect the data from the form
        const billData = {
            billName,
            category,
            billDate,
            dueDate,
            amount,
            reminderFrequency,
            notes,
            attachment, // If you plan to upload a file, you'll need additional file handling logic
            isRecurring,
        };

        // Simple validation (you can add more detailed validation here if needed)
        if (!billName || !category || !billDate || !dueDate || !amount || !reminderFrequency) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData(); // Initialize formData

        formData.append('billName', billName);
        formData.append('category', category);
        formData.append('billDate', billDate);
        formData.append('dueDate', dueDate);
        formData.append('amount', amount);
        formData.append('reminderFrequency', reminderFrequency);
        formData.append('notes', notes);
        formData.append('isRecurring', isRecurring);

        if (attachment) {
            formData.append('attachment', attachment); // File handling
        }

        try {
            // Send POST request to the API
            const response = await fetch('http://localhost:8085/bill/add-bills', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);

                // Show success message
                alert('Bill saved successfully!');

                // Redirect to Manage Bills page
                navigate('/manageBills');
            } 
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred while saving bill. Please try again.');
        }

        // Clear form after submission
        setBillName('');
        setCategory('');
        setBillDate('');
        setDueDate('');
        setAmount('');
        setReminderFrequency('');
        setNotes('');
        setAttachment(null);
        setIsRecurring(false);

        console.log('Form submitted:', billData);

        // Show success message
        alert('Bill saved successfully!');

        // Redirect to Manage Bills page
        navigate('/manageBills');
    };

    const handleCancel = () => {
        // Navigate to Manage Bills page when cancel button is pressed
        navigate('/manageBills');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='add-bills-container'
        >
            <Header />
            <div className="add-bill-form">
                <h2>Add New Bill</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>Bill Name</label>
                        <input 
                            type="text" 
                            value={billName} 
                            onChange={(e) => setBillName(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Bill Category</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Subscription">Subscription</option>
                            <option value="Rent">Rent</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label>Bill Date</label>
                        <input 
                            type="date" 
                            value={billDate} 
                            onChange={(e) => setBillDate(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Due Date</label>
                        <input 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Amount</label>
                        <input 
                            type="text" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label>Reminder Frequency</label>
                        <select 
                            value={reminderFrequency} 
                            onChange={(e) => setReminderFrequency(e.target.value)} 
                            required
                        >
                            <option value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label>Attachment</label>
                        <input 
                            type="file" 
                            text="Max size: 2MB (PDF)"
                            accept="application/pdf" 
                            onChange={(e) => setAttachment(e.target.files[0])} 
                        />
                        {/* <small>Max size: 2MB (PDF)</small> */}
                    </div>
                    <div className="form-row">
                        <label>Notes (if any)</label>
                        <textarea 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
                        />
                    </div>
                    <div className="form-row">
                        <label>Recurring Bill</label>
                        <input 
                            type="checkbox" 
                            id="recurring-toggle"
                            checked={isRecurring} 
                            onChange={() => setIsRecurring(!isRecurring)} 
                        />
                        <label className="slider" htmlFor="recurring-toggle"></label>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn save-btn">Save</button>
                        <button type="button" className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default AddBills;
