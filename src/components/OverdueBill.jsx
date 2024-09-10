import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./OverdueBill.css";
import BillSearchComponent from "./BillSearchComponent";
import Header from "./Header";

const OverdueBill = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dummyData = [
    {
      amountDue: "$100",
      totalAmount: "$500",
      dueDate: "2023-10-01",
      overdueBy: "5 days",
      paymentStatus: "Pending",
      category: "Category 1",
    },
    {
      amountDue: "$200",
      totalAmount: "$600",
      dueDate: "2023-10-05",
      overdueBy: "2 days",
      paymentStatus: "Pending",
      category: "Category 2",
    },
    {
      amountDue: "$150",
      totalAmount: "$450",
      dueDate: "2023-10-03",
      overdueBy: "4 days",
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overdue-bill-page"
    >
      <Header />
      <div>
        <BillSearchComponent />
      </div>

      <div className="table-container">
        <table className="overdue-table">
          <thead>
            <tr>
              <th></th>
              <th>Amount Due</th>
              <th>Total Amount</th>
              <th>Due Date</th>
              <th>Overdue By</th>
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
                <td>{data.overdueBy}</td>
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
        <Link to="/manageBills/payment" className="btn btn-primary">
          Pay Now
        </Link>
        <Link to="/manageBills" className="btn btn-primary">
          Manage Bills
        </Link>
      </div>
    </motion.div>
  );
};

export default OverdueBill;
