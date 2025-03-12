import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function ServiceCharge() {
  return (<>
  <Navbar/>
  <div className="min-h-screen bg-[#F9F9F9]">
    <div className="pt-[120px] px-[5%] h-auto pb-[100px]">
    <div className="bg-[white] mt-[30px] flex flex-col gap-y-[20px] p-[30px] rounded-[10px]">
      <div className="font-bold text-2xl font-saeada">Service Charge</div>

      <div className="flex flex-col font-sans">
      <div className="font-bold">What is a Service Charge and Why Do We Charge It?</div>
      <div className="text-[15px]">At MarketPod, we pride ourselves on creating a seamless and reliable way for you to access fresh groceries and everyday essentials from trusted local markets. Behind the scenes, a lot goes into making this experience smooth, efficient, and enjoyable. To support these efforts, we include a small service charge in every order.</div>
    </div>

      <div className="flex flex-col font-sans">
      <div className="font-bold">What is a Service Charge?</div>
      <div className="text-[15px]">A service charge is a nominal fee added to your order to help cover the operational and logistical costs associated with running our platform. It’s an essential part of how we maintain the high-quality service you’ve come to expect from MarketPod.</div>
    </div>
   
    <div className="flex flex-col font-sans">
      <div className="font-bold">Why do we Charge it?</div>
      <div className="text-[15px]">
      We understand that transparency is important, so let us walk you through why this charge is necessary:<br></br>
1. Operational Excellence. <br></br>
<div className="pl-4">Running a platform like MarketPod involves various behind-the-scenes processes, from maintaining our app and website to ensuring secure payment systems and smooth user experiences. The service charge helps us keep these systems up-to-date and efficient so you can enjoy hassle-free shopping.</div>
2. Maintaining Quality Standards <br></br>
<div className="pl-4">From quality checks on products to ensuring proper packaging, we work tirelessly to guarantee that every item you receive meets our high standards. The service charge contributes to maintaining these rigorous processes.</div>
3. Supporting Innovation and Growth <br></br>
<div className="pl-4">It helps us add more features, expand into new locations, and bring more vendors on board to give you a broader range of products.</div>
      </div>
    </div>


    <div className="flex flex-col font-sans">
      <div className="font-bold">How does It Benefit You?</div>
      <div className="text-[15px]">Think of the service charge as a small investment in the convenience, quality, and reliability that MarketPod offers. With this fee, you’re not just paying for groceries you’re paying for the time saved, the stress avoided, and the confidence of knowing your orders are in good hands.<br></br>
Building a Sustainable Ecosystem<br></br>
Your support through this charge doesn’t just benefit you. It creates a ripple effect by empowering local vendors, supporting delivery partners, and sustaining a system that works for everyone involved.<br></br>
We are committed to keeping this fee as minimal as possible while continuing to deliver the exceptional service you deserve. Your trust and understanding mean the world to us, and we’re always here to answer any questions you may have.<br></br>
Thank you for letting us bring the best of your local markets to your home!</div>
    </div>



    </div>
    </div>
  </div>
  <Footer/>
  </>)
}

export default ServiceCharge
