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
        <div className="font-bold text-[20px]">The Story Of Our Company</div>
        <div>About Us</div>
    </div>
    </div>

    <div className="pt-[10px] px-[5%] h-auto">
    <div className="bg-[white] mt-[30px] flex flex-col gap-y-[20px] p-[30px] rounded-[10px]">
      <div className="font-bold text-2xl">Privacy Policy</div>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
    </div>
    </div>

    <div className="flex flex-row">
     <div className="px-[5%] h-auto pb-[30px]">
    <div className="mt-[30px] flex flex-row gap-x-[20px] bg-[#31603D] rounded-[10px]">
        <div><img src={AboutImage2} className="hidden lg:flex w-[800px] h-[250px] object-cover rounded-tl-[20px] rounded-bl-[20px]"/></div>
        <div className="flex flex-col gap-y-[10px] p-[20px] lg:pt-[60px]">
        <div className="font-bold text-2xl text-[white]">Our Vision</div>
        <div className="text-[white]">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.</div>
        </div>
    </div>
    </div>
    </div>
  </div>
  <Footer/>
  </>)
}

export default AboutUs
