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

dotPulse.register()

// Default values shown


function SignIn() {
  dotPulse.register()
  const [email, setEmail] = useState('');
  const [pswd, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleSignin = (e) => {
    setIsPending(true);
    e.preventDefault();
    if (email === '' || pswd === '') {
      toast.error('All fields are required');
      setIsPending(false);
        return;
    }

  const formData = {
    email, 
    pswd
  };

  fetch('https://apis.emarketpod.com/user/signin', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) => response.json())
        .then((data) => {
          if (data.status === true) {
            // localStorage.setItem('user', JSON.stringify(data))
            dispatch({
              type: 'SIGN_IN',
              payload: { token: data.token ,user:data.user, email:email},
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
  

  return (<>
    <div className="h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})`, height: "800px"}}>
  <div className="flex justify-center pt-[40px]">
  <div className="bg-white p-8 rounded-[20px] shadow-lg w-[90%] lg:w-[40%]">
    <div className="flex justify-center">
        <img src={pod}/>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back !</h2>
        <h3 className="mb-6 text-center">We are glad to have you back with us</h3>
        <form>
          <div className="mb-4 items-center flex flex-row">
          <PiEnvelopeSimpleLight className="absolute ml-[20px] size-[20px]"/>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={pswd}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 pl-[50px] py-5 px-4 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isPending &&<div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleSignin}
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
        <div className="pt-[20px] text-[#31603D] flex flex-row gap-[10px] underline font-bold">
        <Link to="/recoverpassword"><p>Recover Password</p></Link>
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
            <p>Don't have an account?</p><Link to="/signup"><p className="text-[#31603D] underline">Create Account</p></Link>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default SignIn
