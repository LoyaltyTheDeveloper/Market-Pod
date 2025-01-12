import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import { FaPlus } from "react-icons/fa";
import Footer from '../Components/Footer';
import { RiSearchLine } from "react-icons/ri";
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { LuClock5 } from "react-icons/lu";

function Search() {
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

  const handleSecondSearch = (data) => {
    console.log(data);
  }


  const addToCart = () => {
    alert()
  }

  return (<>
    <Navbar onClick={handleSearch}/>
    <div className="p-4 min-h-screen bg-[#F9F9F9]">
    <div className="flex justify-center pt-[120px] lg:hidden">
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

        {isLoading &&  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}

<div className="mt-[40px] mb-[40px] text-[22px] font-bold lg:mt-[140px]">Search Results</div>

<div className="mt-4 flex flex-col lg:flex-row lg:flex-wrap gap-x-[5px] gap-y-[30px]">
  {searchResults.length > 0 ? (
    searchResults.map((result) => (<>
        
<div key={result.data.id} className="lg:border lg:border-transparent flex flex-col justify-center lg:flex-col lg:px-[10px]">


  <div className="flex justify-normal">
    
  <div className="flex lg:flex-col justify-center lg:justify-start gap-[20px] px-[10px]">


    <div className="h-[100px] w-[30%] lg:size-[150px] flex flex-row gap-x-[20px]">
      <img className="h-full w-[100%] object-cover rounded-[5px]" src={result.data.image}/>
      <div onClick ={() => navigate(`/site/getStore/${result.data.id}`)} className="text-white hidden lg:flex whitespace-nowrap"><button className="border border-[#31603D] bg-[#31603D] px-4 my-[55px] rounded-full">View store</button></div>
    </div>
    


    <div className="w-[300px] flex flex-col gap-[5px]">
      <div>
        <div className="font-semibold text-[20px]">{result.data.name}</div>
        {/* <div className="text-[15px]">{store.status}</div> */}
        {/* <div className="text-[15px]">{result.data.addr}</div> */}
        <div className="flex items-center gap-x-[5px] text-[#31603D]">
                            <div><LuClock5/></div>
                            <div className="text-[15px]">
                             Opens {result.data.open_time} - Closes {result.data.close_time}
                            </div>
                          </div>

       
   <div className="hidden lg:flex flex flex-wrap items-center mb-[15px]">
  {result.data.categories && result.data.categories.length > 0 ? (
    result.data.categories.map((category, index) => (
      <div className="flex items-center" key={index}>
        {category}
        {index < result.data.categories.length - 1 && (
          <div className="h-[20px] ml-[10px] mr-[10px] border-l border-gray-300 lg:flex justify-between"></div>
        )}
      </div>
    ))
  ) : (
    <p></p>
  )}
</div>

        <div onClick ={() => navigate(`/site/getStore/${result.data.id}`)} className="text-white lg:hidden"><button className="border border-[#31603D] bg-[#31603D] px-4 py-1 rounded-full">View store</button></div>
      </div>
    </div>
  
  </div>

  </div>




</div>















<div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-[20px]">
              {result.data.products && result.data.products.length > 0 ? (
                result.data.products.map((product) => (
                  <div className="mb-[30px]" key={product.id}>
                    <div className="flex flex-row justify-center lg:flex lg:flex-wrap gap-[8px] lg:justify-start">
                  <div
                    className="flex flex-col gap-y-[10px] bg-[white] px-[0px] lg:px-[15px] py-[20px] h-[auto]"
                  >
                    <div className="flex justify-center px-[50px]">
                      <img
                        src={product.image}
                        className="w-24 h-24 object-cover flex justify-center"
                      />
                      <div onClick={addToCart} className="absolute group ml-[140px] lg:ml-[150px] mt-[5px] border bg-[#31603D] rounded-full p-[7px] group">
                        <FaPlus className="text-[white]" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-x-[10px] gap-[10px] px-[10px]">
                      <div className="w-[120px] lg:w-[150px] text-[12px] lg:text-[15px] font-semibold">
                        {product.name}
                      </div>
                      <div className="text-[12px] w-[150px] lg:text-[13px]">{product.subtitle}</div>
                      {/* <div className="flex absolte bttom-[180px] lg:botom-[380px]">
                        <div className="font-semibold text-[12px] lg:text-[16px]">
                          NGN {product.price}
                        </div>
                        <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">
                           {product.status === 1 ? "In-stock":"Unavailable"}
                        </div>
                      </div> */}
                    </div>
                  </div>
                  </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>



       
    </>))
  ) : (
    <p className="flex justify-center">No results found</p>
  )}
</div>



</div>
<Footer/>
  </>)
}

export default Search
