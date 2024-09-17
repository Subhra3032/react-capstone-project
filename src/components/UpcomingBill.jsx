import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./UpcomingBill.css";
import BillSearchComponent from "./BillSearchComponent";
import Header from "./Header";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NPgG9SIMqwS7WNZEIQb2SSsVkXldQO3jNz2OvXM4YTNKbNTKEhyNIuIPYLD7jIEzDYH1G3hsRkaup8C7IffikUd00LiGt3GRA");

const UpcomingBill = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dummyData = [
    {
      amountDue: "$100",
      totalAmount: "$500",
      dueDate: "2023-10-01",
      dueIn: "5 days",
      paymentStatus: "Pending",
      category: "Category 1",
    },
    {
      amountDue: "$200",
      totalAmount: "$600",
      dueDate: "2023-10-05",
      dueIn: "2 days",
      paymentStatus: "Pending",
      category: "Category 2",
    },
    {
      amountDue: "$150",
      totalAmount: "$450",
      dueDate: "2023-10-03",
      dueIn: "4 days",
      paymentStatus: "Paid",
      category: "Category 3",
    },
  ];

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handlePayNowClick = async () => {
    const stripe = await stripePromise;

    // Filter the selected bills for payment
    const selectedBills = dummyData.filter((bill) => (
      selectedCategories.includes(bill.category)
    ));

    if(selectedBills.length === 0) {
      alert("Please select at least one bill to proceed with payment.")
      return;
    }

    // Prepare the payload for the backend
    const paymentDetails = {
      bills: selectedBills.map((bill) => ({
        category: bill.category,
        amountDue: bill.amountDue,
        totalAmount: bill.totalAmount,
      })),
    };

    try {
      // Call your backend to create a payment intent
      const response = await fetch("http://localhost:8085/bill/create-checkout-session", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });
  
      const { sessionId } = await response.json();
  
      // Use Stripe to redirect to the payment page
      const result = await stripe.redirectToCheckout({ sessionId });
  
      if(result.error) {
        console.log(result.error.message);
        alert("Payment failed. Please try again.");
      }
    } catch(error) {
      console.error("Error creating payment:", error);
      alert("Error occurred while processing payment.");
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="upcoming-bill-page"
    >
      <Header />
      <div>
        <BillSearchComponent />
      </div>

      <div className="table-container">
        <table className="upcoming-table">
          <thead>
            <tr>
              <th></th>
              <th>Amount Due</th>
              <th>Total Amount</th>
              <th>Due Date</th>
              <th>Due In</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(data.category)}
                    onChange={() => handleCheckboxChange(data.category)}
                  />
                </td>
                <td>{data.amountDue}</td>
                <td>{data.totalAmount}</td>
                <td>{data.dueDate}</td>
                <td>{data.dueIn}</td>
                <td>{data.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="menu-buttons">
        <Link to="/manageBills/overdueUpcoming" className="btn btn-primary">
          Back
        </Link>
        <Link onClick={handlePayNowClick} className="btn btn-primary">
          Pay Now
        </Link>
        <Link to="/manageBills" className="btn btn-primary">
          Manage Bills
        </Link>
      </div>
    </motion.div>
  );
};

export default UpcomingBill;
