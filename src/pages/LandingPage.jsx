import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { RiSearchLine } from "react-icons/ri";
import Footer from '../Components/Footer';
import { useState, useEffect } from 'react';
import { LuClock5 } from "react-icons/lu";
import "../index.css"
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import dropdownData from '../index.json'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Context.jsx';
import { LiaTimesSolid } from "react-icons/lia";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



function LandingPage({ markets }) {

  const [marketss, setMarketss] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDropdown, setSelectedCategory] = useState(null);
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  const openModal = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };
  

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
   dispatch({type: 'LOG_OUT', payload: {token: null}})
   alert("logged out");
   }

  useEffect(() => {
    fetch('https://test.tonyicon.com.ng/site/getData')
    .then((response) => response.json())
    .then((data) => setMarketss(data.markets))
    .catch((error) => console.error(error))
}, [])

  return (<>
  <Navbar/>
  <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">
          
<div className="App">
      {/* Main Dropdown Display */}
      
      <div className="h-[70px] flex flex-row px-[20px] lg:space-x-[100px] mt-[130px] justify-center items-center">
        {dropdownData.dropdowns && dropdownData.dropdowns.length > 0 ? (
          dropdownData.dropdowns.map((item) => (
            <div
              key={item.id}
              className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center cursor-pointer"
              // onMouseLeave={() => closeModal()}
              onMouseOver={() => openModal(item)}
              onMouseLeave={() => closeModal()}
            >
              <img
                src={item.image}
                alt={item.name}
                className="size-[20px]"
                // onMouseEnter={() => openModal(item)}
                // onMouseLeave={() => closeModal()} // closes modal on image leave
              />
              <p className="text-[12px] whitespace-nowrap">{item.name}</p>
            </div>
          ))
        ) : (
          <p>No items to display</p>
        )}
      </div>


      {/* Modal */}
      {selectedDropdown && (
        
          <div
            className="bg-white w-[75%] z-50 absolute lg:w-[98%] lg:h-[300px] p-6 rounded-lg overflow-y-auto flex items-center justify-center"
            
          >

            {/* Display categories in modal */}
            <div className="flex flex-col justify-center lg:flex-row">
              {selectedDropdown.categories.map((category, index) => (
                <div key={category.id} className="flex items-start gap-1 lg:gap-x-[50px]">
                  <div className="flex-1">
                    <h3 className="text-[18px] font-semibold mb-4 whitespace-nowrap">{category.category}</h3>

                    {/* Display items in two columns */}
                   
                    <div className="grid grid-cols-2 gap-y-4 lg:gap-x-[10px] mb-4">
                      {category.items.map((item, itemIndex) => (
                        <span key={itemIndex} className="text-gray-700 text-[15px] whitepsace-nowrap">
                          {item}
                        </span>
                      ))}
                    </div>
                   

                  </div>

                  {/* Category image */}
                  <div>
                    <img
                      src={category.image}
                      className="w-12 h-12 object-cover"
                    />
                  </div>

                  {/* Vertical line, except after the last category */}
                  {index < selectedDropdown.categories.length - 1 && (
                    <div className="hidden lg:flex h-[200px] ml-[10px] mr-[10px] border-l border-gray-300 lg:flex justify-between px-[30px]"></div>
                  )}
                </div>
              ))}
            </div>

          </div>

      )}
    </div>

    
    <div className="flex justify-center mt-[-70px] lg:hidden">
    <div className="flex flex-row items-center">
         <RiSearchLine className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[white] focus:outline-none text-[13px]"
          placeholder="Search Markets, Shops, Products..."
      />
         </div>
    </div>
    
    <div>

      {/* <button onClick={Logout}>Logout</button> */}

      {/* <button className="text-[30px]" onClick={Logout}>Logout</button> */}
    
<div className="mt-[30px]">
  {marketss?.length > 0 ? (
    marketss.map((market) => (
      <div key={market.id} className="flex flex-col mb-[30px]">
      
      <div className="flex items-center">
        <div>
        <div className="font-bold text-[21px] lg:text-[30px] ml-[20px]">{market.name || <Skeleton width={200} />}</div>
        <div className="w-[270px] lg:w-[100%] md:w-[100%] text-[14px] lg:text-[16px] flex flex-wrap ml-[20px]">
          {market.addr || <Skeleton width={250} />}
        </div>
        </div>

        <div className="flex items-center gap-x-[20px] absolute right-[30px]">
         <button className="text-[#31603D]" onClick ={() => navigate(`/site/getStores/${market.id}/${market.name}/${market.addr}`)}> View all</button>
        <div className="hidden lg:flex"><MdOutlineArrowBackIos className="text-[grey] size-[30px]"/></div>
        <div className="hidden lg:flex"><MdOutlineArrowForwardIos className="size-[30px]"/></div>
        </div>
        </div>

        <div className="mt-[5px] pt-[20px] flex lg:flex justify-start">

        <div className="flex overflow-x-scroll scrollbar-hide whitespace-nowrap space-x-4 p-4 lg:flex justify-start">
          <div className="flex gap-[20px] lg:flex-row justify-center lg:flex justify-start">
            {market.stores.map((store) => (
              <div
                key={store.id}
                className="flex flex-col bg-[white] border border-[transparent] w-[360px] lg:w-[310px] h-[auto] rounded-[10px] lg:flex justify-start"
              >
            
                <div>
                  <div className="h-[150px]">
                  <img
                    src={store.image}
                    
                    className="w-full h-full object-cover rounded-tl-[10px] rounded-tr-[10px]"
                  />
                  </div>
                </div>

                <div className="pt-[5px] pl-[15px] flex flex-col gap-y-[10px]">
                  <div className="text-[19px] font-bold whitespace-nowrap">
                    {store.name || <Skeleton width={200} />}
                  </div>
                  <div className="flex items-center gap-x-[5px] text-[#31603D]">
                    <div><LuClock5/></div>
                    <div className="text-[15px]">
                     {store.open_time && store.close_time ? `Opens ${store.open_time} - Closes ${store.close_time}` : <Skeleton width={150} />}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mb-[15px]">
                    {store.categories.map((category, index) => (
                      <div className="flex items-center" key={index}>
                        {category}
                        {index < store.categories.length - 1 && (
                          <div className="h-[20px] ml-[10px] mr-[10px] border-l border-gray-300 lg:flex justify-between"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>


        </div>
      </div>
    ))
  ) : (
    Array(3)
          .fill("")
          .map((_, index) => (
            <div key={index} className="flex flex-col mb-[30px] justify-center">
              <div className="flex items-center">
              <div className="flex flex-col">
              <div className="flex items-center ">
                <div>
                  <Skeleton width={200} height={30} className="ml-[20px]"/>
                  <Skeleton width={150} height={20} className="mt-[10px] ml-[20px]" />
                </div>
              </div>
              <div className="mt-[20px] ml-[20px]">
                <Skeleton height={150} width={360}/>
              </div>
              </div>

              <div className="flex flex-col">
              
              <div className="mt-[80px] ml-[20px]">
                <Skeleton height={150} width={360}/>
              </div>
              </div>
              <div className="flex flex-col">
              
              <div className="mt-[80px] ml-[20px]">
                <Skeleton height={150} width={360}/>
              </div>
              </div>
              </div>
            </div>
          ))
  )}
</div>

{/* <div className="mt-[30px]">
  {marketss?.length > 0 && (
    marketss.map((market) => (
      <div key={market.id} className="flex flex-col mb-[30px]">
      
      <div className="flex items-center">
        <div>
        <div className="font-bold text-[21px] lg:text-[30px] ml-[20px]">{market.name || <Skeleton width={200} />}</div>
        <div className="w-[270px] lg:w-[100%] md:w-[100%] text-[14px] lg:text-[16px] flex flex-wrap ml-[20px]">
          {market.addr}
        </div>
        </div>

        <div className="flex items-center gap-x-[20px] absolute right-[30px]">
         {state.token &&<button className="text-[#31603D]" onClick ={() => navigate(`/site/getStores/${market.id}/${market.name}/${market.addr}`)}> View all</button>}
         {!state.token &&<button className="text-[#31603D]" onClick ={() => navigate('/signin')}> View all</button>}
        <div className="hidden lg:flex"><MdOutlineArrowBackIos className="text-[grey] size-[30px]"/></div>
        <div className="hidden lg:flex"><MdOutlineArrowForwardIos className="size-[30px]"/></div>
        </div>
        </div>

        <div className="mt-[5px] pt-[20px] flex lg:flex justify-start">

        <div className="flex overflow-x-scroll scrollbar-hide whitespace-nowrap space-x-4 p-4 lg:flex justify-start">
          <div className="flex gap-[20px] lg:flex-row justify-center lg:flex justify-start">
            {market.stores.map((store) => (
              <div
                key={store.id}
                className="flex flex-col bg-[white] border border-[transparent] w-[360px] lg:w-[310px] h-[auto] rounded-[10px] lg:flex justify-start"
              >
            
                <div>
                  <div className="h-[150px]">
                  <img
                    src={store.image}
                    
                    className="w-full h-full object-cover rounded-tl-[10px] rounded-tr-[10px]"
                  />
                  </div>
                </div>

                <div className="pt-[5px] pl-[15px] flex flex-col gap-y-[10px]">
                  <div className="text-[19px] font-bold whitespace-nowrap">
                    {store.name}
                  </div>
                  <div className="flex items-center gap-x-[5px] text-[#31603D]">
                    <div><LuClock5/></div>
                    <div className="text-[15px]">
                     Opens ${store.open_time} - Closes ${store.close_time}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mb-[15px]">
                    {store.categories.map((category, index) => (
                      <div className="flex items-center" key={index}>
                        {category}
                        {index < store.categories.length - 1 && (
                          <div className="h-[20px] ml-[10px] mr-[10px] border-l border-gray-300 lg:flex justify-between"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>


        </div>
      </div>
    ))
  )}
</div> */}




</div>
    </div>
  <Footer/>
  </>)
}

export default LandingPage
