import React from 'react';
import './App.css';
import OfferForm from './components/OfferForm';
import OfferList from './components/OfferList'; // Import the OfferList component
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<OfferForm />} />
          <Route path="/offers" element={<OfferList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
