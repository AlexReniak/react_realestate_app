import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Property from './pages/Property';
import Navbar from './components/Navbar';
import CreateProperty from './pages/CreateProperty';
import Contact from './pages/Contact';
import 'swiper/css';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/properties' element={<Properties />}></Route>
          <Route path='/property/:propertyId' element={<Property />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/create' element={<CreateProperty />} />
          {/* Dashboard will be protected routes for authenticated users only */}
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
