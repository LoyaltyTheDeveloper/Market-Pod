import React, { useContext, useState } from 'react'
import pod from '../assets/Podlogo.svg';
import background from '../assets/Rectangle 49.svg';
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Context.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { dotPulse } from 'ldrs'
import Gmail from '../Components/GmailIcon.jsx';
import { Dialog, DialogContent, Button } from "@mui/material";
import { trio } from 'ldrs'
import { FaEye, FaEyeSlash } from "react-icons/fa";
dotPulse.register()

function SignIn() {



   trio.register()
  dotPulse.register()
  const [email, setEmail] = useState('');
  const [pswd, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
   const [isLoading, setIsLoading] = useState();
  //  const emailData = {userEmail: formData.email};
   const [showPassword, setShowPassword] = useState(false);

   const [formData, setFormData] = useState({ email: "", pswd: "" });
      const emailData = {userEmail: formData.email};
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "*Email is required";
    if (!formData.pswd.trim()) newErrors.pswd = "*Password is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "*Invalid email";
    return newErrors;
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignin = (e) => {
    setIsPending(true);
    e.preventDefault();
    // if (email === '' || pswd === '') {
    //   toast.error('All fields are required');
    //   setIsPending(false);
    //     return;
    // }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsPending(false);
      return;
    };
   

  // const formData = {
  //   email, 
  //   pswd
  // };

  fetch('https://apis.emarketpod.com/user/signin', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) =>  response.json() )
        .then((data) => {
          if(data.redirect === 'verification'){
            toast.error('Your account is not verified.');
            setIsPending(false);
            handleClickOpen();
            return;
          }
          if (data.status === true) {
            dispatch({
              type: 'SIGN_IN',
              payload: { token: data.token ,user:data.user, email:formData.email},
            });
            toast.success(data.message);
            setIsPending(false);
            navigate('/');
          } else {
          
            toast.error(data.message);
            setIsPending(false);
            return;
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsPending(false);
          });
  }
       const verifyAccount = (e) => {

          setIsLoading(true);
                  e.preventDefault();
                  
                  fetch('https://apis.emarketpod.com/user/resendOtp', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email}),
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
                        const otpToken = data.otpToken
                        const otpPageData = {emailData, otpToken}
                        navigate('/confirmemail', {state: otpPageData});
                        // toast.success(data.message);
                        setIsLoading(false);
                      } else {
                        toast.error(data.message);
                        setIsLoading(false);
                          return;
                      }
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                      setIsLoading(false);
                    });
              
       }

  //       const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.email]: e.target.value });
  //   setErrors({ ...errors, [e.target.email]: "" }); 
  // };
  

  return (<>
    <div className="h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})`, height: "800px"}}>
  <div className="flex justify-center pt-[40px]">
  <div className="bg-white p-8 rounded-[20px] shadow-lg w-[90%] lg:w-[40%]">
    <div className="flex justify-center">
        <img src={pod} onClick={() => navigate("/")} className="cursor-pointer"/>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center font-saeada">Welcome Back !</h2>
        <h3 className="mb-6 text-center">We are glad to have you back with us</h3>
        <form>
          <div className="mb-4">
          <div className="mb- 4 items-center flex flex-row">
          <PiEnvelopeSimpleLight className="absolute ml-[20px] size-[20px]"/>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
              // className="w-full border border-gray-300 pl-[50px] py-5 px-4 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              className={`w-full border border-gray-300 pl-[50px] py-5 px-4 rounded-[100px] focus:outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
              placeholder="Enter your email"
              required
            />
          </div>
           {errors.email && <p className="text-red-500 text-md">{errors.email}</p>}
           </div>

           <div className="mb-4">
          <div className="mb- 4 relative items-center flex flex-row">
          <LiaKeySolid className="absolute ml-[20px] size-[20px]"/>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="pswd"
              value={formData.pswd}
              // value={pswd}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleChange}
              // className="w-full border border-gray-300 pl-[50px] pr-[50px] py-5 px-4 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              className={`w-full border border-gray-300 pl-[50px] py-5 px-4 rounded-[100px] focus:outline-none ${
            errors.pswd ? "border-red-500" : "border-gray-300"
          }`}
              placeholder="Enter your password"
              required
            />
            <button
        type="button"
        className="absolute ml-[330px] right-5"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </button>
          </div>
           {errors.pswd && <p className="text-red-500 text-md">{errors.pswd}</p>}
           </div>

          {!isPending &&<div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleSignin}
              className="bg-[#31603D] hover:bg-green-700 text-white font-bold py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
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
        <div className="pt-[20px] text-[#31603D] flex flex-row gap-[10px] underline font-bold">
        <Link to="/recoverpassword"><p>Recover Password</p></Link>
        </div>


        <div></div>


        {/* <div className="flex items-center justify-center my-3">
      <hr className="w-full border-t border-gray-300" />
      <span className="px-3 text-gray-500">Or</span>
      <hr className="w-full border-t border-gray-300" />
    </div>
    <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#F9F9F9] font-bold flex justify-center items-center gap-x-3 py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
            >
              Continue with google
              <Gmail/>
            </button>
          </div> */}

          <div className="mt-[30px] flex flex-row justify-center gap-[5px]">
            <p>Don't have an account?</p><Link to="/signup"><p className="text-[#31603D] underline">Create Account</p></Link>
          </div>

          
      </div>
      </div>
      <div className="flex justify-center items-center h-screen">
      {open && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full flex justify-center items-center z- 10">
          <div className="absolute bg-black opacity-50 w-full h-full" onClick={handleClose}></div>

          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] lg:w-[400px] relative z- 50 text-center">
            <p className="text-lg">Do you want to proceed to verify your account?</p>

            {isLoading &&  <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}
            <div className='mt-4'>
            <div className=''>
              <button onClick={verifyAccount} className='border border-[#31603D] bg-[#31603D] text-[white] font-semibold px-10 py-2 rounded-full hover:bg-green-700'>Proceed</button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
    
  <Footer/>
  </>)
}

export default SignIn
