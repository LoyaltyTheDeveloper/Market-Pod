import React, { useState, useRef } from 'react'
import pod from '../assets/Podlogo.svg';
import background from '../assets/Rectangle 49.svg';
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import Footer from '../Components/Footer';

function ConfirmEmail() {
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
          if (index < length - 1) {
            inputRefs.current[index + 1].focus();
          }
        }
      };

      const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "") {
          if (index > 0) {
            inputRefs.current[index - 1].focus();
          }
        }
      };

  return (<>
   <div className="h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})`, height: "800px"}}>
  <div className="flex justify-center pt-[40px]">
  <div className="bg-white p-8 rounded-[20px] shadow-lg w-[90%] lg:w-[40%]">
    <div className="flex justify-center">
        <img src={pod}/>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Email Confirmation</h2>
        <h3 className="mb-6 text-center">We sent a one time password to your email address, please enter it into the field below.</h3>
        <form>
        <div className="flex space-x-1 lg:space-x-5 justify-center mb-[10px]">
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-[60px] h-[60px] border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
          <div className="mb-4 items-center flex flex-row">
          <PiEnvelopeSimpleLight className="absolute ml-[20px] size-[20px]"/>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 pl-[50px] py-5 px-4 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
        
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#31603D] hover:bg-[green] text-white font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
            >
              Proceed
            </button>
          </div>
        </form>
        <div className="mt-[20px] flex flex-row gap-[5px] justify-center">
            <p>Didn't get a code?</p>
          </div>
          <div className="mt-[30px] flex flex-row gap-[5px] justify-center font-bold text-[#31603D]">
            <p>Resend Code</p>
          </div>
          <div className="mt-[100px] flex flex-row justify-center gap-[5px]">
            <p>You have an account?</p><p className="text-[#31603D] underline">Login</p>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default ConfirmEmail
