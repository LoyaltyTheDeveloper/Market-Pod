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


function StoreList() {
  const { marketId, marketName, marketAddr } = useParams();
  const [market, setMarket] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://test.tonyicon.com.ng/site/getStores/${marketId}`)
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
        <div className="font-bold text-[25px] text-[21px] lg:text-[30px] ml-[20px]">{marketName}</div>
        <div className="w-[270px] lg:w-[100%] md:w-[100%] flex flex-wrap ml-[20px] text-[14px] lg:text-[16px]">
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

        <div className="flex items-center gap-x-[20px] absolute right-[30px]">

        <button className="hidden lg:flex" onClick ={() => navigate("/")}>
          <div className="flex items-center gap-[5px] border rounded-[20px] py-[4px] px-[13px] border-[#31603D]">
          <div><BiHomeAlt2 className="text-[#31603D]"/></div>
          <div className="text-[14px] text-[#31603D]">Home</div>
          </div>
        </button>
        </div>
        </div>

        </div>

        <div className="mt-[5px] pt-[20px] flex lg:flex justify-start">

        <div className="flex justify-center whitespace-nowrap space-x-4 p-4 lg:flex lg:justify-start">
          <div className="flex flex-col gap-[20px] lg:flex-row justify-center">
            {market.stores.map((store) => (
              <div
                key={store.id}
                onClick ={() => navigate(`/site/getStore/${store.id}`)}
                className="flex flex-col bg-[white] border border-[transparent] w-[360px] lg:w-[310px] h-[auto] rounded-[10px] lg:flex justify-start"
              >
            
                <div>
                  <div className="h-[150px]">
                  <img
                    src={store.image}
                    alt={store.name}
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
                      Opens {store.open_time} - Closes {store.close_time}
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
        </>
      ) : (
        <p>Loading...</p>
       )}
    </div>

    </div>

    <div className="flex mb-[20px] text-[white] lg:justify-center border border-[transparent] mx-[5%] lg:mx-[1%] bg-[#31603D] py-[15px] rounded-[5px]">

      <div className="flex items-center">
      <div className="flex lg:flex lg:justify-center text-[15px] ml-[10px]">Didn’t Find What You’re looking for here ?</div>

      <div className="flex absolute right-[40px] lg:right-[50px] items-center">
      <div className="text-[15px]"><button> Next Market </button></div>
      <div className="lg:flex"><MdOutlineArrowForwardIos className="size-[30px]"/></div>
      </div>

      </div>
    </div>

  </div>
  </>)
}

export default StoreList
