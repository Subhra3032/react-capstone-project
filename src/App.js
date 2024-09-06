import './App.css';
import HomePage from './components/HomePage';
import ManageBills from './components/ManageBills';
import backgroundImage from './images/capstone-bg-img.jpg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <AnimatePresence mode='wait'>
        <div className="App">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/manageBills' element={<ManageBills />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
