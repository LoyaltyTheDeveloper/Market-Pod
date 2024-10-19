import React from 'react'
import pod2 from '../assets/Podlogo2.svg';
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { LiaFacebook } from "react-icons/lia";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Footer() {
  return (<>
    <div className="flex flex-col lg:flex-row">
        <div className="size-[200px] lg:size-[500px] ml-[-10px]">
            <img src={pod2} />
        </div>
        <div className="flex gap-[60px] flex-wrap ml-[40px] lg:ml-auto lg:mr-[40px] mt-[-70px] lg:mt-[40px]">
            <div className="flex flex-col gap-[20px]">
                <h1 className="text-[20px] font-bold">Market Pod</h1>
                <Link to="/aboutus"><p>About Us</p></Link>
            </div>
            <div className="flex flex-col gap-[20px]">
                <h1 className="text-[20px] font-bold">Legal</h1>
                <Link to="/privacypolicy"><p>Privacy Policy</p></Link>
                <p>Terms of Use</p>
            </div>
            <div className="flex flex-col gap-[20px]">
                <h1 className="text-[20px] font-bold">Get Help</h1>
                <Link to="/faq"><p>FAQ</p></Link>
                <Link to="/"><p>Chat</p></Link>
                <Link to="/"><p>Email</p></Link>
            </div>
            <div className="flex flex-col gap-[20px]">
                <h1 className="text-[20px] font-bold">Follow Our Socials</h1>
                <div className="flex gap-[5px] items-center"><FaWhatsapp className="size-[20px]"/><div>WhatsApp</div></div>
                <div className="flex gap-[5px] items-center"><FaInstagram className="size-[20px]" /><div>Instagram</div></div>
                <div className="flex gap-[5px] items-center"><LiaFacebook className="size-[20px]"/><div>FaceBook</div></div>
                <div className="flex gap-[5px] items-center"><AiOutlineYoutube className="size-[20px]"/><div>YouTube</div></div>
                <div className="flex gap-[5px] items-center"><RiTwitterXLine className="size-[20px]"/><div>Twitter</div></div>
            </div>
        </div>
    </div>
    <div className="flex mt-[100px] lg:mt-[-100px] items-center justify-center my-3">
      <hr className="w-[45%] border-t border-gray-300" />
      <hr className="w-[45%] border-t border-gray-300" />
    </div>
    <div className="flex justify-center mb-[20px]">
      © 2024 Market Pod, All Rights Reserved.
      </div>
  </>)
}

export default Footer
