import React, { useState, useRef, useEffect, useContext } from 'react'
import pod from '../assets/Podlogo.svg';
import background from '../assets/Rectangle 49.svg';
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { dotPulse } from 'ldrs'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { trio } from 'ldrs'
import { GrConsole } from 'react-icons/gr';
import { AuthContext } from '../context/Context.jsx';


function ConfirmEmail() {
    dotPulse.register()
    trio.register()
    const location = useLocation();
    const { dispatch } = useContext(AuthContext);
    const {emailData, otpToken} = location.state || {};
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState();
    const [isLoading, setIsLoading] = useState();
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
        if (e.key === "Backspace") {
          const newOtp = [...otp];
      
          if (newOtp[index]) {
          
            newOtp[index] = "";
          } else if (index > 0) {
           
            newOtp[index - 1] = "";
            inputRefs.current[index - 1].focus();
          }
      
          setOtp(newOtp);
        }
      };

      const joinOtp = otp.join("");

      useEffect(()=> {
        if (!emailData || !otpToken){
          navigate("/");
        }
      }, []);

      const handleVerify = (e) => {
     
        setIsPending(true);
        e.preventDefault();
        if (otp.includes("")) {
            toast.error('Incomplete OTP!');
            setIsPending(false);
            return;
        }
        const otpData = {
              email: emailData.userEmail,
              otp: joinOtp,
              otpToken: otpToken
        }
       
        fetch('https://apis.emarketpod.com/user/verifyOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(otpData),
        })
          .then((response) => {
              
            if(response.status === 200){
              setIsPending(false);  
            }
            // if (!response.ok){
            //   setIsPending(false);
            //   toast.error("An error occurred. Please try again.");
            // }
           return response.json();
          
          })
          .then((data) => {
            if (data.status === true){
              dispatch({
                type: 'SIGN_IN',
                payload: { token: data.token ,user:data.user, email: emailData.userEmail},
              });
              toast.success(data.message);
              setIsPending(false);
              navigate("/");
            }
            if (data.status === false){
              toast.error(data.message);
              setIsPending(false);
              return;
            }
          })
          .catch((error) => {
            toast.error(data.message);
            console.error('Error:', error);
            setIsPending(false);
          });
      }

      

      const resendOtp = (e) => {
        
        setIsLoading(true);
        e.preventDefault();

        const email = {email: emailData.userEmail}
        
        fetch('https://apis.emarketpod.com/user/resendOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email),
        })
          .then((response) => {
            if(response.status === 200){
              setIsLoading(false);
            }
            if (!response.ok){
              setIsLoading(false);
              toast.error("There was an error resending the OTP");
            }
           return response.json()})
          .then((data) => {
            if (data.status === true) {
              toast.success(data.message);
              setIsLoading(false);
            } else {
              toast.error(data.message);
              setIsLoading(false);
                return;
            }
          })
          .catch((error) => {
            toast.error(data.message);
            console.error('Error:', error);
            setIsLoading(false);
          });
    
      }

  return (<>
   {isLoading &&  <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}
   <div className="h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})`, height: "800px"}}>
  <div className="flex justify-center pt-[40px]">
  <div className="lg:pb-[70px] bg-white p-8 rounded-[20px] shadow-lg w-[90%] lg:w-[40%]">
    <div className="flex justify-center">
        <img src={pod} onClick={() => navigate("/")} className="cursor-pointer"/>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center lg:text-[35px] font-saeada">Email Confirmation</h2>
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
          className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>


{!isPending &&<div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleVerify}
              className="bg-[#31603D] hover:bg-[green] text-white font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
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







        </form>
        <div className="mt-[20px] flex flex-row gap-[5px] justify-center">
            <p>Didn't get a code?</p>
          </div>
          <div className="mt-[30px] flex flex-row gap-[5px] justify-center font-bold text-[#31603D]">
            <button onClick={resendOtp}>Resend Code</button>
          </div>
          <div className="mt-[100px] flex flex-row justify-center gap-[5px]">
           <p>You have an account?</p><p className="text-[#31603D] underline"><Link to = "/signin">Login</Link></p>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default ConfirmEmail
