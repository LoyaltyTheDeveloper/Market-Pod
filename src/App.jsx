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
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scroll from './Components/Scroll';
import Search from './pages/Search';

function App() {

  return (
    <>
    <Router>
      <Scroll/>
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
        <Route path="/productdetail" element={<ProductDetail/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/site/getStores/:marketId/:marketName/:marketAddr" element={<StoreList/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
      <ToastContainer />
    </Router>
    </>
  )
}

export default App
