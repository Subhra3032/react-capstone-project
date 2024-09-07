import "./App.css";
import HomePage from "./components/HomePage";
import ManageBills from "./components/ManageBills";
import AddBills from "./components/AddBills";
import backgroundImage from "./images/capstone-bg-img.jpg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BillsOverview from "./components/BillsOverview";
import OverdueUpcoming from "./components/OverdueUpcoming";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="App">
          <Routes>
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
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
