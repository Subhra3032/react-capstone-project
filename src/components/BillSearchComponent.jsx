import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BillSearchComponent.css";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import DatePicker from "react-datepicker"; // Make sure to install react-datepicker
import "react-datepicker/dist/react-datepicker.css";

const BillSearchComponent = ({handleListChange,list}) => {
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState("all");

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  }
  const handleName = (event) => {
    setName(event.target.value);
  }


  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Filter by Date</Popover.Header>
      <Popover.Body>
        <DatePicker
          selected={selectedDate}
          onChange={handleDate}
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
          onClick={handleCategory}
        >
          <option value="utilities">Utilities</option>
          <option value="subscription">Subscription</option>
          <option value="rent">Rent</option>
          <option value="others">Others</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="bill-name">Bill Name:</label>
        <input
          type="text"
          id="bill-name"
          name="bill-name"
          className="custom-input"
          value={name}
          onChange={handleName}
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
