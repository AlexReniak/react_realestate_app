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
import EditProperty from './pages/EditProperty';
import Contact from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <Route path='/properties/:filterType?' element={<Properties />}></Route>
          <Route path='/property/:propertyId' element={<Property />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/create' element={<PrivateRoute />}>
            <Route path='/create' element={<CreateProperty />} />
          </Route>
          <Route path="/edit/:id" element={<PrivateRoute />}>
            <Route path='/edit/:id' element={<EditProperty />} />
          </Route>
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
