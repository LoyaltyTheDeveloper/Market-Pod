import React from 'react'
import { LiaTimesSolid } from "react-icons/lia";
import product from '../assets/Cart image.svg'
import { GoTrash } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from 'react';

function Cart() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  }
  const handleDecrease = () => {
    if(count < 1){
      return;
    }
    setCount(count - 1);
  } 
  return (<>
  <div className="bg-white z-50 fixed h-[50px] shadow-md overflow-x-hidden overflow-y-hidden w-full">

  <div className="flex items-center my-[10px] mx-[10px]">
  <div className="text-[20px] ml-[20px] text-[#31603D] font-semibold">Cart(0)</div>
  <div className="absolute right-5"><LiaTimesSolid className="size-[25px] text-[#31603D]"/></div>
  </div>

  </div>
  <div className="flex justify-center pt-[20px]">
  <div className="pt-[50px]">
    <div className="font-bold">Produce</div>
    <div className="flex">
      <div><img src={product} className="size-[90px]"/></div>
      <div className="flex flex-col gap-[10px]">
        <div>MAMA GOLD THAI RICE - 25KG</div>
        <div className="text-[grey] text-[15px]">Long grain rice (1 Bag)</div>
        <div className="flex items-center gap-[15px]">
         <div className="bg-[#31603D] rounded-[50%] p-[8px]"><GoTrash className="size-[ text-[white]"/></div>
         <div className="flex gap-x-[22px] items-center border border-[#31603D] rounded-[20px] px-[10px]">
          <div onClick={handleDecrease}className="text"><FaMinus className="size-[12px]"/></div>
          <div className="text-[18px]">{count}</div>
          <div onClick={handleIncrease}className="text"><FaPlus className="size-[12px]"/></div>
         </div>
         <div className="font-semibold ml-[25px] text-[15px] whitespace-nowrap">NGN 32500</div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div className="pt-[300px] flex justify-center">
    <button className="text-[white] bg-[#31603D] py-[8px] px-[100px] border border-[#31603D] rounded-[20px]">Proceed to Checkout</button>
  </div>

  
  </>)
}

export default Cart
