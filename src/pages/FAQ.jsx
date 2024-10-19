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
        <div className="font-bold flex justify-center text-2xl lg:text-3xl">Frequently Asked Questions !</div>
        <div className="flex justify-center">You've got questions ? We've got answers</div>
        </div>

        <div className="p-[20px] flex flex-col gap-y-[20px]">
        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[25px]">Lorem ipsum dolor ?</div>
          <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[25px]">Lorem ipsum dolor ?</div>
          <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[25px]">Lorem ipsum dolor ?</div>
          <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
          </div>
        </div>

        <div className="flex row gap-x-[10px]">
          <div><IoCaretForwardSharp className="absolute text-[#31603D] ml-[-30px] mt-[3px] size-[30px] lg:mt-[6px]"/></div>
          <div className="flex flex-col gap-y-[10px]">
          <div className="text-[22px] font-bold lg:text-[25px]">Lorem ipsum dolor ?</div>
          <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</div>
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
