import React from 'react'
import hero from '../assets/hero.svg'
import hero2 from '../assets/hero2.svg'
import { FaYoutube } from "react-icons/fa";
import card1 from '../assets/card1.svg';
import card2 from '../assets/card2.svg';
import card3 from '../assets/card3.svg';
import { IoCaretForwardSharp } from "react-icons/io5";
import aboutus from '../assets/aboutus1.svg';
import aboutus2 from '../assets/aboutus2.svg';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../index.css"

function Landing() {
  const navigate = useNavigate();
  const register =()=>{
    navigate("/register");
  }

  const company = useRef(null);
  const faq = useRef(null);
  const about = useRef(null);

  

  const scrollToSection = (section) => {
    if (section === "company") company.current?.scrollIntoView({ behavior: "smooth" });
    if (section === "faq") faq.current?.scrollIntoView({ behavior: "smooth" });
    if (section === "about") about.current?.scrollIntoView({ behavior: "smooth" });
  };




  
  return (<>
  <Navbar scrollToSection={scrollToSection}/>

    <div className="pt-[90px]">
      <img src={hero} className="w-full hidden object-cover lg:flex"/>
      <img src={hero2} className="w-full object-cover lg:hidden"/>

      <div className="absolute top-[100px]">
        <div className="px-[40px] py-[40px] lg:px-[100px] lg:py-[130px]">
      <div className="text-[30px] text-[white] font-bold w-[250px] lg:text-[60px] lg:w-[500px] font-saeada">Increase Your<br></br>Stall Sales</div>
      <div className="text-[white] text-[15px] font-sans">With MarketPod</div>
      <div className="mt-[20px] flex gap-x-[10px] lg:mt-[30px]">
        <button onClick={register} className="text-[white] border border-[#31603D] bg-[#31603D] px-[18px] py-[8px] rounded-[22px] text-[12px] lg:text-[17px] lg:py-[10px] font-sans">Register as a Vendor</button>
      <a href="https://wa.me/2347014131367" target="_blank" rel="noopener noreferrer"> <button className="text-[black] border border-[white] bg-[white] px-[27px] py-[8px] lg:px-[30px] rounded-[22px] text-[11px] flex items-center gap-x-[5px] font-semibold font-sans lg:text-[17px]">Learn More <FaWhatsapp className="size-[23px] text-[#25D366]"/></button></a>
      </div>
      </div>
      </div>

      <div>

      <section ref={company}>
      <div className="mt-[40px] mb-[30px] flex flex-col items-center px-[20px]">
        <div className="text-[#31603D] font-semibold">What is MarketPod ?</div>
        <div className="text-[22px] font-bold lg:text-[30px] font-saeada">Get your products discovered</div>
        <div className="items-center text-center lg:px-[100px] font-sans text-[16px] lg:text-[18px]">Our platform is a logistics and delivery service designed to help local market vendors in West Africa expand their reach and grow their businesses. By joining our network, vendors gain access to a wider customer base beyond the local market, allowing them to sell their fresh produce, pantry staples, and daily essentials to more people in their area. Our mission is to support local vendors by creating a reliable platform that connects them to customers who value fresh, local products but want the convenience of home delivery.</div>
      </div>
    </section>

    

    <div className="mt-[60px] flex flex-col justify-center">
      <div className="flex justify-center font-bold text-[22px] mb-[15px] font-saeada">How do i join the movement ?</div>
      {/* cards */}
      <div className="flex justify-center items-center flex-col lg:flex-row gap-[20px]">
        

<div className="max-w-sm bg-white border border-[#31603D] rounded-lg shadow h-[420px]">
        <img className="rounded-t-lg object-cover h-[200px]" src={card1} alt="" />

    <div className="flex flex-col justify-center items-center">
            <h5 className="mb-1 text-[22px] font-bold tracking-tight text-gray-900 text-[black] mt-[10px] font-saeada">Register as a Vendor</h5>
        <p className="mb-3 font-normal text-[black] px-[20px] text-center font-sans">Sign up on our platform by providing essential information about your business, including your contact details, product categories, and location. Our team will guide you through the registration process to ensure everything is set up correctly.</p>
        
    </div>
</div>

<div className="max-w-sm bg-white border border-[#31603D] rounded-lg shadow h-[420px]">
        <img className="rounded-t-lg object-cover h-[200px]" src={card2} alt="" />

    <div className="flex flex-col justify-center items-center">

            <h5 className="mb-1 text-[22px] font-bold tracking-tight text-gray-900 text-[black] mt-[10px] font-saeada">Recieve and Manage Orders</h5>

        <p className="mb-3 font-normal text-[black] px-[20px] text-center font-sans">Once approved, you’ll begin receiving orders. Gather and package the items promptly, ensuring accuracy and quality. Once the order is ready, coordinate with the delivery team for a smooth handoff.</p>
        
    </div>
</div>

<div className="max-w-sm bg-white border border-[#31603D] rounded-lg shadow h-[420px]">
        <img className="rounded-t-lg object-cover h-[200px]" src={card3} alt="" />

    <div className="flex flex-col justify-center items-center">
            <h5 className="mb-1 text-[22px] font-bold tracking-tight text-gray-900 text-[black] mt-[10px] font-saeada">Enjoy Your Digital Stall</h5>
        <p className="mb-3 font-normal text-[black] px-[20px] text-center font-sans">Our platform will handle the logistics and delivery, so all you need to do is prepare the items for pickup, and watch your business grow as you reach more customers.</p>
        
    </div>
</div>
</div>
</div>
      </div>
      
      <section ref={faq}>
      <div className="mt-[60px] mb-[30px]">
        <div className="flex justify-center text-[#31603D] font-semibold font-sans">You've got questions ? We've got answers</div>
        <div className="flex justify-center font-bold text-[22px] mb-[20px] lg:text-[25px] font-saeada">Frequently Asked Questions !</div>

        <div className="flex flex-col gap-[20px] lg:px-[110px]">

          <div className="flex">
            <div className="absolute left-[40px] lg:left-[140px] text-[#31603D]"><IoCaretForwardSharp className="size-[30px]"/></div>
            <div className="px-[70px]">
            <div className="font-bold text-[20px] lg:text-[20px] font-saeada">How do i register as a vendor on MarketPod ?</div>
            <div className="font-sans">Registering is easy! Just visit our vendor website and complete the registration form. Once submitted, our team will contact you to guide you through the onboarding process.</div>
            </div>
          </div>

          <div className="flex">
            <div className="absolute left-[40px] lg:left-[140px] text-[#31603D]"><IoCaretForwardSharp className="size-[30px]"/></div>
            <div className="px-[70px]">
            <div className="font-bold text-[20px] lg:text-[20px] font-saeada">What is the payout plan for vendors ?</div>
            <div className="font-sans">Vendors receive payment immediately after each completed transaction, making it easy to track your earnings and stay on top of your finances.</div>
            </div>
          </div>

          <div className="flex">
            <div className="absolute left-[40px] lg:left-[140px] text-[#31603D]"><IoCaretForwardSharp className="size-[30px]"/></div>
            <div className="px-[70px]">
            <div className="font-bold lg:text-[20px] font-saeada text-[20px]">Are there any fees attached to registration ?</div>
            <div className="font-sans">No, registration is completely free! There are no upfront fees to join our platform.</div>
            </div>
          </div>

        </div>
      </div>
      </section>

      <section ref={about}>
      <div className="flex flex-col lg:flex-row lg:items-center mb-[30px] lg:mr-[70px] lg:ml-[70px]">
        <div className="flex justify-center px-[20px] mb-[30px] lg:hidden"><img src={aboutus} className=""/></div>
        <div className="hidden flex justify-center px-[20px] mb-[30px] lg:flex size-[500%]"><img src={aboutus2} className=""/></div>
        <div className="flex flex-col px-[20px]">
          <div className="text-[#31603D] font-bold font-sans">Who we are ?</div>
          <div className="font-bold text-[25px] font-saeada">About Us</div>
          <div className="mt-[25px] font-sans text-[22px lg:text-[px] text-[16px] lg:text-[18px]">MarketPod is revolutionizing grocery shopping in Nigeria by bringing the freshest market produce and everyday essentials straight to your doorstep. We partner with trusted local markets to deliver the best in-season produce, pantry staples, and household goods, ensuring quality and affordability. With our efficient delivery network, we serve homes and businesses across major Nigerian cities, making it easier than ever to shop local without leaving your comfort zone. At MarketPod, we’re committed to connecting you to the markets you love with just a few taps on your phone.</div>
        </div>
      </div>
      </section>
    </div>
    
    <Footer/>
  </>)
}

export default Landing
