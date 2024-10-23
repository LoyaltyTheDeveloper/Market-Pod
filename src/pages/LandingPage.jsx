import React from 'react';
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
import Navbar from '../Components/Navbar';
import { RiSearchLine } from "react-icons/ri";
import Footer from '../Components/Footer';
import marketData from '../index.json';
import { useState, useEffect } from 'react';
import { LuClock5 } from "react-icons/lu";

function LandingPage() {

  const [marketss, setMarketss] = useState([]);

  useEffect(() => {
    fetch('https://test.tonyicon.com.ng/site/getData')
    .then((response) => response.json())
    .then((data) => setMarketss(data.markets))
    .catch((error) => console.error('Error fetching comments', error))
}, )

  return (<>
  <Navbar/>
  <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">
  <div className="h-[70px] flex flex-row px-[20px] lg:space-x-[100px] mt-[130px] justify-center items-center">

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={produce} className="size-[20px]"/>
      <p className="text-[12px]">Produce</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={meat} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Meat & Seafood</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={milk} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Dairy & Eggs</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={spice} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Herbs & Spice</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={oil} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Oil & Vinegar</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={bread} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Beverage & Packed Foods</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={plastic} className="size-[20px]"/>
      <p className="text-[12px] whitespace-nowrap">Plasticware & Bags</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[18px] text-[grey] flex flex-col items-center">
      <img src={laundry} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Laundry</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[24px] text-[grey] flex flex-col items-center">
      <img src={beauty} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Health & Beauty</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={toy} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Baby & Kids</p>
    </div>

    <div className="hidden lg:flex color-[grey] size-[25px] text-[grey] flex flex-col items-center">
      <img src={stationery} className="size-[59px]"/>
      <p className="text-[12px] whitespace-nowrap">Stationery</p>
    </div>

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

    {/* {marketData.shops.map((market) => (<>
    <div key={market.id} className="flex flex-col">
        <div className="font-bold text-[25px] lg:text-[30px]">Yoruba Road</div>
        <div className="w-[270px] lg:w-[100%] md:w-[100%] flex flex-wrap">No 34 off GRA, Adelewola Akinwuyi Road, Ilorin, Kwara State.</div>
        </div>
        <div className="flex absolute right-[40px] hidden items-center gap-x-[5px] border border-[#31603D] p-[2px] px-[6px] pl-[10px] pr-[10px] rounded-[20px] lg:flex text-[#31603D]">
            <div>Yooo</div>
            <div>Home</div>
       </div>
    <div className="mt-[5px] pt-[20px] flex justify-center">
   <div className="flex flex-col gap-[20px] lg:flex-row flex-wrap justify-center">
        <div className="flex flex-col bg-[white] shadow-md border border-[transparent] w-[380px] lg:w-[310px] h-[auto] rounded-[10px]">
            <div><img src={market.image} className="w-[full] object-cover rounded-tl-[10px] rounded-tr-[10px]"/></div>
            <div className="pt-[5px] pl-[15px] flex flex-col gap-y-[10px]">
                <div className="text-[19px] font-bold whitespace-nowrap">{market.name}</div>
                <div className="flex items-center gap-x-[5px] text-[#31603D]">
                    <div><LuClock5/></div>
                    <div className="text-[15px]">Opens {market.opentime} - Closes {market.closetime}</div>
                </div>
               <div className="flex flex-wrap items-center mb-[15px]">
                {market.categories.map((category, index) => (
              <div className="flex items-center" key={index}>{category}{index < market.categories.length - 1 && <div className="h-[20px] ml-[10px] mr-[10px] border-l border-gray-300 lg:flex justify-between"></div>}</div> 
            ))}
            </div>
            </div>
        </div>
</div>
  </div>
</>))} */}


<div>
  {marketss?.length > 0 ? (
    marketss.map((market) => (
      <div key={market.id} className="flex flex-col mb-[30px]">
      
        <div className="font-bold text-[25px] lg:text-[30px] ml-[20px]">{market.name}</div>
        <div className="w-[270px] lg:w-[100%] md:w-[100%] flex flex-wrap ml-[20px]">
          {market.addr}
        </div>

        <div className="mt-[5px] pt-[20px] flex justify-center">
          <div className="flex flex-col gap-[20px] lg:flex-row flex-wrap justify-center">
            {market.stores.map((store) => (
              <div
                key={store.id}
                className="flex flex-col bg-[white] shadow-md border border-[transparent] w-[380px] lg:w-[310px] h-[auto] rounded-[10px]"
              >
            
                <div>
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full object-cover rounded-tl-[10px] rounded-tr-[10px]"
                  />
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
    ))
  ) : (
    <div>No markets available</div>
  )}
</div>

</div>
    </div>
  <Footer/>
  </>)
}

export default LandingPage
