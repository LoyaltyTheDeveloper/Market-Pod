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
    <div className="pt-[100px] pb-[50px] bg-[#F9F9F9] min-h-screen">
     
<div className="flex flex-col lg:flex-row items-center">
 <div className="flex flex-col bg-[red]">
    <div className="flex justify-center pt-[px]">
            <div className="pt-[50px]">
    
            {Array.isArray(products) && products.length > 0 ? (
            <ul>
              {products.map((product) => (<>
                <div className="" key={product.product_id}>
                  
                <div className="bg-[] pt-[20px]">
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



<div className="second-or-third-div flex flex-col justify-center">
        {!showThirdDiv ? (<>
        <div className="flex flex-col justify-center items-center">

          <div>Delivery Details</div>
          <div>Complete your order by providing your delivery address</div>
<div className="flex flex-col gap-y-[20px]">
          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><GrLocation className="size-[20px]"/></div>
          <div className=""><input className="border border-[grey]-300 py-4 pl-[50px] w-[300px] pr-[50px] rounded-[100px] w-[100%] focus:outline-none"></input></div>
          </div>
          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><PiHouseLineBold className="size-[20px]"/></div>
          <div><input className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[130%] focus:outline-none"></input></div>
          </div>
          <div className="flex flex-row items-center">
            <div className="absolute ml-[20px]"><PiMapPinArea className="size-[20px]"/></div>
          <div><input className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[130%] focus:outline-none"></input></div>
          </div>
          </div>
          </div>
            <button onClick={handleButtonClick}>Go to Third Div</button>
          
        </>) : (
          <div className="third-div">
            <h2>This is the third div</h2>
            <p>You have switched from the second div to the third div.</p>
            <button onClick={handleButtonClick}>Go to Third Div</button>
          </div>
        )}
      </div>


      </div>
    </div>
    
    <Footer/>
  </>)
}

export default Checkout
