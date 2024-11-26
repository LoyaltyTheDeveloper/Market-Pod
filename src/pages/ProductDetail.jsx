import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { RiSearchLine } from "react-icons/ri";
import pod from '../assets/Podlogo.svg';

function ProductDetail() {
  return (<>
  <Navbar/>
    <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">

    <div className="flex mt-[130px] justify-center">
      <div className="flex justify-center lg:hidden">
    <div className="flex flex-row items-center">
         <RiSearchLine className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[white] focus:outline-none text-[13px]"
          placeholder="Search Markets, Shops, Products..."
      />
         </div>
    </div>
    </div>

    <div className="px-[20px] mt-[20px]">
    <div className="flex gap-[10px] text-[15px]">
        <div>Happiness Goods & Stores</div>
        /
        <div className="font-semibold">Produce</div>
    </div>

    <div className="lg:flex flex-row-reverse gap-[100px] lg:items-center">
    <div><img className="object-cover w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] lg:mr-[500px]" src={pod}></img></div>
    
    <div className="lg:pr-[200p]">
    <div className="flex flex-col gap-[10px]">
       <div className="font-bold text-[20px] w-[200px] lg:text-[35px] lg:w-[300px]">MAMA GOLD THAI RICE - 25kg</div>
       <div>Long grain rice (1 Bag)</div>
       <div className="">Mama Gold is a premium rice brand in Nigeria, known for its high-quality, long-grain rice. It is popular for its consistency in delivering clean, well-polished grains that cook easily, resulting in fluffy and non-sticky rice. Whether used for traditional dishes or modern recipes.</div>
    </div>

    <div className="flex flex-col gap-[20px]">
    <div className="text-[20px] font-semibold mt-[40px]">NGN 32,500</div>
    <div className="flex gap-[10px]">
        <button><div className="text-[#31603D] text-[10px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[12px] lg:px-[10px] lg:px-[50px]">Buy Now</div></button>
        <div>
        <button><div className="text-[white] bg-[#31603D] text-[10px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[12px] lg:px-[10px] lg:px-[50px] flex gap-[5px] items-center">Add To Cart <div className="hidden lg:flex lg:text-[px]">+</div></div></button>
        </div>
    </div>
    </div>
    </div>
    </div>

<div className="flex justify-center">
    <div className="flex flex-col text-[white] px-[30px] py-[20px] gap-[10px] mt-[30px] bg-[#31603D] border border-[#31603D] rounded-[8px] w-[95%]">
        <div className="text-[20px] font-bold">Share the experience</div>
        <div>Invite friends sha</div>
        <div className="underline">Copy Link</div>
    </div>
    </div>

    </div>
    </div>
    <Footer/>
 </> )
}

export default ProductDetail
