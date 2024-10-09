import React from 'react'
import pod from '../assets/Podlogo.svg';
import background from '../assets/Rectangle 49.svg';
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import Footer from '../Components/Footer';

function RecoverPassword() {
  return (<>
  <div className="h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})`, height: "800px"}}>
  <div className="flex justify-center pt-[40px]">
  <div className="bg-white p-8 rounded-[20px] shadow-lg w-[90%] lg:w-[40%]">
    <div className="flex justify-center">
        <img src={pod}/>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Recover Password</h2>
        <h3 className="mb-6 text-center">Don’t worry, resetting your password is very easy. Just type in the email address you registered with, and we would send you a one time password to confirm your identity</h3>
        <form>
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
        <div className="mt-[20px] flex flex-row gap-[5px]">
            <p>Remember Password?</p><p className="text-[#31603D] font-bold underline">Try logging in</p>
          </div>
  
          <div className="mt-[130px] flex flex-row justify-center gap-[5px]">
            <p>Don't have an account?</p><p className="text-[#31603D] underline">Create Account</p>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default RecoverPassword
