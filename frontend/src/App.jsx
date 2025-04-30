
import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Barber1';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Barber from './pages/Barber';


const App = () => {
  return (
    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-screen overflow-y-scroll">
      <ToastContainer />
      <div className="mx-4 sm:mx-[1%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barber" element={<Barber />} />
          <Route path="/saloons" element={<Doctors />} />

          <Route path="/saloons/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/verify" element={<Verify />} />
          
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;

