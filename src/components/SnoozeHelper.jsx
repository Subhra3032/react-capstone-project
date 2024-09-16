import { useState } from "react";
import "./SnoozeHelper.css";

const SnoozeHelper = ({ onSearch }) => {
  const [billName, setBillName] = useState("");

  const handleSearchChange = (event) => {
    setBillName(event.target.value);
    onSearch(event.target.value); // Call the function passed from the parent to update the search term
  };

  return (
    <div className="search-component">
      <div className="filter">
        <label htmlFor="bill-category">Bill Category:</label>
        <select
          id="bill-category"
          name="bill-category"
          className="custom-dropdown"
        >
          <option value="House Rent">House Rent</option>
          <option value="Debt Payments">Debt Payments</option>
          <option value="Groceries">Groceries</option>
          <option value="Internet Charges">Internet Charges</option>
          <option value="Cellphone Charges">Cellphone Charges</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="bill-name">Bill Name:</label>
        <input
          type="text"
          id="bill-name"
          name="bill-name"
          className="custom-input"
          value={billName}
          onChange={handleSearchChange} // Handle input changes
        />
      </div>
    </div>
  );
};

export default SnoozeHelper;
