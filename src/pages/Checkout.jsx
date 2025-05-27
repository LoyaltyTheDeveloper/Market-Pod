import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoTrash } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Context.jsx';
import toast from 'react-hot-toast';
import { FaRegUser } from "react-icons/fa";
import { PiHouseLineBold } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { PiMapPinArea } from "react-icons/pi";
import { PiCity } from "react-icons/pi";
import { BsQuestionCircle } from "react-icons/bs";
import { BiHomeAlt2 } from "react-icons/bi";
import { trio } from 'ldrs';
import { IoMdBicycle } from "react-icons/io";
import { CartContext } from '../context/CartContext.jsx';
import { TbUserEdit } from "react-icons/tb";
import { Button, Rating } from "@mui/material";
import { LiaTimesSolid } from "react-icons/lia";
import { AiOutlineClose } from "react-icons/ai";
import ServiceCharge from './ServiceCharge.jsx';

function Checkout() {
  const navigate = useNavigate();
   trio.register()
   
     const [isCartOpen, setIsCartOpen] = useState(false);
     const { state, dispatch } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(
          Array.isArray(products)
          ? products.reduce((acc, product) => {
              acc[product.id] = product.quantity || 0;
              return acc;
            }, {})
          : {}
        );
        const [showThirdDiv, setShowThirdDiv] = useState(false);
        const [locations, setLocations] = useState([]);
        const [selectedLocation, setSelectedLocation] = useState("");
        const [city, setCity] = useState("");
        const [states, setStates] = useState("");
        const [refresh, setRefresh] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
       const [isLoading2, setIsLoading2] = useState(false);
       const [address, setAddress] = useState("");
       const [rider, setRider] = useState("");
       const [name, setName] = useState("");
       const [phone, setPhone] = useState("");
       const [open, setOpen] = useState(false);
       const [open2, setOpen2] = useState(false);
       const [rating, setRating] = useState(0);
       const [orderData, setOrderdata] = useState(null);


        const handleCityChange = (e) => {
          setCity(e.target.value);
          
        };
        const handleStatesChange = (e) => {
          setStates(e.target.value);
          setCity("");
        };

        const handleNumberChange = (e) => {
          let phoneLimit = e.target.value;

          if (/^\d*$/.test(phoneLimit) && phoneLimit.length <= 11) {
            setPhone(phoneLimit);
          }
        }

        // const createOrder = () => {
        //   if(!name || !phone || !address || !selectedLocation){
        //     return toast.error("Please fill in all details.")
        //   }
        //   else{
        //     orderFunction();
        //     setShowThirdDiv(!showThirdDiv);
        //     scroll();
        //   } 
        //   };

          const scroll = () => {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }


        const handleIncrease = (productId) => {
            const currentQuantity = quantity[productId] || 1;
            const newQuantity = currentQuantity + 1;
            updateQuantity(productId, newQuantity);
          }
          const handleDecrease = (productId) => {
            const currentQuantity = quantity[productId] || 1;
            if(currentQuantity > 1){
              const newQuantity = currentQuantity - 1;
              updateQuantity(productId, newQuantity);
              
            }
          } 

  useEffect(() => {
    setIsLoading2(true);
          
      fetch('https://apis.emarketpod.com/user/cart', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: state.token,     
        },
      })
      .then((response) => response.json())
        .then((data) => {
        
          setProducts(data);
          setIsLoading2(false);
        })
        .catch((error) => {
          console.error(error);
        });
        // setRefresh(!refresh);
    }, [refresh]);


    useEffect(() => {
          
      fetch('https://apis.emarketpod.com/site/getLocations', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
        .then((data) => {
          setLocations(data.locations);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);


    const deleteProduct = (product) => {
        // const updatedCart = cart.filter((item) => item.id !== product.id);
        // setCart(updatedCart);
        fetch('https://apis.emarketpod.com/user/cart/remove', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: state.token,
          },
          body: JSON.stringify({ product_id: product.product_id }),
        })
        .then((response) => 
        {
                if (response.status === 403) {
                  toast.error("Your session has expired");
                  localStorage.removeItem('user');
                  navigate('/signin');
                  dispatch({ type: 'LOG_OUT', payload: { token: null } })
                } 
                return response.json()}
        )
          .then((data) => {
            // toast.success(data.message);
            toast.success('Product removed');
            setRefresh(!refresh);
            return;
          })
          .catch((error) => {
            console.error(error);
          });
      };


      const updateQuantity = (productId, newQuantity) => {
        fetch('https://apis.emarketpod.com/user/cart/update-quantity', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: state.token,
          },
          body: JSON.stringify({ product_id: productId, quantity: newQuantity}),
        })
        .then((response) => 
        {
                if (response.status === 403) {
                  toast.error("Your session has expired");
                  localStorage.removeItem('user');
                  navigate('/signin');
                  dispatch({ type: 'LOG_OUT', payload: { token: null } })
                } 
                return response.json()}
        )
          .then((data) => {
            toast.success(data.message);
            setRefresh(!refresh);
            setQuantity((prevQuantities) => ({
              ...prevQuantities,
              [productId]: newQuantity,
            }));
            // console.log({product_id: productId, quantity: newQuantity});
            return;
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const order = {
         location_id:selectedLocation,
         address:address,
         full_name: name,
         phone_number: phone
      }

      const orderFunction = () => {
        setIsLoading(true);
        fetch('https://apis.emarketpod.com/user/order/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: state.token,
          },
          body: JSON.stringify(order),
        })
        .then((response) => 
        {
                if (response.status === 403) {
                  toast.error("Your session has expired");
                  localStorage.removeItem('user');
                  navigate('/signin');
                  dispatch({ type: 'LOG_OUT', payload: { token: null } })
                } 
                return response.json()}
        )
        .then((data) => {
          if (data.status === true) {
            toast.success(data.message);
            setIsLoading(false);
            setShowThirdDiv(!showThirdDiv);
            setOrderdata(data.data);
          }
          else {
            toast.error(data.message);
            setIsLoading(false);
            return;
          }}
        )
          .catch((error) => {
            console.error(error);
          });
      };

      const createOrder = () => {
        if(!name || !phone || !address || !selectedLocation){
          return toast.error("Please fill in all details.")
        }
        else{
          orderFunction();
          // setOpen(true);
          // setShowThirdDiv(!showThirdDiv);
          scroll();
        } 
        };
        const makePayment = () => {
          if(orderData){
            window.location.href = orderData.checkout_url;
          }
        }
      

      const goToDashboard = () => {
        navigate("/dashboard", { state: { showOrders: true } });
      }

      const displayName = `${state.user.last_name ? (state.user.last_name == '' ? 'Full name' : state.user.last_name) : "Full name"} ${state.user.first_name ?? ''}`;
      const displayPhone = `${state.user.phone_number ? (state.user.phone_number == '' ? 'Phone Number' : state.user.phone_number) : "Phone Number"} ${state.user.phone_number2 ?? ''}`;

       const { cartOne, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);

       const formatNumber = (num) => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const orderValue = Array.isArray(products) ? products.reduce((acc, product) => {
        const price = Number(product.price) || 0;
        const quantity = Number(product.quantity) || 0;
        return acc + price * quantity;
      }, 0) :0;

  return (<>
  <Navbar/>

    <div className="pt-[30px pb-[50px] min-h-scree">
     
    <div className="flex justify-center items-center h-scree">
  
  {/* <Button variant="contained" onClick={() => setOpen(true)}>
    Open Overlay
  </Button> */}
 
  {open && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h1 className='font-bold text-[22px] mb-2'>Payment Successful</h1>
        <p className="text-[15px] mb-4">Your payment for Order ID  has been confirmed.
Please keep your device close as the delivery rider
would request your Order ID for confirmation</p>
        <button 
          onClick={goToDashboard} 
          variant="contained" 
          className="rounded-full px-20 py-2 border border-[#31603D] text-[white] bg-[#31603D] hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    </div>
  )}

{isCartOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
              )}


 <div className={`fixed top-0 right-0 w-[100%] md:w-[55%] lg:w-[400px] h-full bg-white shadow-lg transition-transform transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} z-50 flex flex-col`}>
 
         <div className="flex justify-between items-center p-4 bg-[white] h-auto w-full">
         {state.token && <div className="text-[20px] ml-[20px text-[#31603D] font-semibold">Service Charge</div>}
           <button onClick={() => setIsCartOpen(false)} className="text-gray-600 hover:text-red-500">
             <AiOutlineClose size={24} className="text-[#31603D]"/>
           </button>
         </div>
 
    <div className='flex-1 overflow-y-auto p-4'>
   

