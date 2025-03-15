import React from 'react'
import { RiHome2Line } from "react-icons/ri";
import { LuClock5 } from "react-icons/lu";
import Navbar from "../Components/Navbar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt2 } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Footer from '../Components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function StoreList() {
  
  const { marketId, marketName, marketAddr } = useParams();
  const [market, setMarket] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://apis.emarketpod.com/site/getStores/${marketId}`)
    .then((response) => response.json())
    .then((data) => setMarket(data))
    .catch((error) => console.error('Error fetching comments', error))
}, [marketId])




  return (<>
  <Navbar/>
  <div className="pt-[100px] min-h-screen bg-[#F9F9F9] overflow-x-hidden">
    <div className="flex flex-row gap-x-[60px] items-center pt-[40px] justify-center lg:flex lg:justify-start">
        

<div>
      {market ? (
        <>
          <div key={market.id} className="flex flex-col mb-[30px]">

           <div className="flex items-center">
          <div className="flex items-center mb-[40px] mt-[40px]">
        <div className="flex flex-col absolute left-0">
        <div className="font-bold text-[25px] text-[21px] lg:text-[30px] ml-[20px] font-saeada">{marketName}</div>
        <div className="w-[270px]lg:w-[100%] md:w-[100%] flex flex-wrap ml-[20px] text-[14px] lg:text-[16px]">
          {marketAddr}
        </div>

        </div>
        </div>
      
      <div className="flex items-center">
        <div>
        <div className="font-bold text-[25px] text-[21px] lg:text-[30px] ml-[20px]">{market.name}</div>
        <div className="w-[270px] lg:w-[100%] md:w-[100%] flex flex-wrap ml-[20px]">
          {market.addr}
        </div>
        </div>

        {/* <div className="flex items-center gap-x-[20px] absolute right-[30px]">

        <button className="hidden lg:flex" onClick ={() => navigate("/")}>
          <div className="flex items-center gap-[5px] border rounded-[20px] py-[4px] px-[13px] border-[#31603D]">
          <div><BiHomeAlt2 className="text-[#31603D]"/></div>
          <div className="text-[14px] text-[#31603D]">Home</div>
          </div>
        </button>
        </div> */}

        </div>

        </div>

        <div className="flex lg:flex justify-start">

        <div className="flex justify-center whitespace-nowrap space-x-4 p-4 lg:flex lg:justify-start">
          <div className="flex flex-wrap gap-[20px] lg:flex lg:flex-wrap justify-center lg:justify-normal">
            {market.stores.map((store) => (
              <div
                key={store.id}
                onClick ={() => navigate(`/site/getStore/${store.id}`)}
                className="flex flex-col bg-[white] cursor-pointer border border-[transparent] w-[360px] lg:w-[310px] h-[auto] rounded-[10px] lg:flex justify-start"
              >
            
                <div>
                  <div className="h-[150px] relative">
                  <img
                    src={store.image}
                    alt={store.name}
                    // className="w-full h-full object-cover rounded-tl-[10px] rounded-tr-[10px]"
                    className={`w-full h-full object-cover rounded-tl-[10px] rounded-tr-[10px] ${
                      store.isOpen ? "" : ""
                    }`}
                  />
                  {store.isOpen && (
                   <div className="absolute inset-0 flex rounded-tl-[10px] rounded-tr-[10px] items-center justify-center bg-black bg-opacity-50 text-white text-lg ">
                      Opens at {store.open_time}
                  </div>
                     )}
                  </div>
                </div>

                <div className="pt-[5px] pl-[15px] flex flex-col gap-y-[10px]">
                  <div className="text-[19px] font-bold whitespace-nowrap font-saeada">
                    {store.name}
                  </div>
                  <div className="flex items-center gap-x-[5px] text-[#31603D]">
                    <div><LuClock5/></div>
                    <div className="text-[15px]">
                      Opens {store.open_time} - Closes {store.close_time}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mb-[15px]">
                    {store.categories.slice(0, 4).map((category, index) => (
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
        </>
      ) : (
        Array(1)
          .fill("")
          .map((_, index) => (
            <div key={index} className="flex mb-[30px] justify-center">
              <div className="flex flex-col">
              <div className="flex flex-col">
                    <Skeleton width={200} height={30} className="lg:ml-[20px]"/>
                    <Skeleton width={150} height={20} className="mt-[10px] lg:ml-[20px]" />
                </div>
              <div className="flex flex-col lg:flex-row">
              <div className="mt-[20px] lg:ml-[20px]">
                <Skeleton height={170} width={360}/>
              </div>
              <div className="mt-[20px] lg:ml-[20px]">
                <Skeleton height={170} width={360}/>
              </div>
              <div className="mt-[20px] lg:ml-[20px]">
                <Skeleton height={170} width={360}/>
              </div>
              </div>
              </div>
             
            </div>
          ))
       )}
    </div>

    </div>

    {/* <div className="flex mb-[20px] text-[white] lg:justify-center border border-[transparent] mx-[5%] lg:mx-[1%] bg-[#31603D] py-[15px] rounded-[5px]">

      <div className="flex items-center">
      <div className="flex lg:flex lg:justify-center text-[12px] lg:text-[15px] ml-[10px]">Didn’t Find What You’re looking for here ?</div>

      <div className="flex absolute right-[27px] lg:right-[50px] items-center">
        <div className="flex items-center">
      <div className="text-[12px] lg:text-[15px]"><button> Next Market </button></div>
      <div className="lg:flex"><MdOutlineArrowForwardIos className="size-[19px] lg:size-[30px]"/></div>
      </div>
      </div>

      </div>
    </div> */}

  </div>
  <Footer/>
  </>)
}

export default StoreList
