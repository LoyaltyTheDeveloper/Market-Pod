import React from 'react';
import Navbar from '../Components/Navbar';
import { RiSearchLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import pod from '../assets/Podlogo.svg';
import Footer from '../Components/Footer';
import { BiHomeAlt2 } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRef } from "react";
import { AuthContext } from '../context/Context.jsx';
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { CartContext } from "../context/CartContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LiaTimesSolid } from "react-icons/lia";
import { GrBasket } from "react-icons/gr";
import produce from "../assets/Vector.svg";
import milk from '../assets/milk.svg';
import spice from '../assets/herbs.svg';
import oil from '../assets/oil.svg';
import bread from '../assets/bread.svg';
import plastic from '../assets/plastic bottle.svg';
import laundry from '../assets/laundry.svg';
import beauty from '../assets/beauty.svg';
import toy from '../assets/toy.svg';
import stationery from '../assets/stationery.svg';
import meat from '../assets/meat.svg';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props}
  timeout={{enter: 1500, exit:1000 }}
  
  
  />;
});

function ViewStore() {

  const [hovered, setHovered] = useState(null);

  const [isDialog, setIsDialog] = React.useState(false);
  const [isDialog2, setIsDialog2] = React.useState(false);

  const categoryImages = [
    { name: "Produce", image: produce },
    { name: "Meat & Seafood", image: meat },
    { name: "Dairy & Eggs", image: milk },
    { name: "Herbs & Spice", image: spice },
    { name: "Oil & Vinegar", image: oil },
    { name: "Beverage & Packed Foods", image: bread },
    { name: "Plasticware & Bags", image: plastic },
    { name: "Laundry", image: laundry },
    { name: "Health & Beauty", image: beauty },
    { name: "Baby & Kids", image: toy },
    { name: "Stationery", image: stationery },
  ];

  const handleOpen = () => {
    setIsDialog(true);
  };

  const handleClose = () => {
    setIsDialog(false);
  };

  const handleOpen2 = () => {
    setIsDialog2(true);
  };

  const handleClose2 = () => {
    setIsDialog2(false);
  };


  trio.register()

   const [isLoading, setIsLoading] = useState(false);
   const { state } = useContext(AuthContext);
    const { storeId } = useParams();
    const { marketId } = useParams();
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();
    const refs = useRef({});
    const [searchQuery, setSearchQuery] = useState(""); 
      const [searchResults, setSearchResults] = useState([]);
      const { addToCartOne } = useContext(CartContext);
      const [modalProduct, setModalProduct] = useState(null);
      const [modalProduct2, setModalProduct2] = useState(null);

      const [cart, setCart] = useState(() => {
        {
          
          const savedCart = localStorage.getItem("cart");
          return savedCart ? JSON.parse(savedCart) : [];
        }
      });
      const [storeIdd, setStoreIdd] = useState(null);
      const [error, setError] = useState("");
      

    const scroll = (category) => {
      if (refs.current[category]) {
        refs.current[category].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

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

    const addToCart = (product) => {
    if (store.isOpen !== true){
      return toast.success("This store is closed");
     }
    setIsLoading(true);
     
      fetch('https://apis.emarketpod.com/user/cart/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: state.token,
        },
        body: JSON.stringify({ product_id: product.id }),
      })
      .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setModalProduct(product);
          handleOpen();
          // toast.success(data.message);
          return;
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
          return;
        });
    };

    useEffect(() => {
      if (isDialog) {
        const timer = setTimeout(() => {
          handleClose(); 
        }, 3000);
    
        return () => clearTimeout(timer); 
      }
    }, [isDialog]);

    useEffect(() => {
      if (isDialog2) {
        const timer = setTimeout(() => {
          handleClose2(); 
        }, 3000);
    
        return () => clearTimeout(timer);
      }
    }, [isDialog2]);


    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };
    const handleSearch = () => {
      if(!searchQuery){
                toast.error('Please search a stall or product');
              }
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

    const handleSecondAdd = (product) => {
      if (store.isOpen !== true){
        return toast.error("This store is closed");
       }
       else {
        handleOpen2();
        addToCartOne(product);
        setModalProduct2(product);
       }
    }

    const formatNumber = (num) => {
      return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const formattedPrice = formatNumber(modalProduct?.price);
    const formattedPrice2 = formatNumber(modalProduct2?.price);

  return (<>
    <Navbar/>
    
    <div className="min-h-scree pb-[10% bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">

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
          placeholder="Search Stalls & Products"
      />
         </div>
    </div>
    </div>


  
    <div className="flex justify-center lg:justify-start mt-[30px] mb-[30px">

        <div className="flex flex-col lg:flex-row lg:gap-[50px] lg:mt-[-70px]">
        


        <React.Fragment>
      <Dialog
      BackdropProps={{
  sx: { backgroundColor: "transparent" }, // Removes the dark overlay
}}
      PaperProps={{
        sx: {
          position: "absolute",
          // boxShadow: "none", 
          top: "5%", 
          right: "2%", 
          width: { xs: "55%", sm: "55%", md: "60%", lg: "30%" }, 
          height: { xs: "auto", sm: "30vh", md: "30vh", lg: "auto" }, 
          maxHeight: "vh", 
          overflow: "auto",
        },
      }}
        open={isDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle><div className="flex items-center lg:justify-between justify-end">
        <p className="text-[12px] font-semibold lg:text-[14px] text-[#31603D] hidden lg:flex"> An item has been added to your cart </p>
        <div onClick={handleClose} className='flex'><LiaTimesSolid className="size-[24px] lg:size-[25px] text-[#31603D]"/></div>
          </div>
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <div className="flex flex-row gap-x-[20px] lg:justify-center">
            <div className=""><img className="size-[50px] lg:size-[90px]" src={modalProduct?.image}/></div>
            <div>
              <p className='text-[black] w-[100px] lg:w-[152px] text-[13px] lg:text-[15px] h-[45px] font-semibold'>{modalProduct?.name}</p>
              <p className='h-[20px] text-[11px] text-[black] hidden lg:flex'>{modalProduct?.subtitle}</p>
              <p className="h-[25px] text-[13px] lg:text-[15px] text-[black] font-semibold hidden lg:flex">₦{formattedPrice}</p>
              <div className="flex flex-row items-center gap-x-3 mt-[10px]">
                <div className='hidden lg:flex'><button className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
                <div onClick ={() => navigate(`/site/getProduct/${modalProduct.id}`)} className='hidden lg:flex'><p className="text-[11px] lg:text-[13px] underline font-semibold cursor-pointer text-[#31603D]">Item Description</p></div>
              </div>
            </div>
           </div>
          </DialogContentText>
        </DialogContent>
    
      </Dialog>


     {/* Dialog 2 */}

     <Dialog
    BackdropProps={{
    sx: { backgroundColor: "transparent" }, // Removes the dark overlay
}}
      PaperProps={{
        sx: {
          position: "absolute",
          // boxShadow: "none", 
          top: "5%", 
          right: "2%", 
          width: { xs: "55%", sm: "55%", md: "60%", lg: "30%" }, 
          height: { xs: "auto", sm: "30vh", md: "30vh", lg: "auto" }, 
          maxHeight: "vh", 
          overflow: "auto", 
        },
      }}
        open={isDialog2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle><div className="flex items-center lg:justify-between justify-end">
        <p className="text-[12px] font-semibold lg:text-[14px] text-[#31603D] hidden lg:flex"> An item has been added to your cart </p>
        <div onClick={handleClose2} className='flex'><LiaTimesSolid className="size-[24px] lg:size-[25px] text-[#31603D]"/></div>
          </div>
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <div className="flex flex-row gap-x-[20px] lg:justify-center">
            <div className=""><img className="size-[50px] lg:size-[90px]" src={modalProduct2?.image}/></div>
            <div>
              <p className='text-[black] w-[100px] lg:w-[152px] text-[13px] lg:text-[15px] h-[45px] font-semibold'>{modalProduct2?.name}</p>
              <p className='h-[20px] text-[11px] text-[black] hidden lg:flex'>{modalProduct2?.subtitle}</p>
              <p className="h-[25px] text-[13px] lg:text-[15px] text-[black] font-semibold hidden lg:flex">₦{formattedPrice2}</p>
              <div className="flex flex-row items-center gap-x-3 mt-[10px]">
                <div className='hidden lg:flex'><button className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
                <div onClick ={() => navigate(`/site/getProduct/${modalProduct2.id}`)} className='hidden lg:flex'><p className="text-[11px] lg:text-[13px] underline font-semibold cursor-pointer text-[#31603D]">Item Description</p></div>
              </div>
            </div>
           </div>
          </DialogContentText>
        </DialogContent>
    
      </Dialog>


    </React.Fragment>


<div>
    {store && (
      <div className="lg:border lg:border-transparent lg:bg-[white] flex justify-center lg:flex-col lg:px-[10px] lg:pb-[320px]">
        <div className="flex lg:flex-col justify-center lg:justify-start gap-[20px] px-[10px] lg:px-[0px] lg:flex lg:pl-[5%]">
          <div className="h-[100px] w-[30%] lg:size-[150px] lg:w-full lg:mt-[55px]">
            <img className="h-[100px] w-[230px] object-cover rounded-[5px] lg:w-[250px] lg:h-[160px]" src={store.image}/>
          </div>
          <div className="w-[270px] flex flex-col gap-y-[5px]">
            <div>
              <div className="font-semibold text-[21px] whitespace-nowrap overflow-y-hidden no-scrollbar w-[250px] font-bitter">{store.name}</div>
              {store.isOpen === true && <div className="text-[#31603D] font-sans text-[14px]">Opened</div>}
              {store.isOpen !== true && <div className="text-[#D23D23] font-sans text-[14px]">Closed</div>}
              <div className="text-[15px] font-sans">{store.status}</div>
              <div className="text-[15px] font-sans">{store.addr}</div>
            </div>
          </div>
        </div>

        <div className="flex my-3 hidden lg:flex py-[5px] lg:pl-[5%]">
          <hr className="w-[45%] border-t border-gray-300" />
          <hr className="w-[45%] border-t border-gray-300" />
        </div>

        <div className="hidden lg:flex lg:pl-[5%]">
          <div className="flex flex-col gap-[10px] lg:mb-[500px">
            <div className="font-semibold font-bitter text-[20px]">Browse Categories</div>

            {/* {store.categories && store.categories.map((category) => (
              <div key={category.id} onClick={() => scroll(category)} className="text-[15px]">
                <div className="cursor-pointer font-sans">{category}</div>
              </div>
            ))} */}
<div className='flex flex-col gap-y-3'>
{store.categories &&
  store.categories.map((category) => {
    const categoryImage = categoryImages.find((c) => c.name === category)?.image;
    return (
      <div key={category.id} onClick={() => scroll(category)} className="text-[15px] flex items-center space-x-3">
        {categoryImage && (<>
          <img src={categoryImage} className="w-6 h-6 rounded-md object-cove object-contain" /> 
      </>  )} 
        <div className="cursor-pointer font-sans">{category}</div>
      </div>
    );
  })}
  </div>
          </div>
        </div>
      </div>
    )}
  </div>
  


  {!store &&  Array(1)
            .fill("")
            .map((_, index) => (
              <div key={index} className="flex flex-col mb-[30px] justify-center lg:hidden">
                <div className="flex items-center">
                <div className="flex flex-col gap-y-[30px]">
                <div className="flex flex-col items-center">
                  <div className="flex flex-row gap-x-2 items-center mx-4">
                    <Skeleton width={100} height={100} className=""/>
                    <Skeleton width={250} height={30} className=""/>
                  </div>
                  
                </div>
                <div className="flex flex-row gap-x-2 items-center mx-4">
                    <Skeleton width={180} height={210} className=""/>
                    <Skeleton width={180} height={210} className=""/>
                  </div>
                  <div className="flex flex-row gap-x-2 items-center mx-4">
                    <Skeleton width={180} height={210} className=""/>
                    <Skeleton width={180} height={210} className=""/>
                  </div>
                  <div className="flex flex-row gap-x-2 items-center mx-4">
                    <Skeleton width={180} height={210} className=""/>
                    <Skeleton width={180} height={210} className=""/>
                  </div>
                </div>
                </div>
              </div>
            ))}

{!store &&  Array(1)
            .fill("")
            .map((_, index) => (
              <div key={index} className="flex flex-col mb-[30px justify-cente mt-[60px] hidden lg:flex ">
                <div className="flex items-center">
                <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="flex flex-row gap-x-[70px] items-cente mx-">
                    <Skeleton width={250} height={170} className="ml-[-10px]"/>

                   <div className="flex flex-col gap-y-[50px]">
                    <div className="flex flex-row gap-x-[20px] mt-[30px]">
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    </div>
                    <div className="flex flex-row gap-x-[20px] mt-[30px]">
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    </div>
                    <div className="flex flex-row gap-x-[20px] mt-[30px]">
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    <Skeleton width={220} height={250} className="ml-[-10px]"/>
                    </div>
                    </div>
                    
                  </div>
                </div>
                </div>
                </div>
              </div>
            ))}


    <div className="flex mt-[30px] justify-center  lg:justify-start">
        <div className="">
            <div className="flex flex-col">

                <div className="font-bold text-[25px] lg:text-[30px]">{}</div>

                {/* {cats.map((category) => (
  <div key={category.id} className="font-bold text-[25px] lg:text-[30px]">
    {category.name}
  </div>
))} */}

                {/* <div className="flex items-center gap-x-[20px] absolute right-[30px]">

        <button className="hidden lg:flex" onClick ={() => navigate("/")}>
          <div className="flex items-center gap-[5px] border rounded-[20px] py-[4px] px-[13px] border-[#31603D]">
          <div><BiHomeAlt2 className="text-[#31603D]"/></div>
          <div className="text-[14px] text-[#31603D]">Home</div>
          </div>
        </button>
        </div> */}

                

       
                

        {isLoading &&  <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}



{state.token && <div className="lg:min-h-scree lg:overflow-y-auto lg:max-h-[865px] no-scrollbar relative flex flex-col gap-y-8">
    

      {[...new Set(products?.map(product => product.category_name))].map(category => (
        
        <div
        key={category} ref={(el) => (refs.current[category] = el)} className="relative mb-4">
          <h2 className="text-[22px] lg:text-[25px] font-bold px-2 lg:px-0 font-bitter lg:mt-4">{category}</h2>
          <div className="grid grid-cols-2 justify-center lg:flex lg:flex-wrap gap-x-[8px] lg:justify-start">
            {products
              .filter(product => product.category_name === category)
              .map(product => (
                <div className="mt-[10px] relative cursor-pointer" key={product.id} onMouseEnter={() => setHovered(product.id)}
      onMouseLeave={() => setHovered(null)}>
            <div className="justify-center lg:flex lg:flex-wrap gap-[8px] lg:justify-start">
          <div
            className="flex flex-col gap-y-[10px] bg-[white] px-[0px] lg:px-[15px] py-[20px] h-[auto] bg-[white] rounded-[5px]"
          >
            <div className="flex justify-center px-[50px]">
              <img
                onClick ={() => navigate(`/site/getProduct/${product.id}`, { state: { isOpen: store.isOpen } })}
                src={product.image}
                className="w-24 h-24 w- [100px] h- [100px] object-cove object-contain flex justify-center bg-[white] p-4"
              />

              {/* <div onClick={()=> addToCart(product)} className="flex items-center absolute group ml-[140px] lg:ml-[150px] mt-[5px] border border-[#31603D] bg-[#31603D] rounded-full p-[7px] group">
                <FaPlus className="text-[white]" />
              </div> */}


    {/* Add to cart button */}

              {/* <div
              onClick={()=> addToCart(product)}
        className={`absolute cursor-pointer top-6 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full shadow-md transition-opacity duration-[2000ms] ease-in-out ${
          hovered === product.id ? "px-2 py-1 gap-x-1" : "p-2"
        }`}
      >
        <span className={`text-sm font-medium transition-[width] duration-700 ease-in-out ${hovered === product.id ? "opacity-100 w-auto py-[4px] animate-expand-width" : "opacity-0 w-0 h-0"}`}>
          Add To Cart
        </span>
        <div className=""><FaPlus className="w-5 h-5 ml- text-white"/></div>
      </div> */}


<div className='absolute top-6 right-2'>
<div className={`text-sm text-[white] font-medium ${hovered === product.id ? "opacity-100 w-auto py-[8px] mt-[px] pr-[15px] pl-[15px] rounded-tl-full rounded-bl-full rounded-tr-[300px] rounded-br-lg mr-[30px] lg:mr-[39px] border border-[#31603D] bg-[#31603D] animate-fade": "opacity-0 w-0 h-0 pr-[20px]"}`}>
          Add To Cart
        </div>
<div
              onClick={()=> addToCart(product)}
        className={`absolute cursor-pointer top-0 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full ${
          hovered === product.id ? "px-2 py-2 gap-x-1" : "p-2 "
        }`}
      >
        <div className=""><FaPlus className="w-5 h-5 ml- text-white"/></div>
      </div>    
    </div>  

      


            </div>
            <div onClick ={() => navigate(`/site/getProduct/${product.id}`, { state: { isOpen: store.isOpen } })} className="flex flex-col gap-x-[10px] gap-y-[10px] px-[10px]">
              <div className="w-[120px] truncate font-bitter lg:w-[150px] text-[16px] lg:text-[18px] font-semibold h-[40px]">
                {product.name}
              </div>
              <div className="text-[13px] w-[150px] lg:text-[13px] h-[30px] font-sans">{product.subtitle}</div>
              <div className="flex absolte bttom-[180px] lg:botom-[380px]">
                <div className="font-bold font-sans text-[14px] lg:text-[16px] h-[10px] lg:h-[30px]">
                ₦ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                 {/* <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold"> 
                </div> */}
                 {product.status === 1 && <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">In-stock</div>}
                 {product.status !== 1 && <div className="absolute whitespace-nowra ml-[140px] text-[#D23D23] text-[10px] lg:text-[12px] font-semibold">Out of stock</div>}

              </div>
            </div>
          </div>
          </div>
          </div>
              ))}
          </div>
        </div>
      ))}
    </div>}




    {!state.token && <div className="lg:min-h-scree lg:overflow-y-auto lg:max-h-[865px] no-scrollbar relative flex flex-col gap-y-8">
   

      {[...new Set(products.map(product => product.category_name))].map(category => (
        
        <div
        key={category} ref={(el) => (refs.current[category] = el)} className="relative mb-4">
          <h2 className="text-[22px] lg:text-[25px] font-bold px-2 lg:px-0 font-bitter lg:mt-4">{category}</h2>
          <div className="grid grid-cols-2 justify-center lg:flex lg:flex-wrap gap-x-[8px] lg:justify-start">
            {products
              .filter(product => product.category_name === category)
              .map(product => (
                <div className="mt-[10px] relative cursor-pointer" key={product.id} onMouseEnter={() => setHovered(product.id)}
      onMouseLeave={() => setHovered(null)}>
            <div className="justify-center lg:flex lg:flex-wrap gap-[8px] lg:justify-start">
          <div
            className="flex flex-col gap-y-[10px] bg-[white] px-[0px] lg:px-[15px] py-[20px] h-[auto] bg-[white] rounded-[5px]"
          >
            <div className="flex justify-center px-[50px]">
              <img
                onClick ={() => navigate(`/site/getProduct/${product.id}`, { state: { isOpen: store.isOpen } })}
                src={product.image}
                className="w-24 h-24 object-cove object-contain flex justify-center bg-[white] p-4"
              />

             

                     {/* <div
              onClick={()=> handleSecondAdd(product)}
        className={`absolute cursor-pointer top-6 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full shadow-md transition-opacity duration-[2000ms] ease-in-out ${
          hovered === product.id ? "px-2 py-1 gap-x-1" : "p-2"
        }`}
      >
        <span className={`text-sm font-medium transition-opacity duration-[2000ms transition-transform duration-[2000ms] ease-in-out ${hovered === product.id ? "opacity-100 w-aut0 py-[4px] translate-x-0 transition-transform duration-[2000ms]" : "opacity-0 w-0 h-0 translate-x-5"}`}>
          Add To Cart
        </span>
        <div className=""><FaPlus className="w-5 h-5 ml- text-white" /></div>
      </div> */}


      <div className='absolute top-6 right-2'>
<div className={`text-sm text-[white] font-medium ${hovered === product.id ? "opacity-100 w-auto py-[8px] mt-[px] pr-[15px] pl-[15px] rounded-tl-full rounded-bl-full rounded-tr-[300px] rounded-br-lg mr-[30px] lg:mr-[39px] border border-[#31603D] bg-[#31603D] animate-fade": "opacity-0 w-0 h-0 pr-[20px]"}`}>
          Add To Cart
        </div>
<div
              onClick={()=> handleSecondAdd(product)}
        className={`absolute cursor-pointer top-0 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full ${
          hovered === product.id ? "px-2 py-2 gap-x-1" : "p-2 "
        }`}
      >
        <div className=""><FaPlus className="w-5 h-5 ml- text-white"/></div>
      </div>    
    </div>  



            </div>
            <div onClick ={() => navigate(`/site/getProduct/${product.id}`, { state: { isOpen: store.isOpen } })} className="flex flex-col gap-x-[10px] gap-[10px] px-[10px]">
              <div className="w-[120px] lg:w-[150px] text-[16px] lg:text-[18px] font-semibold h-[40px] font-bitter">
                {product.name}
              </div>
              <div className="text-[13px] w-[150px] lg:text-[13px] h-[30px] font-sans">{product.subtitle}</div>
              <div className="flex absolte bttom-[180px] lg:botom-[380px]">
                <div className="font-bold font-sans text-[14px] lg:text-[16px] h-[10px] lg:h-[30px]">
                ₦ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                {/* <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">
                   {product.status === 1 ? "In-stock":"Unavailable"}
                </div> */}
                {product.status === 1 && <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">In-stock</div>}
                {product.status !== 1 && <div className="absolute whitespace-nowra ml-[140px] text-[#D23D23] text-[10px] lg:text-[12px] font-semibold">Out of stock</div>}
              </div>
            </div>
          </div>
          </div>
          </div>
              ))}
          </div>
        </div>
      ))}
    </div>}

   

    {/* {!products &&  Array(3)
            .fill("")
            .map((_, index) => (
              <div key={index} className="flex flex-col mb-[30px] justify-center lg:hidden">
                <div className="flex items-center">
                <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="flex flex-row gap-x-2 items-center mx-4">
                    <Skeleton width={180} height={210} className=""/>
                    <Skeleton width={180} height={210} className=""/>
                  </div>
                </div>
                </div>
                </div>
              </div>
            ))} */}


{/* <div
      className="relative w-64 h-80 bg-blue-500 rounded-2xl shadow-lg p-4 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="text-white text-xl font-semibold">Product Name</h2>
      <p className="text-white mt-2">This is a short description of the product.</p>
      <div
        className={`absolute top-4 right-4 flex items-center bg-white text-blue-500 rounded-full shadow-md transition-opacity duration-[2000ms] ease-in-out ${
          hovered ? "px-2 py-1 gap-x-1" : "p-2"
        }`}
      >
        <span className={`text-sm font-medium transition-opacity duration-[2000ms transition-transform duration-[2000ms] ease-in-out ${hovered ? "opacity-100 w-aut0 py-[4px] translate-x-0 transition-transform duration-[2000ms]" : "opacity-0 w-0 h-0 translate-x-5"}`}>
          Add to Cart
        </span>
        <FaPlus className="w-5 h-5 ml-" />
      </div>
    </div> */}

               
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
