import React from 'react';
import produce from '../assets/Vector.svg';
import meat from '../assets/meat.svg';
import milk from '../assets/milk.svg';
import spice from '../assets/spice.svg';
import oil from '../assets/oil.svg';
import bread from '../assets/bread.svg';
import plastic from '../assets/plastic bottle.svg';
import laundry from '../assets/laundry.svg';
import beauty from '../assets/beauty.svg';
import toy from '../assets/toy.svg';
import stationery from '../assets/stationery.svg';
import Navbar from '../Components/Navbar';
import { RiSearchLine } from "react-icons/ri";



function LandingPage() {
  return (<>
  <Navbar/>
  <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">
  <div className="hidden h-[70px] flex flex-row px-[20px] lg:space-x-[100px] mt-[20px] justify-center items-center lg:flex">

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={produce} className="size-[20px]"/>
      <p className="text-[12px]">Produce</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={meat} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Meat & Seafood</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={milk} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Dairy & Eggs</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={spice} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Herbs & Spice</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={oil} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Oil & Vinegar</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={bread} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Beverage & Packed Foods</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={plastic} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Plasticware & Bags</p>
    </div>

    <div className="color-[grey] size-[18px] text-[grey] flex flex-col items-center">
      <img src={laundry} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Laundry</p>
    </div>

    <div className="color-[grey] size-[24px] text-[grey] flex flex-col items-center">
      <img src={beauty} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Health & Beauty</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={toy} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Baby & Kids</p>
    </div>

    <div className="color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={stationery} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Stationery</p>
    </div>

    </div>

    <div className="flex justify-center mt-[30px] lg:hidden">
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
  </>)
}

export default LandingPage
