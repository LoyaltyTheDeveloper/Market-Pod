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
import landing1 from '/assets/landing1.svg'
import landing3 from '/assets/landing3.svg'
import landing4 from '/assets/landing4.svg'
import landing5 from '/assets/landing5.svg'
import landing7 from '/assets/landing7.svg'
import { FaPlus } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'


function LandingPage({ markets }) {
   trio.register()
   const [isLoading, setIsLoading] = useState(false);
  const [marketss, setMarketss] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDropdown, setSelectedCategory] = useState(null);
  const { state } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // For user input
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();


  const handleSearch = () => {
   setIsLoading(true);
    if(!searchQuery){
      toast.error('Please search a stall or product');
    }
    fetch(`https://apis.emarketpod.com/site/search?query=${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        navigate("/search", { state: { searchQuery, searchResults: data.results } });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching search results:", error);
      })
      .finally(() => {
      
      });
  };

 const addToCart = () => {
  alert();
 }

 const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
};
  

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
    fetch('https://apis.emarketpod.com/site/getData')
    .then((response) => response.json())
    .then((data) => setMarketss(data.markets))
    .catch((error) => console.error(error))
}, [])


const marketsss = Array.isArray(searchResults) ? searchResults.filter((result) => result.type === "market") : [];
const products = Array.isArray(searchResults) ? searchResults.filter((result) => result.type === "product") : [];

  return (<>
  <Navbar/>
 <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">
          
<div onMouseLeave={() => closeModal()} className="App">
      {/* Main Dropdown Display */}
      <div className="h-[70px] flex flex-row gap-x-[30px] justify-evenly whitespace-nowra mt-[130px] justify-center">
        {dropdownData.dropdowns && dropdownData.dropdowns.length > 0 ? (
          dropdownData.dropdowns.map((item) => (<>

 <div  className="flex flex-col justify-center items-center hidden lg:flex">
            <div
              key={item.id}
              className="hidden lg:flex lg:flex-col color-[grey] size-[25px] text-[grey]  items-center cursor-pointer"
              onMouseOver={() => openModal(item)}
              
            >
           
              <img
                src={item.image}
                alt={item.name}
                className="size-[20px]"
                
              />

            </div>

             <div className="cursor-pointer">
             <p className="text-[12px]">{item.name}</p>
             </div>
         </div>
          </>))
        ) : (
          <p></p>
        )}
      </div>

      {isLoading &&  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}

      {/* Modal */}
      {selectedDropdown && (
        
          <div onMouseLeave={() => closeModal()} className="flex hidden lg:flex justify-center items-center bg-[white] w-[75%] z-50 absolute lg:w-[100%] lg:h-[300px] p-6 rounded-lg overflow-y-auto flex items-center justify-center"
            
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
                    <div className="hidden lg:flex h-[200px] border-l border-gray-300 lg:flex justify-between px-[30px]"></div>
                  )}
                </div>
              ))}
            </div>

          </div>

      )}
    
    </div>
    

    
    <div className="flex justify-center mt-[-70px] lg:hidden">
    <div className="flex flex-row items-center">
         <RiSearchLine onClick={handleSearch} className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[white] focus:outline-none text-[13px]"
          placeholder="Search Stalls & Products"
      />
         </div>
    </div>
    
    <div>

      {/* <button onClick={Logout}>Logout</button> */}

      {/* <button className="text-[30px]" onClick={Logout}>Logout</button> */}
    
<div>

<div className="mt-[30px]">
  {marketss?.length > 0 ? (
    marketss.map((market, index) => (
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
                onClick ={() => navigate(`/site/getStore/${store.id}`)}
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
        {index === 1 && (<>
        
        {!state.token &&
                <div className="mt-[20px] mb-[20px]">
                <div className="flex flex-col lg:flex-row px-4 gap-x-[100px] gap-y-[20px]">
                  <div className="flex flex-col gap-y-[10px]">
                    <div className="w-[70%] lg:w-[380px] text-[30px] lg:text-[40px] font-bold">Skip the delivery fees</div>
                    <div className="lg:w-[518px]">New customers get DeliveryPass perks on us for 60 days, including unlimited free delivery, timeslot reservations, and exclusive savings.</div>
                    <div className="text-[#31603D] underline lg:mt-[20px]"><Link to="/signup">Create Account</Link></div>
                  </div>
                  <div className="">
                    <img className="object-cover rounded-[10px]" src={landing1}/>
                  </div>
                </div>
                </div>}

                {state.token &&
                <div className="mt-[20px] mb-[20px]">
                <div className="flex flex-col lg:flex-row px-4 gap-x-[100px] gap-y-[20px]">
                  <div className="flex flex-col gap-y-[10px]">
                    <div className="w-[70%] lg:w-[380px] text-[30px] lg:text-[40px] font-bold">Popular products right now</div>
                    <div className="lg:w-[518px]">Check out these hot items that everyone is raving about, from everyday customers favorites to unique items you wont find anywhere else !</div>
                    <div className="text-[#31603D] underline lg:mt-[20px]">View all</div>
                  </div>
                  <div className="lg:w-[100%]">
                    <img className="object-cover rounded-[10px] size-[100%] lg:w-[full]" src={landing7}/>
                  </div>
                </div>
                </div>}
                

                <div className="hidden">
                <div className="flex flex-col lg:flex-row px-4 gap-x-[100px] gap-y-[20px]">
                  <div className="flex flex-col gap-y-[10px]">
                    <div className="w-[70%] lg:w-[450px] text-[30px] lg:text-[40px] font-bold">Back to School Food Bundle For 50k !</div>
                    {/* <div className="lg:w-[518px]">New customers get DeliveryPass perks on us for 60 days, including unlimited free delivery, timeslot reservations, and exclusive savings.</div> */}
                    <ul className="list-disc pl-8 text-[14px]">
                      <div className="flex gap-x-[50px]">
                      <div className="space-y-2">
                      <li>10KG Rice</li>
                      <li>1lt Ground Nut Oil</li>
                      <li>Half Pack Indomie</li>
                      <li>5 Tubers of Yam</li>
                      </div>
                      <div className="space-y-2">
                      <li>1 Box of Spaghetti </li>
                      <li>15g Golden Morn</li>
                      <li>25g Corn Flakes Box</li>
                      <li>Seasoning Mixture</li>
                      </div>
                      </div>
                    </ul>
                    <div className="mt-[50px]"><button className="border border-[#31603D] bg-[#31603D] px-14 py-3 rounded-full text-white text-[14px]">Add to cart</button></div>
                  </div>
                  <div className="">
                    <img className="object-cover rounded-[10px]" src={landing5}/>
                  </div>
                </div>
                </div>
                
              </>)}

      {index === marketss.length -1 && (
        <div className="mt-[20px] mb-[60px] flex justify-center">
        <div className="flex flex-col lg:flex-row px-[15px]">
          <div className="bg-[#31603D] rounded-tl-[5px] rounded-tr-[5px] lg:rounded-tr-[0px] lg:rounded-tl-[10px] lg:rounded-bl-[10px] text-[white] lg:px-[80px] flex flex-col justify-center text-center p-6">
          <div className="text-[21px] lg:text-[40px] whitespace-nowap font-bold">There's more to explore</div>
          <div className="text-[12px]">There are 106 stores (and counting) available in</div>
          <div className="text-[12px]"><span className="underline">Ilorin, Kwara State.</span> <span>Explore them all with</span></div>
          <div className="text-[12px]">Market Pod today !</div>
          <div><button className="font-bold bg-[#F5C065] border border-[#F5C065] text-[white] mt-[20px] py-[10px] px-[15px] lg:py-[12px] lg:px-[30px] rounded-[25px] text-[14px] lg:text-[16px]">View more</button></div>
          </div>
          <div className="hidden lg:flex w-[350px] h-[300p]"><img className="object-cover" src={landing3}/></div>
          <div className="lg:hidden w-[full]"><img className="object-cover w-[100%]" src={landing4}/></div>
        </div>
      </div>
      )}

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
</div>

{/* <div>
<div className="flex flex-col lg:flex-row px-4 gap-x-[100px] gap-y-[20px]">
  <div className="flex flex-col gap-y-[10px]">
    <div className="w-[70%] lg:w-[380px] text-[30px] lg:text-[40px] font-bold">Skip the delivery fees</div>
    <div className="lg:w-[518px]">New customers get DeliveryPass perks on us for 60 days, including unlimited free delivery, timeslot reservations, and exclusive savings.</div>
    <div className="text-[#31603D] underline lg:mt-[20px]">Create Account</div>
  </div>
  <div className="">
    <img className="object-cover rounded-[10px]" src={landing1}/>
  </div>
</div>
</div>

<div className="mt-[20px] mb-[60px] flex justify-center">
  <div className="flex flex-col lg:flex-row px-[15px]">
    <div className="bg-[#31603D] rounded-tl-[5px] rounded-tr-[5px] lg:rounded-tr-[0px] lg:rounded-tl-[10px] lg:rounded-bl-[10px] text-[white] lg:px-[80px] flex flex-col justify-center text-center p-6">
    <div className="text-[21px] lg:text-[40px] whitespace-nowap font-bold">There's more to explore</div>
    <div className="text-[12px]">There are 106 stores (and counting) available in</div>
    <div className="text-[12px]"><span className="underline">Ilorin, Kwara State.</span> <span>Explore them all with</span></div>
    <div className="text-[12px]">Market Pod today !</div>
    <div><button className="font-bold bg-[#F5C065] border border-[#F5C065] text-[white] mt-[20px] py-[10px] px-[15px] lg:py-[12px] lg:px-[30px] rounded-[25px] text-[14px] lg:text-[16px]">View more</button></div>
    </div>
    <div className="hidden lg:flex w-[350px] h-[300p]"><img className="object-cover" src={landing3}/></div>
    <div className="lg:hidden w-[full]"><img className="object-cover w-[100%]" src={landing4}/></div>
  </div>
</div> */}



</div>
    </div>
  

      
   
    

   

   

    
  <Footer/>
  </>)
}

export default LandingPage
