import React from 'react'
import pod from '../assets/Podlogo.svg';
import background from '../assets/Rectangle 49.svg';
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import Footer from '../Components/Footer';

function SignUp() {
  return (<>
  <div className="h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})`, height: "800px"}}>
  <div className="flex justify-center pt-[40px]">
  <div className="bg-white p-8 rounded-[20px] shadow-lg w-[90%] lg:w-[40%]">
    <div className="flex justify-center">
        <img src={pod}/>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Create An Account !</h2>
        <h3 className="mb-6 text-center">Welcome to the MarketPod Family.</h3>
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
          <div className="mb-4 items-center flex flex-row">
          <LiaKeySolid className="absolute ml-[20px] size-[20px]"/>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 pl-[50px] py-5 px-4 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
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
        <div className="pt-[10px] flex flex-row gap-[10px]">
            <input type="checkbox" id="checkbox" className="size-[17px]"/>
            <label className="block text-gray-700 text-sm" htmlFor="checkbox">
              Keep me signed in
            </label>
        </div>
        <div className="flex items-center justify-center my-3">
      <hr className="w-full border-t border-gray-300" />
      <span className="px-3 text-gray-500">Or</span>
      <hr className="w-full border-t border-gray-300" />
    </div>
    <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#F9F9F9] hover:bg-[grey] font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
            >
              Continue with google
            </button>
          </div>
          <div className="mt-[10px] flex flex-row justify-center gap-[5px]">
            <p>You have an account?</p><p className="text-[#31603D] underline">Login</p>
          </div>
          <div className="mt-[10px] flex flex-row justify-center gap-[5px] flex-wrap lg:flex-nowrap">
            <p>By proceeding you agree to the</p><p className="text-[#31603D] underline">Privacy Policy</p>and<p className="text-[#31603D] underline">Terms of Use</p>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default SignUp
