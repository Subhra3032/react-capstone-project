import "./App.css";
import HomePage from "./components/HomePage";
import ManageBills from "./components/ManageBills";
import AddBills from "./components/AddBills";
import backgroundImage from "./images/capstone-bg-img.jpg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BillsOverview from "./components/BillsOverview";
import OverdueUpcoming from "./components/OverdueUpcoming";
import PaymentPage from "./components/PaymentPage";
import "bootstrap/dist/css/bootstrap.css";
import OverdueBill from "./components/OverdueBill";
import UpcomingBill from "./components/UpcomingBill";
import BillDetailsPage from "./components/BillDetailsPage";
import SnoozeOrMarkBillsPaid from "./components/SnoozeOrMarkBillsPaid";
import ReminderSettings from "./components/ReminderSettings";
import Success from "./components/Success";
import Failure from "./components/Failure";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="App">
          {/* Global ToastContainer for displaying toast notifications */}
          <ToastContainer 
            position="bottom-right" // Customize the position
            autoClose={5000}     // Auto close after 5 seconds
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/manageBills" element={<ManageBills />} />
            <Route path="/manageBills/addBills" element={<AddBills />} />
            <Route
              path="/manageBills/billsOverview"
              element={<BillsOverview />}
            />
            <Route
              path="/manageBills/overdueUpcoming"
              element={<OverdueUpcoming />}
            />
            <Route path="/manageBills/overdue" element={<OverdueBill />} />
            <Route path="/manageBills/upcoming" element={<UpcomingBill />} />
            <Route path="/manageBills/payment" element={<PaymentPage />} />
            <Route
              path="/manageBills/snoozeOrMarkBillsPaid"
              element={<SnoozeOrMarkBillsPaid />}
            />
            <Route
              path="/manageBills/billsOverview/:category"
              element={<BillDetailsPage />}
            />
            <Route 
              path="/manageBills/reminderSettings"
              element={<ReminderSettings />}
            />
            <Route path="/bill/success" element={<Success />} />
            <Route path="/bill/failure" element={<Failure />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
