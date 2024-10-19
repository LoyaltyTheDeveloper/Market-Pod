import React from 'react'
import { RiHome2Line } from "react-icons/ri";
import { LuClock5 } from "react-icons/lu";
import Navbar from "../Components/Navbar";
import marketData from '../index.json';

function StoreList() {
  return (<>
  <Navbar/>
  <div className="pt-[100px] min-h-screen bg-[#F9F9F9] overflow-x-hidden">
    <div className="flex flex-row gap-x-[60px] items-center pl-[20px] lg:pl-[40px] pt-[40px]">
        <div className="flex flex-col">
        <div className="font-bold text-[25px] lg:text-[30px]">Yoruba Road</div>
        <div className="w-[270px] lg:w-[100%] md:w-[100%] flex flex-wrap">No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.</div>
        </div>
        <div className="flex absolute right-[40px] hidden items-center gap-x-[5px] border border-[#31603D] p-[2px] px-[6px] pl-[10px] pr-[10px] rounded-[20px] lg:flex text-[#31603D]">
            <div><RiHome2Line/></div>
            <div>Home</div>
       </div>
    </div>

    <div className="mt-[5px] pt-[20px] flex justify-center">

   <div className="flex flex-col gap-[20px] lg:flex-row flex-wrap justify-center">
    {marketData.shops.map((market) => (
        <div key={market.id} className="flex flex-col bg-[white] shadow-md border border-[transparent] w-[380px] lg:w-[310px] h-[auto] rounded-[10px]">
            <div><img src={market.image} className="w-[full] object-cover rounded-tl-[10px] rounded-tr-[10px]"/></div>
            <div className="pt-[5px] pl-[15px] flex flex-col gap-y-[10px]">
                <div className="text-[19px] font-bold whitespace-nowrap">{market.name}</div>
                <div className="flex items-center gap-x-[5px] text-[#31603D]">
                    <div><LuClock5/></div>
                    <div className="text-[15px]">Opens {market.opentime} - Closes {market.closetime}</div>
                </div>
               <div className="flex flex-wrap items-center mb-[15px]">
                {market.categories.map((category, index) => (
              <div className="flex items-center" key={index}>{category}{index < market.categories.length - 1 && <div className="h-[20px] ml-[10px] mr-[10px] border-l border-gray-300 lg:flex justify-between"></div>}</div> 
            ))}
            </div>
            </div>
        </div>
        ))}
</div>
    </div>
  </div>
  </>)
}

export default StoreList
