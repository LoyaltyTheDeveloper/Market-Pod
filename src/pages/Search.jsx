import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';
import { FaPlus } from "react-icons/fa";
import Footer from '../Components/Footer';
import { RiSearchLine } from "react-icons/ri";
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { LuClock5 } from "react-icons/lu";
import { AuthContext } from '../context/Context.jsx';
import { useEffect, useContext, } from 'react';
import { LuClipboard } from "react-icons/lu";
import { CartContext } from "../context/CartContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LiaTimesSolid } from "react-icons/lia";
import { GrBasket } from "react-icons/gr";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props}
  timeout={{enter: 1500, exit:1000 }}
  />;
});

function Search() {
  const [isLoading, setIsLoading] = useState(false);
     trio.register()
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };


    const [isDialog, setIsDialog] = React.useState(false);
      const [isDialog2, setIsDialog2] = React.useState(false);
     const { state } = useContext(AuthContext);
    
    const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery: initialQuery, searchResults: initialResults } = location.state || { searchQuery: "", searchResults: [] };

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(initialResults); 
  const { addToCartOne, cartError, setCartError, clearCart } = useContext(CartContext);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalProduct2, setModalProduct2] = useState(null);
  const [switchStore, setSwitchStore] = useState(false);


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


   const addToCart = (product) => {
       
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
          });
      };

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

      const handleSecondAdd = (product) => { 
        if(cartError){
          setSwitchStore(true);
          return;
         }      
            else {  
              handleOpen2();
              addToCartOne(product);
              setModalProduct2(product);
            }
          }

          const closeSwitch = () => {
            setCartError(false);
            setSwitchStore(false);
          }

          const goToLanding = () => {
            setCartError(false);
            clearCart();
          }

      const formatNumber = (num) => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      const formattedPrice = formatNumber(modalProduct?.price);
      const formattedPrice2 = formatNumber(modalProduct2?.price);

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

        {isLoading &&  <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}




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
          width: { xs: "60%", sm: "60%", md: "60%", lg: "30%" }, 
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
           <div className="flex flex-row gap-x-[20px] lg:justify-center hidden lg:flex">
            <div className=""><img className="size-[50px] lg:size-[90px] object-contain" src={modalProduct?.image}/></div>
            <div>
              <p className='text-[black] w-[100px] lg:w-[152px] text-[13px] lg:text-[15px] h-[45px] font-saeada font-semibold'>{modalProduct?.name}</p>
              <p className='h-[20px] text-[11px] text-[black] hidden lg:flex'>{modalProduct?.subtitle}</p>
              <p className="h-[25px] text-[13px] lg:text-[15px] text-[black] font-semibold hidden lg:flex">₦{formattedPrice}</p>
              <div className="flex flex-row items-center gap-x-3 mt-[10px]">
                <div className='hidden lg:flex'><button className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
                <div onClick ={() => navigate(`/site/getProduct/${modalProduct.id}`)} className='hidden lg:flex'><p className="text-[11px] lg:text-[13px] underline font-semibold cursor-pointer text-[#31603D]">Item Description</p></div>
              </div>
            </div>
           </div>

           <div className='flex gap-x-2 items-center lg:hidden md:hidden'>
           <div className=""><img className="size-[60px w-20 h-20 object-contain" src={modalProduct?.image}/></div>
           <div className='flex flex-col'>
           <p className='text-[black] w-[100px text-[15px] h-[30px font-semibold'>{modalProduct?.name}</p>
           <p className='h-[20px] text-[11px] text-[black] lg:flex'>{modalProduct?.subtitle}</p>
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
          width: { xs: "60%", sm: "60%", md: "60%", lg: "30%" }, 
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
           <div className="flex flex-row gap-x-[20px] lg:justify-center hidden lg:flex">
            <div className=""><img className="size-[50px] lg:size-[90px] object-contain" src={modalProduct2?.image}/></div>
            <div>
              <p className='text-[black] w-[100px] lg:w-[152px] text-[13px] lg:text-[15px] h-[45px] font-saeada font-semibold'>{modalProduct2?.name}</p>
              <p className='h-[20px] text-[11px] text-[black] hidden lg:flex'>{modalProduct2?.subtitle}</p>
              <p className="h-[25px] text-[13px] lg:text-[15px] text-[black] font-semibold hidden lg:flex">₦{formattedPrice2}</p>
              <div className="flex flex-row items-center gap-x-3 mt-[10px]">
                <div className='hidden lg:flex'><button className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
                <div onClick ={() => navigate(`/site/getProduct/${modalProduct2.id}`)} className='hidden lg:flex'><p className="text-[11px] lg:text-[13px] underline font-semibold cursor-pointer text-[#31603D]">Item Description</p></div>
              </div>
            </div>
           </div>

           <div className='flex gap-x-2 items-center lg:hidden md:hidden'>
           <div className=""><img className="size-[60px w-20 h-20 object-contain" src={modalProduct2?.image}/></div>
           <div className='flex flex-col'>
           <p className='text-[black] w-[100px text-[15px] h-[30px font-semibold'>{modalProduct2?.name}</p>
           <p className='h-[20px] text-[11px] text-[black] lg:flex'>{modalProduct2?.subtitle}</p>
           </div>
           </div>

          </DialogContentText>
        </DialogContent>
    
      </Dialog>


    </React.Fragment>

    {switchStore && (
  <div 
    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
    onClick={closeSwitch} 
  >
    <div 
      className="bg-white p-6 rounded-lg shadow-lg text-center w-80"
      onClick={(e) => e.stopPropagation()} 
    >
      <h1 className='font-bold text-[22px] mb-2'>Switch Stores ?</h1>
      <p className="text-[15px] mb-4">
      Are you sure you want to switch stores, items
      in your cart would be discarded.
      </p>
      <button 
        onClick={goToLanding} 
        className="rounded-full px-20 py-2 border border-[#31603D] text-white bg-[#31603D] hover:bg-green-700"
      >
        Continue
      </button>
    </div>
  </div>
)}







