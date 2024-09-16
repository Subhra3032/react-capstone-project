import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./SnoozeOrMarkBillsPaid.css";
import SnoozeHelper from "./SnoozeHelper";
import Header from "./Header";
import DatePicker from "./DatePicker"; // Import your custom DatePicker

const SnoozeOrMarkBillsPaid = () => {
  const [selectedBills, setSelectedBills] = useState([]);
  const [snoozeDate, setSnoozeDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [dummyData, setDummyData] = useState([
    {
      billName: "Electricity Bill",
      amountDue: "$100",
      totalAmount: "$500",
      dueDate: "2023-10-01",
      overdueBy: "5 days",
      paymentStatus: "Pending",
      category: "Utilities",
    },
    {
      billName: "Water Bill",
      amountDue: "$200",
      totalAmount: "$600",
      dueDate: "2023-10-05",
      overdueBy: "2 days",
      paymentStatus: "Pending",
      category: "Utilities",
    },
    {
      billName: "Internet Bill",
      amountDue: "$150",
      totalAmount: "$450",
      dueDate: "2023-10-03",
      overdueBy: "4 days",
      paymentStatus: "Paid",
      category: "Entertainment",
    },
  ]);

  const handleCheckboxChange = (billName) => {
    setSelectedBills((prevSelectedBills) =>
      prevSelectedBills.includes(billName)
        ? prevSelectedBills.filter((bill) => bill !== billName)
        : [...prevSelectedBills, billName]
    );
  };

  const handleSnooze = () => {
    if (selectedBills.length > 0) {
      const updatedData = dummyData.map((bill) => {
        if (
          selectedBills.includes(bill.billName) &&
          bill.paymentStatus !== "Paid"
        ) {
          return {
            ...bill,
            dueDate: snoozeDate.toISOString().split("T")[0],
            overdueBy: "0 days",
          };
        }
        return bill;
      });

      setDummyData(updatedData);
      setSelectedBills([]);
      alert("Bill successfully snoozed until " + snoozeDate.toDateString());
    } else {
      alert("Please select a bill to snooze.");
    }
  };

  const handleMarkPaid = () => {
    if (selectedBills.length > 0) {
      const updatedData = dummyData.map((bill) => {
        if (selectedBills.includes(bill.billName)) {
          return { ...bill, paymentStatus: "Paid", overdueBy: "0 days" };
        }
        return bill;
      });

      setDummyData(updatedData);
      setSelectedBills([]);
      alert("Bill(s) marked as paid!");
    } else {
      alert("Please select a bill to mark as paid.");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term
  };

  const filteredData = dummyData.filter((bill) =>
    bill.billName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="snooze-bill-page"
    >
      <Header />
      <div>
        <SnoozeHelper onSearch={handleSearch} />
      </div>

      <div className="table-container">
        <table className="bill-table">
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
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedBills.includes(data.billName)}
                      onChange={() => handleCheckboxChange(data.billName)}
                    />
                  </td>
                  <td>{data.billName}</td>
                  <td>{data.amountDue}</td>
                  <td>{data.totalAmount}</td>
                  <td>{data.dueDate}</td>
                  <td>{data.overdueBy}</td>
                  <td>{data.paymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Bill not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <div>
          <label>Snooze Until:</label>
          <DatePicker
            id="snooze-date"
            onChange={(date) => setSnoozeDate(date)} // Update based on the format of your custom DatePicker
          />
          <button onClick={handleSnooze} className="btn btn-warning">
            Snooze
          </button>
          <button onClick={handleMarkPaid} className="btn btn-success">
            Mark as Paid
          </button>
        </div>
      </div>

      <div className="menu-buttons">
        <Link to="/manageBills" className="btn btn-primary">
          Manage Bills
        </Link>
      </div>
    </motion.div>
  );
};

export default SnoozeOrMarkBillsPaid;
