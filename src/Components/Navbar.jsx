import React, { useState, useEffect, useContext } from 'react';
import pod from '../assets/Podlogo.svg';
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { MdPersonOutline } from "react-icons/md";
import { GrBasket } from "react-icons/gr";
import { PiNotepadBold } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
import produce from '../assets/Vector.svg';
import meat from '../assets/meat.svg';
import milk from '../assets/milk.svg';
import spice from '../assets/spice.svg';
import oil from '../assets/oil.svg';
import bread from '../assets/bread.svg';
import plastic from '../assets/plastic bottle.svg';
import laundry from '../assets/laundry.svg';
import beauty from '../assets/beauty.svg';
import toy from '../assets/toy.svg';
import stationery from '../assets/stationery.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Context.jsx';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import product from '../assets/Cart image.svg'
import { GoTrash } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { toast } from 'react-hot-toast';


function Navbar() {

  const [searchQuery, setSearchQuery] = useState(""); 
    const [searchResults, setSearchResults] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [quantity, setQuantity] = useState(
      Array.isArray(products)
      ? products.reduce((acc, product) => {
          acc[product.id] = product.quantity || 0;
          return acc;
        }, {})
      : {}
    );

    
  //  const getProducts = () => {
        
  //        fetch('https://apis.emarketpod.com/user/cart', {
  //          method: "GET",
  //          headers: {
  //            "Content-Type": "application/json",
  //            Authorization: state.token,
             
  //          },
  //        })
  //        .then((response) => response.json())
  //          .then((data) => {
  //            setProducts(data);
  //          })
  //          .catch((error) => {
  //            console.error(error);
  //          });
  //      };


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
  }, [refresh]);
   
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


  const handleSearch = () => {
   
     if(!searchQuery){
          toast.error('Please search a stall or product');
        }

    fetch(`https://apis.emarketpod.com/site/search?query=${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/search", { state: { searchQuery, searchResults: data.results } });
       
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      })
      .finally(() => {
      
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    // getProducts();
    setRefresh(!refresh);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);


  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const categories = [
    { id: 1, name: 'Produce', image: produce, items: ['Produce', 'Fruit', 'Vegetable'] },
    { id: 2, name: 'Meat & Seafood', image: meat, items: ['Meat', 'Poultry', 'Seafood'] },
    { id: 3, name: 'Dairy & Eggs', image: milk, items: ['Diary Products', 'Eggs', 'Dairy Alternatives'] },
    { id: 4, name: 'Herbs & Spice', image: spice, items: ['Fresh & Dried Herbs', 'Spices & Seeds', 'Seasoning & Blends'] },
    { id: 5, name: 'Oil and Vinegar', image: plastic, items: ['Cooking Oils', 'Infused Oils', 'Vinegars'] },
    { id: 6, name: 'Beverage & Packed Foods', image: bread, items: ['Beverage', 'Packaged Foods', 'Snacks'] },
    { id: 7, name: 'Plasticware & Bags', image: oil, items: ['Plastiware', 'Plastic Bags', 'Special Plasticware'] },
    { id: 8, name: 'Laundry', image: laundry, items: ['Detergents & Soaps', 'Fabric Care Products', 'Laundry Accessories'] },
    { id: 9, name: 'Health & Beauty', image: beauty, items: ['Personal Care & Hygiene', 'Hair Care', 'Skin Care & Beauty'] },
    { id: 10, name: 'Baby & Kids', image: toy, items: ['Baby Care Essentials', 'Baby Food & Feeding', 'Kids Clothing & Accessories'] },
    { id: 11, name: 'Stationery', image: stationery, items: ['Writing & Drawing Tools', 'Office Suppliers & Organizers'] },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1020) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">

     <div className="bg-[#F9F9F9] min-h-screen">
      <div className="bg-[white] z-50 fixed h-[50px] w-[200%] overflow-x-hidden overflow-y-hidden w-full">
      
        <div className="flex items-center my-[10px] mx-[10px] gap-[260px]">
        <div className="text-[20px] ml-[20px] text-[#31603D] font-semibold">Cart({products.length})</div>
        <div onClick={toggleDrawer(false)} className=""><LiaTimesSolid className="size-[25px] text-[#31603D]"/></div>
        </div>
      
        </div>

        <div className="flex justify-center pt-[px]">
        <div className="pt-[50px] pb-[50px]">

        {Array.isArray(products) && products.length > 0 ? (
        <ul className="">
          {products.map((product) => (<>
            <div className="bg-[]" key={product.product_id}>
              
            <div className="bg-[] pt-[20px]">
          <div className="font-bold ml-[10px]">Produce</div>
          <div className="flex">
            <div><img src={product} className="size-[90px]"/></div>
            <div className="flex flex-col gap-[10px]">
              <div>{product.name} - {product.weight}KG</div>
              <div className="text-[grey] text-[15px]">Long grain rice (1 Bag)</div>
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
          </>

        ))}
          <div className="fixed bottom-[-50px] bg-[white] py-[50px] pb-[150px] items-center px-[20px] flex justify-center">
             <button className="text-[white] bg-[#31603D] py-[8px] px-[100px] border border-[#31603D] rounded-[20px] whitespace-nowrap"><Link to="/checkout">Proceed to Checkout</Link></button>
           </div>
        </ul>
        
      ) : (<>
      <div className="flex flex-col gap-y-[10px] mt-[100%] items-center">
       <div className="flex justify-center bg-[white] p-6 rounded-full"><GrBasket className="size-[50px] bg-[red"/>
       </div>
       <div>Your personal cart is empty</div>
       <div className="underline font-semibold text-[#31603D]"><Link to="/">Shop Now</Link></div>
       </div>
      </>)}
        </div>
        </div>
        
        </div>

    </Box>
  );

  
  return (<>
   <nav className="bg-white z-50 fixed shadow-md overflow-x-hidden overflow-y-hidden w-full">
      <div className="mx-auto py-[13px] my-auto px-4 lg:ml-[40px]">
        <div className="flex justify-between h-[70px]">
          <div className="flex items-center">

          <div className="ml-[-20px] flex justify-center lg:ml-[-10px]">
           <img src={pod} onClick ={() => navigate("/")} className="size-[150px]"/>
         </div>
         <div className="h-[50px] ml-[25px] hidden border-l border-gray-300 lg:flex justify-between"></div>

         <div className="ml-[30px] hidden lg:flex flex-col">
          <div className="font-bold text-[13px]">Location</div>
          <div className="flex flex-row items-center gap-[7px]">
            <div><GrLocation className="size-[16px]"/></div>
            <div className="text-[13px] text-[#31603D] font-bold">...</div>
            <div><IoIosArrowDown onClick={openModal} className="size-[16px]"/></div>
          </div>
         </div>

         <div className="absolute right-[170px] flex flex-row items-center gap-x-[50px]">

         <div className="flex flex-row items-center hidden lg:flex md:hidden">
         <RiSearchLine onClick={handleSearch} className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[#F9F9F9] focus:outline-none text-[13px]"
          placeholder="Search Stalls & products"
      />
         </div>

         <div className="hidden lg:flex flex-col">
          <div className="font-bold text-[13px]">Account</div>
          <div className="flex flex-row items-center gap-[7px]">
            <div><MdPersonOutline className="size-[20px]"/></div>
            <Link to="/signin"><div className="text-[13px] text-[#31603D] font-bold underline">Login</div></Link>
            <div>or</div>
            <Link to="/signup"><div className="text-[13px] text-[#31603D] font-bold underline">Create Account</div></Link>
          </div>
         </div>

         {state.token &&<div className="flex flex-col items-center hidden lg:flex flex-col">
          <div className="font-bold text-[13px]">Orders</div>
            <div><PiNotepadBold className="size-[20px]"/></div>
         </div>}
          
         
         
         <div onClick={toggleDrawer(true)} className="hidden lg:flex flex-col">
         {products.length > 0 && <div className="border border-[#F5C065] size-[16px] bg-[#F5C065] rounded-[100%] absolute right-[20px] top-[18px]"></div>}
          <div className="font-bold text-[13px]">Cart</div>
          <div className="flex flex-row items-center gap-[7px]">
            <div><GrBasket className="size-[20px]"/></div>
            <div className="fixed right-[8%] text-[13px] text-[#31603D] font-bold">{products.length} Item(s)</div>
          </div>
         </div>

         

        </div>

        <div className="absolute right-[30px] flex flex-row gap-x-[30px] items-center">
         {state.token &&<div className="flex flex-col items-center lg:hidden">
            <div><PiNotepadBold className="size-[20px]"/></div>
         </div>}

         
         <div onClick={toggleDrawer(true)} className="lg:flex flex-col lg:hidden">
         {products.length > 0 && <div className="border border-[#F5C065] size-[16px] bg-[#F5C065] rounded-[100%] absolute right-[63px] top-[-4px]"></div>}
            <div><GrBasket className="size-[20px]"/></div>
         </div>

         <button onClick={toggleSidebar}>
         <div className="grid grid-cols-2 gap-[1px] lg:hidden">
          <div className="w-[9px] h-[9px] border-[2px] border-black rounded-[3px]"></div>
          <div className="w-[9px] h-[9px] border-2 border-black rounded-[3px]"></div>
          <div className="w-[9px] h-[9px] border-2 border-black rounded-[3px]"></div>
          <div className="w-[9px] h-[9px] border-2 border-black rounded-[3px]"></div>
        </div>
        </button>
         </div>

         {isModal && (
        <>
      
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-10 flex"
            onClick={closeModal} 
          ></div>


          <div className="fixed mt-[300px] left-1/2 transform -translate-x-1/2 justify-center z-50 flex items-center w-[300px] h-[300px]">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full pb-[40px]">
              <div className="flex flex-row">
              <h2 className="text-[15px] font-bold mb-4 text-[#31603D]">Select Location</h2>
            <div className="absolute right-[30px] font-bold" onClick={closeModal}><LiaTimesSolid className="size-[20px] text-[#31603D]"/></div>
            </div>
              <div className="flex flex-row items-center mb-[10px]">
         <GrLocation className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          className="w-full border border-gray-300 pl-[50px] py-[10px] pr-[20px] rounded-[100px] focus:outline-none text-[13px]"
      />
         </div>

              <button
                className="font-bold text-[15px] w-full bg-[#31603D] py-[10px] pr-[20px] text-white rounded-[100px]"
              >
                Proceed
              </button>
            </div>
          </div>
        </>
      )}

         <div
        className={`fixed z-10 top-0 left-0 h-full w-full bg-[white] text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="text-black p-4">
          <div className="flex ml-[20px] mt-[15px] gap-x-[200px]">

          <div>
            <div><GrLocation className="size-[20px]"/></div>
          </div>

          <LiaTimesSolid className="hover:bg-[grey] size-[25px] absolute right-[45px] text-[#31603D]" onClick={toggleSidebar}/>
          </div>

          <div className="flex lg:mt-[-100px] items-center justify-center my-3">
          <hr className="w-[45%] border-t border-gray-300" />
          <hr className="w-[45%] border-t border-gray-300" />
          </div>


          <div className="p-4">
        <div className="flex flex-col gap-y-[20px]">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-y-2">
              <div
                className="flex items-center gap-x-3 cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <img src={category.image} alt={category.name} className="w-6 h-6" />
                <span className="text-[16px]">{category.name}</span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    expandedCategory === category.id ? 'rotate-0' : 'rotate-0'
                  }`}
                />
              </div>
              {expandedCategory === category.id && (
                <div className="pl-[50px]">
                  {category.items.map((item, index) => (
                    <p key={index} className="text-[14px] text-gray-600">
                      <div className="flex flex-row gap-x-[10px]">
                      {item}
                      
                      </div>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-[10px]">
          <hr className="w-[50%] border-t border-gray-300" />
          <hr className="w-[50%] border-t border-gray-300" />
          </div>

          <div className="flex flex-row gap-x-[5px] items-center">
            <div><MdPersonOutline className="size-[20px]"/></div>
            <Link to="/signin"><div className="font-bold underline text-[#31603D]">Login</div></Link>
            or
            <Link to="/signup"><div className="font-bold underline text-[#31603D]">Create Account</div></Link>
          </div>
          

        </div>
        
      </div>

      


      </div>
      </div>
      </div>
      <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
    </nav>
  </>
  )
}



export default Navbar


