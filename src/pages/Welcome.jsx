import React from 'react'
import pod from '../assets/Podlogo.svg';
import basket from '../assets/basket.svg';
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { LiaFacebook } from "react-icons/lia";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";

function Welcome() {
  return (<>
  <div className="">
  <div className="flex justify-center">
        <img src={pod}/>
    </div>

    <div className="text-center px-[10%] mb-[10px] lg:px-[27%]">
        <div className="bg-[] text-center rounded-[5px] py-[30px]">
    <div className="flex justify-center font-bold text-2xl">
       Welcome to MarketPod
    </div>
    <div className="flex justify-center">
    We are delighted to have you here with us !
    </div>
    </div>
    </div>

    <div className=" px-[10%] lg:px-[27%]">
        <div className="bg-[] rounded-[5px] py-[30px] lg:text-[19px]">
          <div className="px-[5%]">
          <div>
          We’re thrilled to have you as part of our community. Get ready to experience a new, convenient way to shop for fresh groceries from your favorite local markets all at the tap of a button.
          </div>
          <br></br>
          <div>
          If you ever need help, don’t hesitate to reach out to our support team at <span className="text-[#31603D] underline"><i>Support@emarketpod.com</i></span> We’re here to make sure your experience is nothing short of amazing.
          </div>
          <br></br>
          <div>
          Thank you for choosing MarketPod happy shopping!
          </div>
          <br></br>
          <div className="flex flex-row">
            <div>
            <div>Best Regards,</div>
            <div>The MarketPod Team</div>
            </div>
            <div className="ml-auto">
              <img src={basket}/>
            </div>
          </div>
          </div>
    </div>
    </div>
    <div className="flex justify-center mt-[20px] mb-[20px] gap-[20px] lg:gap-[25px]">
      <FaWhatsapp className="size-[25px]"/>
      <FaInstagram className="size-[25px]" />
      <LiaFacebook className="size-[25px]"/>
      <AiOutlineYoutube className="size-[25px]"/>
      <RiTwitterXLine className="size-[25px]"/>
    </div>
</div>
  </>)
}

export default Welcome
