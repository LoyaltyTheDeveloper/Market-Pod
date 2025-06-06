import React from 'react'
import pod from '../assets/Podlogo.svg';
import background from '../assets/Rectangle 49.svg';
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { trio } from 'ldrs';
import { useState, useRef, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { dotPulse } from 'ldrs'
dotPulse.register()


function RecoverPassword() {

trio.register()

  const [email, setEmail] = useState('');
    const [isPending, setIsPending] = useState(false);
     const [canRequest, setCanRequest] = useState(true);
  const [timer, setTimer] = useState(0);

 const handleRecoverPassword = (e) => {
    e.preventDefault();
    setIsPending(true);

    
    if (email === '') {
      toast.error('Email is required');
      setIsPending(false);
      return;
    }

    if (!canRequest) {
      toast.error(`Please wait ${timer} seconds before trying again.`);
      return;
    }

    setIsPending(true);
    setCanRequest(false);
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanRequest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

     fetch('https://apis.emarketpod.com/user/request-reset', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}),
      })
      .then((response) =>  response.json())
            .then((data) => {
              if (data.status === true) {
                toast.success(data.message);
                setIsPending(false);
              } else {
                toast.error(data.message);
                setIsPending(false);
                return;
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              setIsPending(false);
              return;
              });


  }

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="w-full border border-gray-300 pl-[50px] py-5 px-4 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
{/*         
          {!isPending &&<div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleRecoverPassword}
              className="bg-[#31603D] hover:bg-green-700 text-white font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
            >
              Proceed
            </button>
          </div>} */}

 {!isPending &&<div className="flex items-center justify-between">
          <button
        onClick={handleRecoverPassword}
        disabled={!canRequest || isPending}
        className={`bg-[#31603D] hover:bg-green-700 text-white font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full ${
          !canRequest ? "cursor-not-allowed" : "bg-[#31603D] hover:bg-green-700 text-white font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
        }`}
      >
        Proceed
      </button>
      </div>}


          {isPending &&<div className="flex items-center justify-between">
            <button
            disabled
              className="bg-[#31603D] opacity-[80%] text-white font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
            >
              <l-dot-pulse
  size="40"
  speed="1.3" 
  color="white" 
></l-dot-pulse>
            </button>
          </div>}
         <div className='flex justify-center mt-6 text-[#31603D] font-bold'> {canRequest ? "" : `Retry in ${timer} second(s)`} </div>

        </form>
        <div className="mt-[20px] flex flex-row gap-[5px]">
            <p>Remember Password?</p><Link to="/signin"><p className="text-[#31603D] font-bold underline">Try logging in</p></Link>
          </div>
  
          <div className="mt-[130px] flex flex-row justify-center gap-[5px]">
            <p>Don't have an account?</p><Link to="/signup"><p className="text-[#31603D] underline">Create Account</p></Link>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default RecoverPassword