{/* Service Charge */}

<div className='mx-6'>
<div className="flex flex-col font-sans">
      <div className="font-bold">What is a Service Charge and Why Do We Charge It?</div>
      <div className="text-[15px]">At MarketPod, we pride ourselves on creating a seamless and reliable way for you to access fresh groceries and everyday essentials from trusted local markets. Behind the scenes, a lot goes into making this experience smooth, efficient, and enjoyable. To support these efforts, we include a small service charge in every order.</div>
    </div>

      <div className="flex flex-col font-sans">
      <div className="font-bold">What is a Service Charge?</div>
      <div className="text-[15px]">A service charge is a nominal fee added to your order to help cover the operational and logistical costs associated with running our platform. It’s an essential part of how we maintain the high-quality service you’ve come to expect from MarketPod.</div>
    </div>
   
    <div className="flex flex-col font-sans">
      <div className="font-bold">Why do we Charge it?</div>
      <div className="text-[15px]">
      We understand that transparency is important, so let us walk you through why this charge is necessary:<br></br>
1. Operational Excellence. <br></br>
<div className="pl-4">Running a platform like MarketPod involves various behind-the-scenes processes, from maintaining our app and website to ensuring secure payment systems and smooth user experiences. The service charge helps us keep these systems up-to-date and efficient so you can enjoy hassle-free shopping.</div>
2. Maintaining Quality Standards <br></br>
<div className="pl-4">From quality checks on products to ensuring proper packaging, we work tirelessly to guarantee that every item you receive meets our high standards. The service charge contributes to maintaining these rigorous processes.</div>
3. Supporting Innovation and Growth <br></br>
<div className="pl-4">It helps us add more features, expand into new locations, and bring more vendors on board to give you a broader range of products.</div>
      </div>
    </div>


    <div className="flex flex-col font-sans">
      <div className="font-bold">How does It Benefit You?</div>
      <div className="text-[15px]">Think of the service charge as a small investment in the convenience, quality, and reliability that MarketPod offers. With this fee, you’re not just paying for groceries you’re paying for the time saved, the stress avoided, and the confidence of knowing your orders are in good hands.<br></br>
