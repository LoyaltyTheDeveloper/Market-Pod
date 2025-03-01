import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { RiSearchLine } from "react-icons/ri";
import pod from '../assets/Podlogo.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import productdetail from '../assets/productdetail.svg';
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from 'react-hot-toast';

function ProductDetail() {


    const copy = () => {
        const currentUrl = window.location.href;
    
        navigator.clipboard.writeText(currentUrl)
          .then(() => {
            toast.success("Link copied to clipboard");
          })
          .catch(err => {
            console.error("Failed to copy URL: ", err);
          });
        };

    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://apis.emarketpod.com/site/getProduct/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error('Error fetching comments', error))
    }, [productId])

  return (<>
  <Navbar/>
    <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">

    <div className="flex mt-[130px] justify-center">
      <div className="flex justify-center lg:hidden">
    <div className="flex flex-row items-center">
         <RiSearchLine className="absolute ml-[20px] size-[15px]"/>
         <input
          type="text"
          className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[white] focus:outline-none text-[13px]"
          placeholder="Search Markets, Shops, Products..."
      />
         </div>
    </div>
    </div>

{product && (<>
    <div className="px-[20px] mt-[20px] mb-[50px]">
    <div className="flex gap-x-[10px] text-[15px] cursor-pointer">
        <div>Happiness Goods & Stores</div>
        /
        <div className="font-semibold">{product.data.category_name}</div>
    </div>

    <div className="lg:flex flex-row-reverse gap-[100px] lg:items-center pt-[30px]">
    <div className="lg:ml-[100%] flex justify-center lg:justify-normal pb-[30px]"><img className="object-cover bg-[white] p-6 lg:p-16 w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] lg:mr-[500px]" src={product.data.image}></img></div>

    
    <div className="lg:pr-[200p] lg:absolute left-6">
    <div className="flex flex-col gap-y-[10px]">
       <div className="font-bold text-[20px] w-[200px] lg:text-[35px] lg:w-[350px] lg:pt-[30px">{product.data.name} - {product.data.weight}kg</div>
       <div>{product.data.subtitle}</div>
       <div className="lg:pr-[800px] h-[50px]">{product.data.description}</div>
    </div>

    <div className="flex flex-col gap-[20px] pt-[30px]">
    <div className="text-[20px] font-semibold mt-[40px]">₦ {product.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
    <div className="flex gap-[10px]">
        <button><div className="text-[#31603D] text-[10px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[16px] lg:px-[10px] lg:px-[50px]">Buy Now</div></button>
        <div>
        <button><div className="text-[white] bg-[#31603D] text-[10px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[16px] lg:px-[10px] lg:px-[50px] flex gap-[5px] items-center">Add To Cart <div className="hidden lg:flex lg:text-[px]">+</div></div></button>
        </div>
    </div>
    </div>
    </div>
    </div>

<div className="flex justify-cente lg:justify-end">
    
    <div className="flex flex-col text-[white] lg:px-[0px] lg:py-[0px] px-[30px] py-[20px] gap-[10px] mt-[30px] bg-[#31603D] border border-[#31603D] rounded-[8px] w-[95%] lg:w-[300px]">
    <div className="hidden lg:flex"><img className="object-cover" src={productdetail}/></div>

    <div className="flex flex-col lg:px-4 lg:py-3 lg:pb-6 lg:flex lg:flex-col gap-y-2">
        <div className="text-[20px] font-bold">Share the experience</div>
        <div className="lg:hidden">Invite friends sha</div>
        <div className="hidden lg:flex">Love how easy it is to get fresh groceries from your local markets? Why not share the convenience with your friends!</div>


        <div className="flex items-center gap-x-[5px] cursor-pointer">
            <div onClick={copy} className="hidden lg:flex"><MdOutlineContentCopy className="size-[20px]"/></div>
        <button onClick={copy} className="underline">Copy Link</button>
        </div>

        </div>
    </div>
    </div>

    </div>
    </>)}


    </div>
    <Footer/>
 </> )
}

export default ProductDetail
