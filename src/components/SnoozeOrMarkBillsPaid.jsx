import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./SnoozeOrMarkBillsPaid.css";
import SnoozeHelper from "./SnoozeHelper";
import Header from "./Header";

const SnoozeOrMarkBillsPaid = () => {
  const [selectedBills, setSelectedBills] = useState([]);
  const [snoozeDate, setSnoozeDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [billsData, setBillsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const billsPerPage = 4; // Number of bills to display per page

  // Fetching data using fetch instead of axios
  useEffect(() => {
    fetch("http://localhost:8080/bill/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const today = new Date();

        // Calculate overdue days for each bill
        const updatedData = data.map((bill) => {
          if (bill.paymentStatus.toLowerCase() === "paid") {
            return {
              ...bill,
              overdueBy: "0 days",
              amountDue: bill.amount, // Assuming 'amount' is the amount due
              totalAmount: bill.amount, // If the bill is paid, set overdueBy to "0 days"
            };
          } else {
            const dueDate = new Date(bill.dueDate);
            const timeDifference = today - dueDate; // difference in milliseconds
            const overdueDays = Math.floor(
              timeDifference / (1000 * 60 * 60 * 24)
            ); // convert to days
            return {
              ...bill,
              overdueBy: overdueDays > 0 ? `${overdueDays} days` : "0 days",
              amountDue: bill.amount, // Assuming 'amount' is the amount due
              totalAmount: bill.amount, // update the overdueBy field
            };
          }
        });

        setBillsData(updatedData);
        console.log("Received and updated data:", updatedData[0]);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  }, []);

  const handleCheckboxChange = (billName) => {
    setSelectedBills(
      (prevSelectedBills) =>
        prevSelectedBills.includes(billName) ? [] : [billName] // Update selection logic to allow only one checked bill
    );
  };

  const handleSnooze = () => {
    if (selectedBills.length > 0) {
      const billToSnooze = billsData.find(
        (bill) =>
          selectedBills.includes(bill.billName) && bill.paymentStatus !== "paid"
      );

      if (billToSnooze) {
        const billData = {
          billId: billToSnooze.billId,
          billName: billToSnooze.billName,
          billCategory: billToSnooze.billCategory,
          dueDate: snoozeDate.toISOString().split("T")[0],
          amount: billToSnooze.amount,
          reminderFrequency: billToSnooze.reminderFrequency,
          attachment: billToSnooze.attachment,
          notes: billToSnooze.notes,
          isRecurring: billToSnooze.isRecurring,
          paymentStatus: billToSnooze.paymentStatus,
        };

        fetch(
          `http://localhost:8080/bill/snooze?newDate=${
            snoozeDate.toISOString().split("T")[0]
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(billData),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const updatedData = billsData.map((bill) => {
              if (bill.billId === billToSnooze.billId) {
                return {
                  ...bill,
                  dueDate: snoozeDate.toISOString().split("T")[0],
                  overdueBy: "0 days",
                };
              }
              return bill;
            });
            setBillsData(updatedData);
            setSelectedBills([]);
            alert(
              "Bill successfully snoozed until " + snoozeDate.toDateString()
            );
          })
          .catch((error) => {
            console.error("Error snoozing bill:", error);
            alert("There was an error snoozing the bill.");
          });
      }
    } else {
      alert("Please select a bill to snooze.");
    }
  };

  const handleMarkPaid = () => {
    if (selectedBills.length === 1) {
      const billToUpdate = billsData.find((bill) =>
        selectedBills.includes(bill.billName)
      );

      const billPayload = {
        billId: billToUpdate.billId,
        billName: billToUpdate.billName,
        billCategory: billToUpdate.billCategory,
        dueDate: billToUpdate.dueDate,
        amount: billToUpdate.amount,
        reminderFrequency: billToUpdate.reminderFrequency,
        attachment: billToUpdate.attachment,
        notes: billToUpdate.notes,
        isRecurring: billToUpdate.isRecurring,
        paymentStatus: "paid",
      };

      fetch("http://localhost:8080/bill/markAsPaid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billPayload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const updatedData = billsData.map((bill) => {
            if (bill.billId === billToUpdate.billId) {
              return { ...bill, paymentStatus: "paid", overdueBy: "0 days" };
            }
            return bill;
          });
          console.log("Payload to send:", JSON.stringify(billPayload));
          setBillsData(updatedData);
          setSelectedBills([]);
          alert("Bill marked as paid!");
        })
        .catch((error) => {
          console.error("Error marking bill as paid:", error);
          alert("There was an error marking the bill as paid.");
        });
    } else {
      alert("Please select exactly one bill to mark as paid.");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term
  };

  // const filteredData = billsData.filter((bill) =>
  //   bill.billName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter bills based on both search term and category
  const filteredData = billsData.filter((bill) => {
    const matchesSearchTerm = bill.billName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || bill.billCategory === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  // Pagination logic
  const indexOfLastBill = currentPage * billsPerPage; // Get index of last bill on current page
  const indexOfFirstBill = indexOfLastBill - billsPerPage; // Get index of first bill on current page
  const currentBills = filteredData.slice(indexOfFirstBill, indexOfLastBill); // Bills for current page

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / billsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="snooze-bill-page"
    >
      <Header />
      <div>
        <SnoozeHelper
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="table-container">
        <table className="bill-table">
          <thead>
            <tr>
              <th></th>
              <th>Bill Name</th>
              <th>Amount Due in Rs</th>
              <th>Total Amount in Rs</th>
              <th>Due Date</th>
              <th>Overdue By</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBills.length > 0 ? (
              currentBills.map((data, index) => (
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
                <td colSpan="7">No bills found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="action-buttons">
        <div>
          <label>Snooze Until:</label>
          <input
            type="date"
            id="snooze-date"
            className="date-picker"
            onChange={(e) => setSnoozeDate(new Date(e.target.value))} // Update state with the selected date
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