Building a Sustainable Ecosystem<br></br>
Your support through this charge doesn’t just benefit you. It creates a ripple effect by empowering local vendors, supporting delivery partners, and sustaining a system that works for everyone involved.<br></br>
We are committed to keeping this fee as minimal as possible while continuing to deliver the exceptional service you deserve. Your trust and understanding mean the world to us, and we’re always here to answer any questions you may have.<br></br>
Thank you for letting us bring the best of your local markets to your home!</div>
    </div>
</div>


    </div>
       </div>







</div>

<div className="flex flex-col lg:flex-row items-center pt-[30px">

 <div className="flex flex-col pt-[50px lg:mt-[700px pb-[30px] bg-[#F9F9F9] w-full lg:min-h-screen overflow-y-auto max -h-72 h-[600px h-[500px no-scrollbar">
    <div className="flex justify-center lg:mt-[120px]">
            <div className="pt-[500px h-[350px] lg:h-[750px]">


    <div className="mb-[20px] mt-[120px] flex flex-row gap-x-[110px] lg:gap-x-[310px] items-center text-[12px] lg:mt-[0px] justify-between">
      <div className="font-bold text-[25px] font-saeada">Checkout</div>
      <button onClick={() => navigate('/')} className="flex border border-[#31603D] gap-x-[10px] px-[10px] py-2 items-center border-[1.5px] rounded-[20px] text-[#31603D]">
        <div><GrBasket className="size-[14px]"/></div>
        <div>Continue shopping</div>
      </button>
    </div>
    
    {isLoading &&  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}


     {state.token && <div>
            {Array.isArray(products) && products.length > 0 ? (
            <ul>
              {products.map((product) => (<>
                <div className="relative" key={product.product_id}>
                  
                <div className="bg-[] pt-[10px] lg:pt-[30px]">
              {/* <div className="font-bold ml-[10px]">Produce</div> */}
              <div className="flex">
                
                <div><img src={product.image} className="size-[90px] object-contain mr-2"/></div>
            
                <div className="flex flex-col lg:flex-row lg:items-center gap-[10px]">

                    <div className="lg:w-[300px]">
                  <div>{product.name} - {product.weight}KG</div>
                  <div className="text-[grey] text-[15px]">{product.subtitle}</div>
                 </div>

                  <div className="flex items-center gap-[15px]">
                   <div onClick={()=> deleteProduct(product)} className="bg-[#31603D] rounded-[50%] p-[8px] cursor-pointer"><GoTrash className="size-[ text-[white]"/></div>
                   <div className="flex gap-x-[22px] items-center border border-[#31603D] rounded-[20px] px-[10px]">
                    <div onClick={()=> handleDecrease (product.product_id)}className="text"><FaMinus className="size-[12px]"/></div>
                    <div className="text-[18px]">{product.quantity}</div>
                    <div onClick={()=> handleIncrease(product.product_id)}className="text"><FaPlus className="size-[12px]"/></div>
                   </div>
                   <div className="font-semibold ml-[25px] text-[15px] whitespace-nowrap">₦ {formatNumber(Number(product.price * product.quantity))}</div>
                  </div>

                  </div>
              </div>
            </div>
                </div>
                 <hr className="mt-[10px] mx-[2%]"></hr>
              </>))}
              {/* <div className="mt-[150px] bg-[white] py-[50px] pb-[250px] items-center px-[20px] flex justify-center">
                 <button className="text-[white] bg-[#31603D] py-[8px] px-[100px] border border-[#31603D] rounded-[20px]">Proceed to Checkout</button>
               </div> */}
            </ul>
            
          ) : (<>
          <div className="flex flex-col gap-y-[10px] mt-[100px] items-center">
           {/* <div className="flex justify-center bg-[white] p-6 rounded-full"><GrBasket className="size-[50px] bg-[red"/>
           </div> */}
           <div> {isLoading2 &&<div className="flex justify-center lg:absolute mt-[-50px] lg:mt-[40px]"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}</div>
<div> {!isLoading2 &&<div className="flex justify-center lg:absolute mt-[-50px] lg:mt-[40px]"> No items here  </div>}</div>
           {/* <div className="underline font-semibold text-[#31603D]"><Link to="/">Shop Now</Link></div> */}
           </div>
          </>)}

          </div>}


          {!state.token && <div>
            {Array.isArray(cartOne) && cartOne.length > 0 ? (
            <ul>
              {cartOne.map((product) => (<>
                <div className="relative" key={product.product_id}>
                  
                <div className="bg-[] pt-[10px] lg:pt-[30px]">
              {/* <div className="font-bold ml-[10px]">Produce</div> */}
              <div className="flex">
                
                <div><img src={product.image} className="size-[90px] object-contain mr-2"/></div>
            
                <div className="flex flex-col lg:flex-row lg:items-center gap-[10px]">

                    <div className="lg:w-[300px]">
                  <div>{product.name} - {product.weight}KG</div>
                  <div className="text-[grey] text-[15px]">{product.subtitle}</div>
                 </div>

                  <div className="flex items-center gap-[15px]   ">
                   <div onClick={()=> removeFromCart(product.id)} className="bg-[#31603D] rounded-[50%] p-[8px]"><GoTrash className="size-[ text-[white]"/></div>
                   <div className="flex gap-x-[22px] items-center border border-[#31603D] rounded-[20px] px-[10px]">
                    <div onClick={()=> decreaseQuantity(product.id)}className="text"><FaMinus className="size-[12px]"/></div>
                    <div className="text-[18px]">{product.quantity}</div>
                    <div onClick={()=> increaseQuantity(product.id)}className="text"><FaPlus className="size-[12px]"/></div>
                   </div>
                   <div className="font-semibold ml-[25px] text-[15px] whitespace-nowrap">₦ {formatNumber(Number(product.price * product.quantity))}</div>
                  </div>

                  </div>
              </div>
            </div>
                </div>
                 <hr className="mt-[10px] mx-[2%]"></hr>
              </>))}
              {/* <div className="mt-[150px] bg-[white] py-[50px] pb-[250px] items-center px-[20px] flex justify-center">
                 <button className="text-[white] bg-[#31603D] py-[8px] px-[100px] border border-[#31603D] rounded-[20px]">Proceed to Checkout</button>
               </div> */}
            </ul>
            
          ) : (<>
          <div className="flex flex-col gap-y-[10px] mt-[100px] items-center">
           {/* <div className="flex justify-center bg-[white] p-6 rounded-full"><GrBasket className="size-[50px] bg-[red"/>
           </div> */}
           <div>No items here</div>
           {/* <div className="underline font-semibold text-[#31603D]"><Link to="/">Shop Now</Link></div> */}
           </div>
          </>)}

          </div>}





            </div>
            </div>
