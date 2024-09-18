import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./OverdueBill.css";
import BillSearchComponent from "./BillSearchComponent";
import Header from "./Header";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NPgG9SIMqwS7WNZEIQb2SSsVkXldQO3jNz2OvXM4YTNKbNTKEhyNIuIPYLD7jIEzDYH1G3hsRkaup8C7IffikUd00LiGt3GRA");

const OverdueBill = () => {
  const [list, setList] = useState([]);
  const [selectedBillIds, setSelectedBillIds] = useState([]); // Track selected bill IDs
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/bill/overdue?userId=user456") // Updated to overdue bills API
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        setOriginalList(data); // Store original data for searching
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Toggle bill selection based on its ID
  const handleCheckboxChange = (billId) => {
    setSelectedBillIds((prevSelectedBillIds) =>
      prevSelectedBillIds.includes(billId)
        ? prevSelectedBillIds.filter((id) => id !== billId)
        : [...prevSelectedBillIds, billId]
    );
  };

  const handlePayNowClick = async () => {
    const stripe = await stripePromise;
    const selectedBills = list.filter((bill) =>
      selectedBillIds.includes(bill.billId) // Filter by bill IDs
    );

    if (selectedBills.length === 0) {
      alert("Please select at least one bill to proceed with payment.");
      return;
    }

    const paymentDetails = {
      bills: selectedBills.map((bill) => ({
        category: bill.billCategory,
        amountDue: bill.amount,
        totalAmount: bill.amount,
      })),
    };

    try {
      const response = await fetch("http://localhost:8085/bill/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.log(result.error.message);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Error occurred while processing payment.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overdue-bill-page"
    >
      <Header />
      <div>
        <BillSearchComponent handleListChange={setList} originalList={originalList} />
      </div>

      <div className="table-container">
        <table className="overdue-table">
          <thead>
            <tr>
              <th></th>
              <th>Bill Name</th>
              <th>Amount Due</th>
              <th>Total Amount</th>
              <th>Due Date</th>
              <th>Overdue By</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) && list.map((data, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBillIds.includes(data.billId)} // Check based on bill ID
                    onChange={() => handleCheckboxChange(data.billId)} // Pass bill ID
                  />
                </td>
                <td>{data.billName}</td>
                <td>{data.amount}</td>
                <td>{data.amount}</td>
                <td>{data.dueDate}</td>
                <td>{Math.floor((new Date() - new Date(data.dueDate)) / (1000 * 60 * 60 * 24))} days</td>
                <td>{data.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="menu-buttons">
        <Link to="/manageBills/overdueUpcoming" className="btn btn-primary">Back</Link>
        <Link onClick={handlePayNowClick} className="btn btn-primary">Pay Now</Link>
        <Link to="/manageBills" className="btn btn-primary">Manage Bills</Link>
      </div>
    </motion.div>
  );
};

export default OverdueBill;
