import { useState } from "react"; 
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Register from "./Pages/Register";
import { Toaster } from 'react-hot-toast';
import AboutUs from "./Pages/AboutUs";
import FAQ from "./Pages/FAQ";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfUse from "./Pages/TermsOfUse";


function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
            <Route path="/termsofuse" element={<TermsOfUse/>}/>
          </Routes>
          <Toaster position="top-center" className="flex justify-center items-center" reverseOrder={false} />
      </Router>
    </>
  );
}

export default App;
