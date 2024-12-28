import React from 'react';
import Navbar from '../Components/Navbar';
import { RiSearchLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import pod from '../assets/Podlogo.svg';
import Footer from '../Components/Footer';
import { BiHomeAlt2 } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRef } from "react";

function ViewStore() {
    const { storeId } = useParams();
    const { marketId } = useParams();
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState(null);
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();
    const refs = useRef({});
    const [searchQuery, setSearchQuery] = useState(""); // For user input
      const [searchResults, setSearchResults] = useState([]);
      

    const scroll = (category) => {
      if (refs.current[category]) {
        refs.current[category].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    const addToCart = () => {
      alert();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    const handleSearch = () => {

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
  

    useEffect(() => {
        fetch(`https://apis.emarketpod.com/site/getStore/${storeId}`)
        .then((response) => response.json())
        .then((data) => setStore(data.data))
        .catch((error) => console.error('Error fetching comments', error))
    }, [storeId])

    useEffect(() => {
      fetch(`https://apis.emarketpod.com/site/getProducts/${storeId}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error('Error fetching comments', error))
  }, [storeId])

//   useEffect(() => {
//     fetch(`https://test.tonyicon.com.ng/site/getCategories`)
//     .then((response) => response.json())
//     .then((data) => setCats(data.categories))
//     .catch((error) => console.error('Error fetching comments', error))
// }, [])

// const categoryId = products?.category_id;
// const categoryName = cats.find((cat) => cat.id === categoryId)?.name;

  return (<>
    <Navbar/>
    <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">

     <div className="flex mt-[130px] justify-center">
      <div className="flex justify-center lg:hidden">
    <div className="flex flex-row items-center">
         <RiSearchLine className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[white] focus:outline-none text-[13px]"
          placeholder="Search Stalls & products"
      />
         </div>
    </div>
    </div>

   {/* Body */}
    <div className="flex justify-center lg:justify-start mt-[30px] mb-[30px]">

        <div className="flex flex-col lg:flex-row lg:gap-[50px] lg:mt-[-40px]">
        

<div>
    {store && (
      <div className="lg:border lg:border-transparent lg:bg-[white] flex justify-center lg:flex-col lg:px-[10px]">
        <div className="flex lg:flex-col justify-center lg:justify-start gap-[20px] px-[10px] lg:px-[0px]">
          <div className="h-[100px] w-[30%] lg:size-[150px] lg:w-[70%]">
            <img className="h-full object-cover rounded-[5px]" src={store.image}/>
          </div>
          <div className="w-[270px] flex flex-col gap-[5px]">
            <div>
              <div className="font-semibold text-[20px]">{store.name}</div>
              <div className="text-[15px]">{store.status}</div>
              <div className="text-[15px]">{store.addr}</div>
            </div>
          </div>
        </div>

        <div className="flex my-3 hidden lg:flex py-[5px]">
          <hr className="w-[45%] border-t border-gray-300" />
          <hr className="w-[45%] border-t border-gray-300" />
        </div>

        <div className="hidden lg:flex">
          <div className="flex flex-col gap-[10px]">
            <div className="font-semibold">Browse Categories</div>
            {store.categories && store.categories.map((category) => (
              <div key={category.id} onClick={() => scroll(category)} className="text-[15px]">
                <div className="cursor-pointer">{category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>


    <div className="flex mt-[30px] justify-center  lg:justify-start">
        <div className="">
            <div className="flex flex-col">

                <div className="font-bold text-[25px] lg:text-[30px]">{}</div>

                {/* {cats.map((category) => (
  <div key={category.id} className="font-bold text-[25px] lg:text-[30px]">
    {category.name}
  </div>
))} */}

                <div className="flex items-center gap-x-[20px] absolute right-[30px]">

        <button className="hidden lg:flex" onClick ={() => navigate("/")}>
          <div className="flex items-center gap-[5px] border rounded-[20px] py-[4px] px-[13px] border-[#31603D]">
          <div><BiHomeAlt2 className="text-[#31603D]"/></div>
          <div className="text-[14px] text-[#31603D]">Home</div>
          </div>
        </button>
        </div>

                

                





<div className="">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div className="mb-[30px]" key={product.category_name} ref={(el) => (refs.current[product.category_name] = el)}>
            <div className="text-[24px] font-bold">{product.category_name}</div>
            <div className="grid grid-cols-2 justify-center lg:flex lg:flex-wrap gap-[8px] lg:justify-start">
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
              <div className="flex absolte bttom-[180px] lg:botom-[380px]">
                <div className="font-semibold text-[12px] lg:text-[16px]">
                  NGN {product.price}
                </div>
                <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">
                   {product.status === 1 ? "In-stock":"Unavailable"}
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        ))
      ) : (
        <div className="flex inset-0">Loading products...</div>
      )}
    
</div>
               

                </div>
                </div>
                </div>

        </div>
    </div>

    </div>
    <Footer/>
  </>)
}

export default ViewStore
