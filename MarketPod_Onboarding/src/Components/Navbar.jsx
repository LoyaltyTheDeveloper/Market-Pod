import React from 'react'
import pod from '../assets/Podlogo.svg';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function Navbar({ scrollToSection }) {
  const navigate = useNavigate();

  return (<>
   <nav className="bg-white z-50 fixed shadow-md overflow-x-hidden overflow-y-hidden w-full">
    <div className="mx-auto py-[13px] my-auto">
        <div className="flex h-[70px] items-center justify-center">
            <div className="flex items-center justify-center">

            
            <div className="absolute left-6 ml-[-20px] flex justify-center lg:ml-[-10px]">
              <a href='/'>
             <img src={pod} className="size-[150px]"/>
             </a>
           </div>
          

           <div className="hidden text-[18px] lg:flex lg:gap-x-[40px] font-bold font-saeada">
           <Link to="/register"><div className="flex">Register</div></Link>
           <div className="flex cursor-pointer" onClick={() => scrollToSection("company")}>Company</div>
           <div className="flex cursor-pointer" onClick={() => scrollToSection("faq")}>FAQ</div>
           <div className="flex cursor-pointer" onClick={() => scrollToSection("about")}>About</div>
           </div>

          <div className="flex px-[15px] rounded-[25px] py-[10px] text-[white] bg-[#31603D] items-center absolute right-6">
            <button className="text-[12px] lg:text-[15px]">Shop Groceries</button>
          </div>
            </div>
        </div>
    </div>
   </nav>
  </>)
}

export default Navbar
