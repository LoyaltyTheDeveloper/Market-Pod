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
import { CartContext } from '../context/CartContext.jsx';
import Gmail from '../Components/GmailIcon.jsx';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  dotPulse.register()
  const [email, setEmail] = useState('');
  const [pswd, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  // const emailData = {userEmail: formData.email};
  const { state } = useContext(AuthContext);
 const { clearCart } = useContext(CartContext);
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




  const handleSignup = (e, product_id) => {
    setIsPending(true);
    e.preventDefault();

    // if (email === '' || pswd === '') {
    //     toast.error('All fields are required');
    //     setIsPending(false);
    //     return;
    // }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsPending(false);
      return;
    };

    const localCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = localCart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    // const formData = {
    //   email,
    //   pswd,
    //   cart: updatedCart
    // };

    // const updateCart =() => {

    //   fetch('https://apis.emarketpod.com/user/cart/add', {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: state.token,
    //     },
    //     body: JSON.stringify(product_id),
    //   })
    //   .then((response) => response.json())
    //     .then((data) => {console.log(data)
    //       return;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    
    // }   

   
    

    fetch('https://apis.emarketpod.com/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          const otpToken = data.otpToken
          const otpPageData = {emailData, otpToken}
          navigate('/confirmemail', {state: otpPageData});
          toast.success('User signed up successfully. Please verify account.');
          console.log(data.message);
          setIsPending(false);
          updateCart();
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
    //  clearCart();

  }

  return (<>
  <div className="h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background})`, height: "800px"}}>
  <div className="flex justify-center pt-[40px]">
  <div className="bg-white p-8 rounded-[20px] shadow-lg w-[90%] lg:w-[40%]">
    <div className="flex justify-center">
        <img src={pod} onClick={() => navigate("/")} className="cursor-pointer"/>
    </div>
        <h2 className="text-2xl font-bold mb-6 text-center font-saeada">Create An Account !</h2>
        <h3 className="mb-6 text-center">Welcome to the MarketPod Family.</h3>
        <form>

          <div className="mb-4">
          <div className=" items-center flex flex-row">
          <PiEnvelopeSimpleLight className="absolute ml-[20px] size-[20px]"/>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
          <div className=" relative items-center flex flex-row">
          <LiaKeySolid className="absolute ml-[20px] size-[20px]"/>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="pswd"
              value={formData.pswd}
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
              onClick={handleSignup}
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

        {/* <div className="pt-[10px] flex flex-row gap-[10px]">
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
              className="bg-[#F9F9F9] font-bold flex justify-center items-center gap-x-3 py-5 px-4 rounded-[100px] focus:outline-none focus:shadow-outline w-full"
            >
              Continue with google
           <Gmail/>
            </button>
          </div> */}

          <div className="mt-[30px] flex flex-row justify-center gap-[5px]">
            <p>You have an account?</p><Link to="/signin"><p className="text-[#31603D] underline">Login</p></Link>
          </div>
          <div className="mt-[30px] flex flex-row justify-center gap-[5px] flex-wrap lg:flex-nowrap">
            <p>By proceeding you agree to the</p><Link to="/privacypolicy"><p className="text-[#31603D] underline">Privacy Policy</p></Link>and<Link to="/termsofuse"><p className="text-[#31603D] underline">Terms of Use</p></Link>
          </div>
      </div>
      </div>
  </div>
  <Footer/>
  </>)
}

export default SignUp
