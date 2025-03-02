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

function Checkout() {
  const navigate = useNavigate();
   trio.register()
     const { state } = useContext(AuthContext);
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



        const handleCityChange = (e) => {
          setCity(e.target.value);
          
        };
        const handleStatesChange = (e) => {
          setStates(e.target.value);
          setCity("");
        };

        const handleButtonClick = () => {
            setShowThirdDiv(!showThirdDiv);
          };


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
        .then((response) => response.json())
          .then((data) => {
            toast.success(data.message);
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
        .then((response) => response.json())
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

      const order ={
         location_id:selectedLocation,
         address:address,
         city:city,
         state:states
      }

      const makePayment = () => {
        console.log(order)
        setIsLoading(true);
        fetch('https://apis.emarketpod.com/user/order/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: state.token,
          },
          body: JSON.stringify(order),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === true) {
            toast.success(data.message);
            setIsLoading(false);
            navigate('/dashboard');
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

      const displayName = `${state.user.last_name ? (state.user.last_name == '' ? 'Full name' : state.user.last_name) : "Full name"} ${state.user.first_name ?? ''}`;
      const displayPhone = `${state.user.phone_number ? (state.user.phone_number == '' ? 'Phone Number' : state.user.phone_number) : "Phone Number"} ${state.user.phone_number2 ?? ''}`;

       const { cartOne, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);

       const formatNumber = (num) => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

  return (<>
  <Navbar/>

  {isLoading &&  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}

    <div className="pt-[30px] pb-[50px] min-h-screen">
     
<div className="flex flex-col lg:flex-row items-center">

 <div className="flex flex-col pt-[50px] lg:pt-[70px] pb-[30px] bg-[#F9F9F9] w-full lg:min-h-screen overflow-y-auto max-h-72 no-scrollbar">
    <div className="flex justify-center pt-[px]">
            <div className="pt-[50px]">


    <div className="mb-[20px] flex flex-row gap-x-[110px] lg:gap-x-[310px] items-center text-[12px] lg:mt-[-30px] justify-between">
      <div className="font-bold text-[25px]">Checkout</div>
      <button className="flex border border-[#31603D] gap-x-[10px] px-[10px] py-2 items-center border-[1.5px] rounded-[20px] text-[#31603D]">
        <div><GrBasket className="size-[14px]"/></div>
        <div>Continue shopping</div>
      </button>
    </div>


     {state.token && <div>
            {Array.isArray(products) && products.length > 0 ? (
            <ul>
              {products.map((product) => (<>
                <div className="relative" key={product.product_id}>
                  
                <div className="bg-[] pt-[10px] lg:pt-[30px]">
              {/* <div className="font-bold ml-[10px]">Produce</div> */}
              <div className="flex">
                
                <div><img src={product} className="size-[90px]"/></div>
            
                <div className="flex flex-col lg:flex-row gap-[10px] lg:gap-[0px]">

                    <div className="lg:w-[300px]">
                  <div>{product.name} - {product.weight}KG</div>
                  <div className="text-[grey] text-[15px]">Long grain rice (1 Bag)</div>
                 </div>

                  <div className="flex items-center gap-[15px]   ">
                   <div onClick={()=> deleteProduct(product)} className="bg-[#31603D] rounded-[50%] p-[8px]"><GoTrash className="size-[ text-[white]"/></div>
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
                
                <div><img src={product} className="size-[90px]"/></div>
            
                <div className="flex flex-col lg:flex-row gap-[10px] lg:gap-[0px]">

                    <div className="lg:w-[300px]">
                  <div>{product.name} - {product.weight}KG</div>
                  <div className="text-[grey] text-[15px]">Long grain rice (1 Bag)</div>
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
        <div className="flex flex-col justify-center items-center lg:py-16">
          
<div className="flex flex-col gap-y-[10px] mt-[30px]">
          <div className="text-[25px] font-bold">Delivery Details</div>
           <div className="text-[14px]">Complete your order by providing your delivery address</div>

           <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><TbUserEdit className="size-[20px]"/></div>
          <div>

          <input
         
          // disabled
          name="phone"
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Full Name">
      </input>


            </div>
          </div>


           <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><FiPhone className="size-[20px]"/></div>
          <div>

          <input
      
          // disabled
          name="phone"
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Phone Number">
      </input>


            </div>
          </div>

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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          name="address"
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Riders Instruction (Optional)">
      </input>


            </div>
          </div>


          <div className="mt-[25px]"><button className="bg-[#31603D] border border-[#31603D] text-[white] py-4 w-[350px] rounded-[100px]" onClick={handleButtonClick}>Proceed</button></div>
          
          </div>



        

          
                   
        </>) : (<>

          <div className="flex flex-col justify-center items-center">
          
          <div className="flex flex-col gap-y-[10px] mt-[30px] lg:mt-[-50px]">
                    <div className="text-[25px] font-bold">Order Details</div>
                     <div className="text-[14px]">Confirm your order details before making payment.</div>
          
          
                   <div className="flex flex-col gap-y-[30px] mt-[30px]">
                    <div className="flex justify-between">
                      <div>Order Value</div>
                      <div className="font-bold">NGN 32500</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Delivery Fee</div>
                      <div className="font-bold">NGN 32500</div>
                    </div>
                    
                    <div className="">
                    <div className="absolute right-[8px] lg:right-[80px]"><Link to="/service"><BsQuestionCircle className="size-[21px] text-[#31603D]"/></Link></div>
                    <div className="flex justify-between">
                      <div>Service Charge</div>
                      <div className="font-bold">NGN 32500</div>
                    </div>
                    </div>

                    <div className="flex justify-between">
                      <div>VAT</div>
                      <div className="font-bold">NGN 32500</div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between">
                      <div>Total</div>
                      <div className="font-bold">NGN 32500</div>
                    </div>
                    <hr></hr>
                   </div>
          
                    </div>
                    
                    <div className="mt-[40px]"><button className="bg-[#31603D] border border-[#31603D] text-[white] py-4 w-[350px] rounded-[100px]" onClick={makePayment}>Make Payment</button></div>
                    
                    </div>
          
        </>)}
      </div>


      </div>
    </div>
    
    <Footer/>
  </>)
}

export default Checkout
