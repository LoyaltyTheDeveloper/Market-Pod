import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { RiSearchLine } from "react-icons/ri";
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { LuClipboard } from "react-icons/lu";
import produce from '../assets/Vector.svg';
import meat from '../assets/meat.svg';
import milk from '../assets/milk.svg';
import spice from '../assets/herbs.svg';
import oil from '../assets/oil.svg';
import bread from '../assets/bread.svg';
import plastic from '../assets/plastic bottle.svg';
import laundry from '../assets/laundry.svg';
import beauty from '../assets/beauty.svg';
import toy from '../assets/toy.svg';
import stationery from '../assets/stationery.svg';
import dropdownData from '../index.json'
import { GrLocation } from "react-icons/gr";

function Location() {
     const [isLoading, setIsLoading] = useState(false);
         trio.register()
        const handleKeyDown = (event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        };

         const location = useLocation();
          const navigate = useNavigate();
          const { searchQuery: initialQuery, searchResults: initialResults } = location.state || { searchQuery: "", searchResults: [] };
        
          const [searchQuery, setSearchQuery] = useState(initialQuery);
          const [searchResults, setSearchResults] = useState(initialResults); 

          const [isModalOpen, setModalOpen] = useState(false);
          const [selectedDropdown, setSelectedCategory] = useState(null);

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
                  setSearchResults(data.results);
                  console.log(data.results);
                 
                })
                .catch((error) => {
                  console.error("Error fetching search results:", error);
                })
                .finally(() => {
                
                });
              
            };

            const handleSearch2 = (item) => {
                setIsLoading(true);
                
                 fetch(`https://apis.emarketpod.com/site/search?query=${item}`)
                   .then((response) => {
                     if (!response.ok) {
                       setIsLoading(false);
                       throw new Error("Network response was not ok");
                     }
                     return response.json();
                   })
                   .then((data) => {
                     setIsLoading(false);
                     navigate("/search", { state: { item, searchResults: data.results } });
                   })
                   .catch((error) => {
                     setIsLoading(false);
                     console.error("Error fetching search results:", error);
                   })
                   .finally(() => {
                   
                   });
               };

             useEffect(() => {
                fetch('https://apis.emarketpod.com/site/getData')
                .then((response) => response.json())
                .then((data) =>  setMarketss(data.markets))
                .catch((error) => console.error(error))
            }, []);

            const openModal = (category) => {
                setSelectedCategory(category);
                setModalOpen(true);
              };
              
            
              const closeModal = () => {
                setModalOpen(false);
                setSelectedCategory(null);
              };


  return (<>
  <Navbar onClick={handleSearch}/>
    <div className='p-4 min-h-screen bg-[#F9F9F9]'>
   

<div onMouseLeave={() => closeModal()} className="App flex flex-col items-center">
      {/* Main Dropdown Display */}
      <div className="h-[70px] flex flex-row gap-x-[45px] justify-between whitespace-nowra mt-[100px] justify-center">
        {dropdownData.dropdowns && dropdownData.dropdowns.length > 0 ? (
          dropdownData.dropdowns.map((item) => (<>

 <div onMouseOver={() => openModal(item)}  className="flex flex-col justify-center items-center hidden lg:flex">
            <div
              key={item.id}
              className="hidden lg:flex lg:flex-col color-[grey] size-[25px] text-[grey]  items-center cursor-pointer"
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
        
          <div onMouseLeave={() => closeModal()} className="mt-[170px] flex hidden lg:flex justify-center items-center bg-[white] z-50 absolute lg:w- full px-6 lg:h-[300px] p-6 rounded-lg overflow-y-auto flex items-center justify-center"

          >
            {/* Display categories in modal */}
            <div className="flex flex-col justify-center lg:flex-row">
              {selectedDropdown.categories.map((category, index) => (
                <div key={category.id} className="flex items-start gap-1 lg:gap-x-[50px]">
                  <div className="flex-1">
                    <h3 className="text-[18px] font-semibold mb-4 whitespace-nowrap">{category.category}</h3>

                    {/* Display items in two columns */}
                   
                    <div className="gap-y-8 lg:gap-x-[10px] grid grid-rows-5 grid-flow-col auto-rows-max grid-cols-1 mb-4 h-[100px] w-[250px]">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} onClick={()=>handleSearch2(item)} className="cursor-pointer whitespace-nowrap text-gray-700 text-[15px] grid grid-row-1 grid-flow-row auto-rows-max flex-wrap whitepsace-nowrap h-[10px">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* Category image */}
                  <div>
                    <img
                      src={category.image}
                      className="w- 12 h- 12 object-cove object-contain"
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


  <div className="pt-[120px] flex flex-col gap-y-2 justify-center items-center text-center">
       <div className="bg-[white] p-2 lg:p-6 rounded-full">< GrLocation className="size-[25px] lg:size-[50px]"/></div>
       <div className="font-bold text-[14px] lg:text-[16px] text-[#31603D]">Coming soon to your location!</div>
       <div className="text-[14px] lg:text-[16px] w-[90%] md:w-[60%] lg:w-[60%]">Our team is working diligently to expand our reach, with the goal of reaching your location in the near future. Once we're ready to roll, we'll make sure to drop you a note. In the mean time please try another location you can send groceries to a friend or family member.</div>
     </div>


      
    </div>
  </>)
}

export default Location
