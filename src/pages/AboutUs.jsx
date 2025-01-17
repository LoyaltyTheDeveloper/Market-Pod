import React from 'react'
import AboutImage from '../assets/Rectangle 4484.svg'
import AboutImage2 from '../assets/Rectangle 4540.svg'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function AboutUs() {
  return (<>
  <Navbar/>
  <div className="pt-[90px] min-h-screen bg-[#F9F9F9]">
    <div>
    <img src={AboutImage} className="w-full object-cover h-[250px] lg:h-[100%]"/>
    <div className="absolute text-[white] ml-[60px] mt-[-140px] lg:ml-[120px] lg:mt-[-250px]">
        <div className="font-bold text-[20px] lg:text-[30px] font-bitter">The Story Of Our Company</div>
        <div className="font-sans">About Us</div>
    </div>
    </div>

    <div className="pt-[10px] px-[5%] h-auto">
    <div className="bg-[white] mt-[30px] flex flex-col gap-y-[20px] p-[30px] rounded-[10px]">
      <div className="font-bold text-2xl font-bitter">About Us</div>
      <div className="font-sans">MarketPod is revolutionizing grocery shopping in Nigeria by bringing the freshest market produce and everyday essentials straight to your doorstep. We partner with trusted local markets to deliver the best in-season produce, pantry staples, and household goods, ensuring quality and affordability. With our efficient delivery network, we serve homes and businesses across major Nigerian cities, making it easier than ever to shop local without leaving your comfort zone. At MarketPod, we’re committed to connecting you to the markets you love with just a few taps on your phone.</div>
      <div className="font-bold text-2xl mt-[10px] font-bitter">Our Promise</div>
      <div className="font-sans">MarketPod is driven by a passion for convenience and quality: We deliver the freshest market produce and essential groceries. We create seamless shopping experiences that connect you to the heart of local markets. Our goal is to provide simple, reliable solutions that make everyday living easier and more enjoyable. You deserve access to the best your local markets have to offer, which is why our dedicated team and trusted partners are committed to bringing freshness and quality directly to your doorstep.</div>
    </div>
    </div>

    

    <div className="flex flex-row">
     <div className="px-[5%] h-auto pb-[30px]">
    <div className="mt-[30px] flex flex-row gap-x-[20px] bg-[#31603D] rounded-[10px]">
        <div><img src={AboutImage2} className="hidden lg:flex w-[800px] h-[250px] object-cover rounded-tl-[20px] rounded-bl-[20px]"/></div>
        <div className="flex flex-col gap-y-[10px] p-[20px] lg:pt-[60px]">
        <div className="font-bold text-2xl text-[white] font-bitter">Company Vision</div>
        <div className="text-[white] font-sans">To become West Africa’s leading platform for convenient and reliable access to fresh, high-quality groceries from local markets, empowering communities, supporting vendors, and transforming how people shop by bridging the gap between tradition and technology.</div>
        </div>
    </div>
    </div>
    </div>
  </div>
  <Footer/>
  </>)
}

export default AboutUs
