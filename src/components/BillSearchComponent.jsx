import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BillSearchComponent.css";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import DatePicker from "react-datepicker"; // Make sure to install react-datepicker
import "react-datepicker/dist/react-datepicker.css";

const BillSearchComponent = (props) => {
  const [filter, setFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Filter by Date</Popover.Header>
      <Popover.Body>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          isClearable
          inline
          placeholderText="Select a date"
        />
      </Popover.Body>
    </Popover>
  );

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
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <OverlayTrigger
          trigger="click"
          placement="bottom-end"
          overlay={popover}
        >
          <FontAwesomeIcon
            icon={faFilter}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginTop: "1rem",
            }}
            size="xl"
          />
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default BillSearchComponent;