<div className="mt-[40px] mb-[40px] text-[22px] font-bold lg:mt-[140px] font-saeada px-3 md:px-5 lg:px-5">Search Results</div>



<div className="mt-4 flex flex-col lg:flex-wrap gap-x-[50px] gap-y-[30px]">
  {searchResults.length > 0 ? (
    searchResults.map((result) => (
      <div
        key={result.data.id}
        className="lg:w-full flex flex-col lg:flex-row lg:flex-wra gap-y-[20px]"
      >
        {/* Store Section */}
        <div className="lg:border lg:border-transparent flex flex-col justify-center lg:flex-col lg:px-[10px] lg:w-[30%]">
          <div className="flex justify-normal">
            <div className="flex lg:flex-col justify-center lg:justify-start gap-[20px] px-[10px]">
              <div className="h-[100px lg:size-[150px flex flex-row gap-x-[20px]">
                <img
                  className="h-[100px] w-[150px] lg:w-[190px] lg:h-[160px] object-cover rounded-[5px]"
                  src={result.data.image}
                />
                <div
                  onClick={() =>
                    navigate(`/site/getStore/${result.data.id}`)
                  }
                  className="text-white hidden lg:flex whitespace-nowrap"
                >
                  <button className="border border-[#31603D] bg-[#31603D] px-4 my-[55px] rounded-full">
                    View store
                  </button>
                </div>
              </div>

              <div className="w-[300px] flex flex-col gap-[5px]">
                <div>
                  <div className="font-semibold text-[20px] font-saeada truncate w-[200px]">
                    {result.data.name}
                  </div>
                  <div className="flex items-center gap-x-[5px] text-[#31603D]">
                    <div>
                      <LuClock5 />
                    </div>
                    <div className="text-[12px] whitespace-nowrap">
                      Opens {result.data.open_time} - Closes
                      {result.data.close_time}
                    </div>
                  </div>

                  <div className="hidden lg:flex flex flex-wrap items-center mb-[15px]">
                    {result.data.categories &&
                    result.data.categories.length > 0 ? (
                      result.data.categories.slice(0, 4).map((category, index) => (
                        <div
                          className="flex items-center"
                          key={index}
                        >
                          {category}
                          {index <
                            result.data.categories.length - 1 && (
                            <div className="h-[20px] ml-[10px] mr-[10px] border-l border-gray-300 lg:flex justify-between"></div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </div>

                  <div
                    onClick={() =>
                      navigate(`/site/getStore/${result.data.id}`)
                    }
                    className="text-white lg:hidden"
                  >
                    <button className="border border-[#31603D] bg-[#31603D] px-4 py-1 rounded-full">
                      View store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}



        {/* <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-x-[40px] lg:gap-x-[20px] lg:w-[70%]">
          {result.data.products && result.data.products.length > 0 ? (
            result.data.products.slice(0, 4).map((product) => (
              <div className="mb-[30px] cursor-pointer fle justify-cente gap-x- relative" key={product.id}>
                <div className="flex flex-row justify-center lg:flex lg:flex-wrap lg:justify-start">
                  <div className="flex flex-col gap-y-[10px] relative bg-[white] px-[0px] lg:px-[5px] py-[20px] h-[auto] rounded-[5px]">
                    <div className="flex justify-center px-[50px]">
                      <img
                        onClick={() =>
                          navigate(`/site/getProduct/${product.id}`)
                        }
                        src={product.image}
                        className="w-24 h-24 object-contain flex justify-center"
                      />
                     {state.token && <div
                        onClick={()=> addToCart(product)}
                        className="absolute cursor-pointer top-4 right-4 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
                      >
                        <FaPlus className="text-[white] w-5 h-5"/>
                      </div>}
                      {!state.token && <div
                       onClick={()=> handleSecondAdd(product)}
                        className="absolute cursor-pointer top-4 right-4 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
                      >
                        <FaPlus className="text-[white] w-5 h-5" />
                      </div>}
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/site/getProduct/${product.id}`)
                      }
                      className="flex flex-col gap-x-[10px] gap-[10px] px-[10px]"
                    >
                      <div className="w-[180px] truncat font-saeada font-semibold lg:w-[150 px] text-[16px] lg:text-[18px] h-[40px]">
                {product.name}
              </div>
              <div className="text-[13px] w-[150px] lg:text-[13px] h-[30px] font-sans">{product.subtitle}</div>
              <div className="flex absolte bttom-[180px] lg:botom-[380px]">
                <div className="font-bold font-sans text-[14px] lg:text-[16px] h-[10px] lg:h-[30px]">
                ₦ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                
                 {product.status === 1 && <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">In-stock</div>}
                 {product.status !== 1 && <div className="absolute whitespace-nowra ml-[140px] text-[#D23D23] text-[10px] lg:text-[12px] font-semibold">Out of stock</div>}

              </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div> */}

        <div className="lg:min-h-scree lg:overflow-y-auto lg:max-h-[865px] no-scrollbar relative flex flex-co gap-y-8">
  {result.data.products && result.data.products.length > 0 ? (
    <div className="grid grid-cols-2 justify-center lg:flex lg:flex-wrap gap-x-[8px] lg:justify-start">
      {result.data.products.slice(0, 4).map((product) => (
        <div className="mt-[10px] relative cursor-pointer" key={product.id}>
          <div className="justify-center lg:flex lg:flex-wrap gap-[8px] lg:justify-start">
            <div className="flex flex-col gap-y-[10px] bg-[white] px-[0px] lg:px-[15px] py-[20px] h-[auto] rounded-[5px]">
              <div className="flex justify-center px-[50px]">
                <img
                  onClick={() => navigate(`/site/getProduct/${product.id}`)}
                  src={product.image}
                  className="w-24 h-24 object-contain flex justify-center bg-[white] p-4"
                />
                {state.token && (
                  <div className="absolute top-6 right-2">
                    <div
                      onClick={() => addToCart(product)}
                      className="absolute cursor-pointer top-0 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
                    >
                      <FaPlus className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                {!state.token && (
                  <div className="absolute top-6 right-2">
                    <div
                      onClick={() => handleSecondAdd(product)}
                      className="absolute cursor-pointer top-0 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
                    >
                      <FaPlus className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => navigate(`/site/getProduct/${product.id}`)}
                className="flex flex-col gap-x-[10px] gap-y-[10px] px-[10px]"
              >
                <div className="w-[180px] truncate font-saeada font-semibold lg:w-[150px] text-[16px] lg:text-[18px] h-[40px]">
                  {product.name}
                </div>
                <div className="text-[13px] w-[150px] lg:text-[13px] h-[30px] font-sans">
                  {product.subtitle}
                </div>
                <div className="flex absolut bottom-[180px] lg:bottom-[380px]">
                  <div className="font-bold font-sans text-[14px] lg:text-[16px] h-[10px] lg:h-[30px]">
                    ₦ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  {product.status === 1 && (
                    <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">
                      In-stock
                    </div>
                  )}
                  {product.status !== 1 && (
                    <div className="absolute whitespace-nowrap ml-[140px] text-[#D23D23] text-[10px] lg:text-[12px] font-semibold">
                      Out of stock
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p></p>
  )}
</div>





      </div>
    ))
  ) : (
    <div className="flex flex-col gap-y-2 justify-center items-center text-center">
      <div className="bg-[white] p-2 lg:p-6 rounded-full">< LuClipboard className="size-[25px] lg:size-[50px]"/></div>
      <div className="font-bold text-[14px] lg:text-[16px] text-[#31603D]">Oops !</div>
      <div className="text-[14px] lg:text-[16px]">Sorry, the product you're looking for is currently unavailable.</div>
    </div>
  )}
</div>







</div>
<Footer/>
  </>)
}

export default Search
