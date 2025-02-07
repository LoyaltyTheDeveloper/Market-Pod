import React from 'react'
import pod2 from '../assets/Podlogo2.svg';
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { LiaFacebook } from "react-icons/lia";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { RiTiktokLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Footer() {
  return (<>
    <div className="flex flex-col lg:flex-row">
        <div className="size-[200px] lg:size-[500px] ml-[-10px]">
            <img src={pod2} />
        </div>
        <div className="flex gap-[60px] flex-wrap ml-[40px] lg:ml-auto lg:mr-[40px] mt-[-70px] lg:mt-[40px]">
            <div className="flex flex-col gap-[20px] font-sans">
                <h1 className="text-[20px] font-bold">Market Pod</h1>
                <a href="/aboutus">About Us</a>
                <a href="/">Shop Groceries</a>
                <a href="/register">Register as Vendor</a>
            </div>
            <div className="flex flex-col gap-[20px] font-sans">
                <h1 className="text-[20px] font-bold">Legal</h1>
                <a href="/privacypolicy"><p>Privacy Policy</p></a>
                <p><a href="/termsofuse">Terms of Use</a></p>
            </div>
            <div className="flex flex-col gap-[20px] font-sans">
                <h1 className="text-[20px] font-bold">Get Help</h1>
                <a href="/faq"><p>FAQ</p></a>
                <a href="https://wa.me/2347014131367" target="_blank" rel="noopener noreferrer"><p>Chat</p></a>
                <a href="mailto:support@emarketpod.com" target="_blank" rel="noopener noreferrer"><p>Email</p></a>
            </div>
            <div className="flex flex-col gap-[20px] font-sans">
                <h1 className="text-[20px] font-bold">Follow Our Socials</h1>
                <div className="flex gap-[5px] items-center"><FaWhatsapp className="size-[20px]"/><a href='https://wa.me/2347014131367' target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
                <div className="flex gap-[5px] items-center"><FaInstagram className="size-[20px]" /><a href='https://www.instagram.com/emarket_pod?igsh=MW13czZrbjdwMTA5bA==' target="_blank" rel="noopener noreferrer">Instagram</a></div>
                <div className="flex gap-[5px] items-center"><LiaFacebook className="size-[20px]"/><a href=''>FaceBook</a></div>
                <div className="flex gap-[5px] items-center"><AiOutlineYoutube className="size-[20px]"/><a href=''>YouTube</a></div>
                <div className="flex gap-[5px] items-center"><RiTwitterXLine className="size-[20px]"/><a href='https://twitter.com/eMarket_Pod?t=XOcBPbA75uA44OTonxOnJQ&s=08' target="_blank" rel="noopener noreferrer">Twitter</a></div>
                <div className="flex gap-[5px] items-center"><RiTiktokLine className="size-[20px]"/>< a href='https://vm.tiktok.com/ZMkgFTrxT/' target="_blank" rel="noopener noreferrer">Tiktok</a></div>
            </div>
        </div>
    </div>
    <div className="flex mt-[100px] lg:mt-[-100px] items-center justify-center my-3">
      <hr className="w-[45%] border-t border-gray-300" />
      <hr className="w-[45%] border-t border-gray-300" />
    </div>
    <div className="flex justify-center mb-[20px] font-sans">
      © 2024 Market Pod, All Rights Reserved.
      </div>
  </>)
}

export default Footer
