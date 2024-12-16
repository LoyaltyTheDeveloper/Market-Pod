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


function Navbar() {
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

         <div className="absolute right-[120px] flex flex-row items-center gap-x-[50px]">

         <div className="flex flex-row items-center hidden lg:flex md:hidden">
         <RiSearchLine className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[#F9F9F9] focus:outline-none text-[13px]"
          placeholder="Search Markets, Shops, Products..."
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

         <div className="hidden lg:flex flex-col">
          <div className="font-bold text-[13px]">Cart</div>
          <div className="flex flex-row items-center gap-[7px]">
            <div><GrBasket className="size-[20px]"/></div>
            <div className="text-[13px] text-[#31603D] font-bold">0 Item(s)</div>
          </div>
         </div>

        </div>

        <div className="absolute right-[30px] flex flex-row gap-x-[30px] items-center">
         {state.token &&<div className="flex flex-col items-center lg:hidden">
            <div><PiNotepadBold className="size-[20px]"/></div>
         </div>}

         <div className="lg:flex flex-col lg:hidden">
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

      
      
     <div>Like and suscribe</div>


      </div>
      </div>
      </div>
    </nav>
  </>
  )
}



export default Navbar


