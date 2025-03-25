import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { IoCaretForwardSharp } from "react-icons/io5";

function FAQ() {
  return (<>
  <Navbar/>
  <div className="min-h-screen bg-[#F9F9F9]">
    <div className="pt-[120px] px-[5%] h-auto pb-[100px]">
    <div className="bg-[white] mt-[30px] flex flex-col gap-y-[20px] p-[30px] rounded-[10px]">
      <div className="flex flex-col justify-center gap-y-[10px]">
        <div className="font-bold flex justify-center text-2xl lg:text-3xl font-saeada">Frequently Asked Questions !</div>
        <div className="flex justify-center font-sans">You've got questions ? We've got answers</div>
        </div>

        <div className="p-[20px] flex flex-col gap-y-[20px]">
        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">What is MarketPod ?</div>
          <div className="font-sans">Marketpod is an online logistics platform that connects vendors (Local market sellers) with consumers who want to purchase fresh market produce. The website allows for easy and convenient ordering and delivery of market goods.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">How MarketPod Works?</div>
          <div className="font-sans">MarketPod connects you to your favorite local markets, making it easy to shop for fresh groceries and everyday essentials from the comfort of your home.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">Is there a delivery fee ?</div>
          <div className="font-sans">Yes, a nominal delivery fee applies based on your location and the size of your order. The fee will be displayed during the checkout process.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">What type of products can I order on Marketpod ?</div>
          <div className="font-sans">You can order a variety of fresh produce such as vegetables, fruits, grains, meats, and other market staples from local vendors.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">Can I cancel or modify my order ?</div>
          <div className="font-sans">Yes, you can modify or cancel your order within a certain time frame before it is processed for delivery. Visit your order history or contact customer support for assistance.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">How do I contact customer support ?</div>
          <div className="font-sans">You can reach out to Marketpod’s support team through the 'Contact Us' section on the website or via email and phone for any assistance or inquiries.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">Is Marketpod available in all locations ?</div>
          <div className="font-sans">Marketpod currently operates within select regions. You can check the availability of delivery services in your area on the website.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">How do I register as a vendor on MarketPod ?</div>
          <div className="font-sans">Registering is easy! Just visit our vendor website and complete the registration form. Once submitted, our team will contact you to guide you through the onboarding process.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[22px] font-saeada">What is the payout plan for vendors ?</div>
          <div className="font-sans">Vendors receive payment immediately after each completed transaction, making it easy to track your earnings and stay on top of your finances.</div>
          </div>
        </div>


        </div>
    </div>
    </div>
  </div>
  <Footer/>
  </>)
}

export default FAQ
