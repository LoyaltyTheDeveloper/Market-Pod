import React, { useContext, useState } from 'react'
import pod from '../assets/Podlogo.svg';
import background from '../assets/Rectangle 49.svg';
import { PiEnvelopeSimpleLight } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Context.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function SignUp() {
  const [email, setEmail] = useState('');
  const [pswd, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleSignup = (e) => {
    setIsPending(true);
    e.preventDefault();
    if (email === '' || pswd === '') {
        toast.error('All fields are required', {autoClose: 1000});
        return;
    }

    const formData = {
      email,
      pswd
    };

    fetch('https://test.tonyicon.com.ng/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          // dispatch({
          //   type: 'SIGN_UP',
          //   payload: { user: data.user },
          // });
          toast.success(data.message, {autoClose: 2000});
          setIsPending(false);
          navigate('/signin');
        } else {
          toast.error(data.message, {autoClose: 2000});
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
        <h2 className="text-2xl font-bold mb-6 text-center">Create An Account !</h2>
        <h3 className="mb-6 text-center">Welcome to the MarketPod Family.</h3>
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
              onClick={handleSignup}
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
              Loading...
            </button>
          </div>}

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
            <p>You have an account?</p><Link to="/signin"><p className="text-[#31603D] underline">Login</p></Link>
          </div>
          <div className="mt-[10px] flex flex-row justify-center gap-[5px] flex-wrap lg:flex-nowrap">
            <p>By proceeding you agree to the</p><Link to="/privacypolicy"><p className="text-[#31603D] underline">Privacy Policy</p></Link>and<Link to="/termsofuse"><p className="text-[#31603D] underline">Terms of Use</p></Link>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default SignUp
