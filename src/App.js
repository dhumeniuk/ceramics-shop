import React, { useContext } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Only Girl In Town</Link>
          <a href="https://www.instagram.com/onlygirlintownstudio" target="_blank" rel="noopener noreferrer" className="nav-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: '24px', height: '24px', marginLeft: '10px' }} />
          </a>
          <Link className="btn btn-outline-primary" to="/checkout">Cart ({itemCount})</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;