import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './screens/Home';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Login from './screens/Login';
import Profilescreen from './screens/Profilescreen';
import Welcome from './components/Welcome';
import Adminscreen from './screens/Adminscreen';

const App = () => {
  // Custom hook to get the current location
  const location = useLocation();

  // Define routes where Navbar should not be visible
  const noNavbarRoutes = ['/', '/login', '/register'];

  return (
    <div>
      {/* Show Navbar only if the current route is not in noNavbarRoutes */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profilescreen />} />
        <Route path="/admin" element={<Adminscreen />} />
      </Routes>
    </div>
  );
};

// Wrap App in BrowserRouter to provide routing context
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