</div>



<div className="second-or-third-div flex flex-col justify-center bg-[white] lg:px-[100px]">
        {!showThirdDiv ? (<>
        <div className="flex flex-col justify-center items-center my20 lg:py- 16">
          
<div className="flex flex-col gap-y-[10px] mt-[40px] lg:mt-[0px]">
          <div className="text-[25px] font-bold font-saeada">Delivery Details</div>
           <div className="text-[14px]">Complete your order by providing your delivery address</div>


          {/* FullName */}
           <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><TbUserEdit className="size-[20px]"/></div>
          <div>

          <input
          value = {name}
          onChange={(e) => setName(e.target.value)}
          // disabled
          name="name"
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Full Name">
      </input>


            </div>
          </div>

           {/* Phone Number */}
           <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><FiPhone className="size-[20px]"/></div>
          <div>

          <input
          value = {phone}
          onChange={handleNumberChange}
          // disabled
          name="phone"
          type='number'
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Phone Number">
      </input>


            </div>
          </div>

{/* Selected Location */}
          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><GrLocation className="size-[20px]"/></div>
          <div className="">
            
          <select
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none"
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option className ="text-[grey]" value="">General Area</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
          
          </div>

          </div>


        {/* <div className="flex flex-row items-center">
          <div className="absolute ml-[20px]"><PiMapPinArea className="size-[20px]"/></div>
          <div>
            
          <select 
         value={states}
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none"
          onChange={handleStatesChange}>
        <option className="text-[grey]" value="">Select a state</option>
        <option value="Kwara State">Kwara State</option>
       
        </select>
            
            </div>
          </div>  */}




          {/* <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><PiCity className="size-[20px]"/></div>
          <div>

          <select value={city}
          onChange={handleCityChange}
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none"
          disabled={states === ""}>
        <option className="text-[grey]" value="">Select a city</option>
        {states === "Kwara State" && (
        <>
          <option key="Ilorin">Ilorin</option>
        </>
      )}
      </select>


            </div>
          </div> */}


{/* Address */}
          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><BiHomeAlt2 className="size-[20px]"/></div>
          <div>

          <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Adress">
      </input>


            </div>
          </div>

         

          </div>
          <div className="mt-[25px] px-[10px] py-[10px] bg-[#F9F9F9] w-[350px] rounded-[5px]">
            <p className="font-bold">Tip</p>
            <p>For the best experience, make use of the nearest 
            landmark, school, church, etc in your description.</p>
          </div>


          <div className="flex flex-row items-center mt-[25px]">
            <div className="absolute ml-[20px]"><IoMdBicycle className="size-[20px]"/></div>
          <div>

          <input
          value={rider}
          onChange={(e) => setRider(e.target.value)}
          name="rider"
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Riders Instruction (Optional)">
      </input>


            </div>
          </div>

          


          <div className="mt-[25px]"><button className="bg-[#31603D] border border-[#31603D] text-[white] py-4 w-[350px] rounded-[100px] hover:bg-green-700" onClick={createOrder}>Proceed</button></div>

       

         {/* Order overlay */}

     {/* <div className="flex justify-center items-center h-scree">
  
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Overlay
      </Button>

     
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h1 className='font-bold text-[22px] mb-2'>Payment Successful</h1>
            <p className="text-[15px] mb-4">Your payment for Order ID  has been confirmed.
Please keep your device close as the delivery rider
would request your Order ID for confirmation</p>
            <button 
              onClick={goToDashboard} 
              variant="contained" 
              className="rounded-full px-20 py-2 border border-[#31603D] text-[white] bg-[#31603D] hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div> */}

    {/* Reviews overlay */}

    <div className="flex justify-center items-center h-scree">
      {/* Open Overlay Button */}
      {/* <Button variant="contained" onClick={() => setOpen2(true)}>
        Open Overlay
      </Button> */}

      {/* Overlay */}
      {open2 && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w- 80 w-[350px]">
            <div className='flex justify-between justify-center items-center'>
              <p>Reviews</p>
              <div className='cursor-pointer'><LiaTimesSolid className='size-[25px]'/></div>
            </div>
            <hr className='mt-2'></hr>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              sx={{ fontSize: "2rem", marginTop:'10px'}} 
            />
            <div className='mt-2'>
              <textarea className='border w-full px-2 focus:outline-none pb-[100px]' placeholder='How was your experience?'>

              </textarea>
            </div>
            <button 
              onClick={() => setOpen2(false)} 
              variant="contained" 
              className="rounded-full px-24 mt-2 py-2 border border-[#31603D] text-[white] bg-[#31603D]"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>

          
    
          </div>



        

          
                   
        </>) : (<>

          <div className="flex flex-col justify-center items-center py- 20">
          
          <div className="flex flex-col gap-y-[10px] mt-[40px] lg:mt-[0px]">
                    <div className="text-[25px] font-bold font-saeada">Order Details</div>
                     <div className="text-[14px]">Confirm your order details before making payment.</div>
          
          
                 {orderData && (
                   <div className="flex flex-col gap-y-[30px] mt-[30px]">
                    <div className="flex justify-between">
                      <div>Order Value</div>
                      <div className="font-bold">₦ {formatNumber(orderValue)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Delivery Fee</div>
                      <div className="font-bold">₦ {formatNumber(Number(orderData?.delivery_fee))}</div>
                    </div>
                    
                    <div className="">
                    <div onClick={() => setIsCartOpen(true)} className="absolute right-[8px] lg:right-[80px]"><BsQuestionCircle className="size-[21px] text-[#31603D]"/></div>
                    <div className="flex justify-between">
                      <div>Service Charge</div>
                      <div className="font-bold">₦ {formatNumber(Number(orderData?.service_charge))}</div>
                       {/* <div className="font-bold">₦ {orderData?.service_charge}</div> */}
                    </div>
                    </div>

                    {/* <div className="flex justify-between">
                      <div>VAT</div>
                      <div className="font-bold">NGN 32500</div>
                    </div> */}

                    <hr></hr>
                    <div className="flex justify-between">
                      <div>Total</div>
                      <div className="font-bold">₦ {formatNumber(Number(orderData?.total_pay))}</div>
                    </div>
                    <hr></hr>
                   </div>)}
          
                    </div>
                    
                    <div className="mt-[40px]"><button onClick={makePayment} className="bg-[#31603D] border border-[#31603D] text-[white] py-4 w-[350px] rounded-[100px] hover:bg-green-700">Make Payment</button></div>

                    {/* <div className="flex justify-center items-center h-scree">
  
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Overlay
      </Button>

     
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h1 className='font-bold text-[22px] mb-2'>Payment Successful</h1>
            <p className="text-[15px] mb-4">Your payment for Order ID  has been confirmed.
Please keep your device close as the delivery rider
would request your Order ID for confirmation</p>
            <button 
              onClick={goToDashboard} 
              variant="contained" 
              className="rounded-full px-20 py-2 border border-[#31603D] text-[white] bg-[#31603D] hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div> */}
                   
                    
                    </div>

          
        </>)}
      </div>

      </div>
    </div>
    
    <Footer/>
  </>)
}

export default Checkout
