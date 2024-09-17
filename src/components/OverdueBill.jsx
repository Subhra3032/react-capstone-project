import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./OverdueBill.css";
import BillSearchComponent from "./BillSearchComponent";
import Header from "./Header";

const OverdueBill = () => {
  const [list, setList] = useState([]);

  const handleListChange=(list)=>{
    setList(list);
  }
  
  useEffect(() => {
    try {
      fetch("http://localhost:8085/bill/overdue").then((response) => {
        return response.json();
      }).then((data) => {
        setList(data);
      });
    }
    catch (error) {
      console.log(error);
    }
},[])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overdue-bill-page"
    >
      <Header />
      <div>
        <BillSearchComponent handleListChange={handleListChange} list={list} />
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
            {list.map((data, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    // checked={selectedCategories.includes(data.category)}
                    // onChange={() => handleCheckboxChange(data.category)}
                  />
                </td>
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
