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
// import { IoMdBicycle } from "react-icons/io";

function Checkout() {
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
        const [country, setCountry] = useState("");
        const [states, setStates] = useState("");

        const handleCountryChange = (e) => {
          setCountry(e.target.value);
          setStates("");
        };
        


        const handleButtonClick = () => {
            setShowThirdDiv(!showThirdDiv);
          };


        const handleIncrease = (productId) => {
            const currentQuantity = quantity[productId] || 0;
            const newQuantity = currentQuantity + 1;
            updateQuantity(productId, newQuantity);
          }
          const handleDecrease = (productId) => {
            const currentQuantity = quantity[productId] || 0;
            if(currentQuantity > 1){
              const newQuantity = currentQuantity - 1;
              updateQuantity(productId, newQuantity);
              
            }
          } 

  useEffect(() => {
          
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
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);


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

  return (<>
  <Navbar/>
    <div className="pt-[30px] pb-[50px] min-h-screen">
     
<div className="flex flex-col lg:flex-row items-center">

 <div className="flex flex-col pt-[50px] pb-[30px] bg-[#F9F9F9] w-full lg:min-h-screen overflow-y-auto max-h-72 no-scrollbar">
    <div className="flex justify-center pt-[px]">
            <div className="pt-[50px]">


    <div className="mb-[20px] flex justify-between items-center text-[12px]">
      <div className="font-bold text-[25px]">Checkout</div>
      <button className="flex border border-[#31603D] gap-x-[10px] px-[10px] py-2 items-center border-[1.5px] rounded-[20px] text-[#31603D]">
        <div><GrBasket className="size-[14px]"/></div>
        <div>Continue shopping</div>
      </button>
    </div>


            {Array.isArray(products) && products.length > 0 ? (
            <ul>
              {products.map((product) => (<>
                <div className="" key={product.product_id}>
                  
                <div className="bg-[] lg:pt-[30px]">
              <div className="font-bold ml-[10px]">Produce</div>
              <div className="flex">
                
                <div><img src={product} className="size-[90px]"/></div>
            
                <div className="flex flex-col lg:flex-row gap-[10px]">

                    <div>
                  <div>{product.name} - {product.weight}KG</div>
                  <div className="text-[grey] text-[15px]">Long grain rice (1 Bag)</div>
                 </div>

                  <div className="flex items-center gap-[15px]">
                   <div onClick={()=> deleteProduct(product)} className="bg-[#31603D] rounded-[50%] p-[8px]"><GoTrash className="size-[ text-[white]"/></div>
                   <div className="flex gap-x-[22px] items-center border border-[#31603D] rounded-[20px] px-[10px]">
                    <div onClick={()=> handleDecrease (product.product_id)}className="text"><FaMinus className="size-[12px]"/></div>
                    <div className="text-[18px]">{product.quantity}</div>
                    <div onClick={()=> handleIncrease(product.product_id)}className="text"><FaPlus className="size-[12px]"/></div>
                   </div>
                   <div className="font-semibold ml-[25px] text-[15px] whitespace-nowrap">NGN {product.price}</div>
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
          <div className="flex flex-col gap-y-[10px] mt-[100%] items-center">
           {/* <div className="flex justify-center bg-[white] p-6 rounded-full"><GrBasket className="size-[50px] bg-[red"/>
           </div> */}
           <div>No items here</div>
           {/* <div className="underline font-semibold text-[#31603D]"><Link to="/">Shop Now</Link></div> */}
           </div>
          </>)}
            </div>
            </div>
</div>



<div className="second-or-third-div flex flex-col justify-center bg-[white] lg:px-[100px]">
        {!showThirdDiv ? (<>
        <div className="flex flex-col justify-center items-center">
          
<div className="flex flex-col gap-y-[10px] mt-[30px]">
          <div className="text-[25px] font-bold">Delivery Details</div>
           <div className="text-[14px]">Complete your order by providing your delivery address</div>

          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><GrLocation className="size-[20px]"/></div>
          <div className="">
            
          <select
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none"
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
          
          </div>

          </div>

          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><PiMapPinArea className="size-[20px]"/></div>
          <div>
            
          <select 
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none"
          onChange={handleCountryChange} value={country}>
        <option className="text-[grey]" value="">Select a state</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        </select>
            
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><PiCity className="size-[20px]"/></div>
          <div>

          <select 
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none"
          value={state} disabled={country === ""}>
        <option value="">Select City</option>
        {country === "India" && (
          <><option key="Delhi">Delhi</option><option key="Punjab">Punjab</option><option key="Haryana">Haryana</option><option key="Goa">Goa</option></>
        )}
        {country === "USA" && (
          <><option key="California">California</option><option key="Texas">Texas</option><option key="New York">New York</option></>
        )}
        {country === "UK" && (
          <><option key="London">London</option><option key="Manchester">Manchester</option><option key="Birmingham">Birmingham</option></>
        )}
      </select>


            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><PiMapPinArea className="size-[20px]"/></div>
          <div>

          <input
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Adress">
      </input>


            </div>
          </div>

          </div>
          <div className="mt-[25px] px-[10px] py-[10px] bg-[#F9F9F9] w-[350px] rounded-[5px]">
            <p className="font-bold">Tip</p>
            <p>Can’t find your address? Use the nearest landmark, school, 
            church, hospital etc or type out a description.</p>
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
                    <div className="absolute right-[8px] lg:right-[80px]"><BsQuestionCircle className="size-[21px] text-[#31603D]"/></div>
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
                    
                    <div className="mt-[40px]"><button className="bg-[#31603D] border border-[#31603D] text-[white] py-4 w-[350px] rounded-[100px]" onClick={handleButtonClick}>Make Payment</button></div>
                    
                    </div>
          
        </>)}
      </div>


      </div>
    </div>
    
    <Footer/>
  </>)
}

export default Checkout
