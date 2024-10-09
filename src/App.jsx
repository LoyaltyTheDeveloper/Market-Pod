import { useState } from 'react'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecoverPassword from './pages/RecoverPassword';
import ConfirmEmail from './pages/ConfirmEmail';
import Welcome from './pages/Welcome';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path="/landing" element={<LandingPage/>}/>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/recoverpassword" element={<RecoverPassword/>}/>
        <Route path="/confirmemail" element={<ConfirmEmail/>}/>
        <Route path="/welcome" element={<Welcome/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
