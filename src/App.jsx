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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import FAQ from './pages/FAQ';
import ServiceCharge from './pages/ServiceCharge';
import AboutUs from './pages/AboutUs';
import StoreList from './pages/StoreList';
import ViewStore from './pages/ViewStore';

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/recoverpassword" element={<RecoverPassword/>}/>
        <Route path="/confirmemail" element={<ConfirmEmail/>}/>
        <Route path="/welcome" element={<Welcome/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
        <Route path="/termsofuse" element={<TermsOfUse/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/service" element={<ServiceCharge/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/site/getStore/:storeId" element={<ViewStore/>}/>
        <Route path="/site/getStores/:marketId/:marketName/:marketAddr" element={<StoreList/>}/>
        
      </Routes>
    </Router>
    </>
  )
}

export default App
