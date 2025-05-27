import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { RiSearchLine } from "react-icons/ri";
import pod from '../assets/Podlogo.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import productdetail from '../assets/productdetail.svg';
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { AuthContext } from '../context/Context.jsx';
import { useLocation } from "react-router-dom";
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
import { FaPlus } from "react-icons/fa";
import { useCartToggle } from '../context/CartToggleContext.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props}
  timeout={{enter: 1500, exit:1000 }}
  />;
});

function ProductDetail() {
   const { toggleCart } = useCartToggle();
  const location = useLocation();
  // useAuthRequest("url","POST",{carId:3})
  const isOpen = location.state?.isOpen;
  const productStore = location.state?.productStore;
   const [isLoading, setIsLoading] = useState(false);
   const { state, dispatch } = useContext(AuthContext);
   const navigate = useNavigate();
   const { addToCartOne, cartError, setCartError, clearCart } = useContext(CartContext);
   const [isDialog, setIsDialog] = React.useState(false);
   const [isDialog2, setIsDialog2] = React.useState(false);
   const [isDialog3, setIsDialog3] = React.useState(false);
   const [isDialog4, setIsDialog4] = React.useState(false);
   const [modalProduct, setModalProduct] = useState(null);
   const [modalProduct2, setModalProduct2] = useState(null);
   const [modalProduct3, setModalProduct3] = useState(null);
   const [modalProduct4, setModalProduct4] = useState(null);
   const [product2, setProduct2] = useState([]);
   const [switchStore, setSwitchStore] = useState(false);

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

  const handleOpen3 = () => {
    setIsDialog3(true);
  };

  const handleClose3 = () => {
    setIsDialog3(false);
  };

  const handleOpen4 = () => {
    setIsDialog4(true);
  };

  const handleClose4 = () => {
    setIsDialog4(false);
  };

 const addToCart = (id) => {
  if (!isOpen) {
    return toast.error("The store for this product is closed");
  }
    setIsLoading(true);
     
      fetch('https://apis.emarketpod.com/user/cart/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: state.token,
        },
        body: JSON.stringify({ product_id: product.data.id }),
      })
      .then((response) =>{

        if (response.status === 403) {
                  toast.error("Your session has expired");
                  localStorage.removeItem('user');
                  navigate('/signin');
                  dispatch({ type: 'LOG_OUT', payload: { token: null } })
                } 
      
        if(response.status === 400){
        setSwitchStore(true);
        throw new Error();
        }
      
       return response.json()})
        .then((data) => {
          setIsLoading(false);
          setModalProduct(product.data);
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

    const addToCart2 = (product2) => {
      if (!isOpen) {
        return toast.error("The store for this product is closed");
      }
        setIsLoading(true);
         
          fetch('https://apis.emarketpod.com/user/cart/add', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: state.token,
            },
            body: JSON.stringify({ product_id: product2.id }),
          })
          .then((response) => 
            {

              if (response.status === 403) {
                        toast.error("Your session has expired");
                        localStorage.removeItem('user');
                        navigate('/signin');
                        dispatch({ type: 'LOG_OUT', payload: { token: null } })
                      } 
      
              if(response.status === 400){
              setSwitchStore(true);
              throw new Error();
              }
            
             return response.json()}
          )
            .then((data) => {
              setIsLoading(false);
              setModalProduct3(product2);
              handleOpen3();
              // toast.success(data.message);
              return;
            })
            .catch((error) => {
              setIsLoading(false);
              console.error(error);
              return;
            });
        };


  const buyNow = (id) => {
    // addToCart(id);
    if (!isOpen) {
      return toast.error("The store for this product is closed");
    }
      setIsLoading(true);
       
        fetch('https://apis.emarketpod.com/user/cart/add', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: state.token,
          },
          body: JSON.stringify({ product_id: product.data.id }),
        })
        .then((response) => 
        {
                if (response.status === 403) {
                  toast.error("Your session has expired");
                  localStorage.removeItem('user');
                  navigate('/signin');
                  dispatch({ type: 'LOG_OUT', payload: { token: null } })
                } 
      
                  if(response.status === 400){
                  setSwitchStore(true);
                  throw new Error();
                  }    
                return response.json();       
              }
        )
          .then((data) => {
            setIsLoading(false);
            navigate('/checkout');
            // handleOpen();
            // toast.success(data.message);
            return;
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(error);
            return;
          });
  }

  const buyNow2 = (id) => {
    // addToCart(id);
    if(cartError){
      setSwitchStore(true);
      return;
     }
    if (!isOpen) {
      return toast.error("The store for this product is closed");
    }
    else {
    addToCartOne(product.data);
    navigate('/checkout');
    }
  }

  const handleSecondAdd = (id) => {
    if(cartError){
      setSwitchStore(true);
      return;
     }
    if (!isOpen) {
      return toast.error("The store for this product is closed");
    }
     else {
      handleOpen2();
      addToCartOne(product.data);
      setModalProduct2(product.data);
     }
  }
  const handleSecondAdd2 = (product2) => {
    if(cartError){
      setSwitchStore(true);
      return;
     }
    if (!isOpen) {
      return toast.error("The store for this product is closed");
    }
     else {
      handleOpen4();
      addToCartOne(product2);
      setModalProduct4(product2);
     }
  }

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

  useEffect(() => {
    if (isDialog3) {
      const timer = setTimeout(() => {
        handleClose3(); 
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [isDialog3]);

  useEffect(() => {
    if (isDialog4) {
      const timer = setTimeout(() => {
        handleClose4(); 
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [isDialog4]);

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
        .then((data) => {setProduct(data), setProduct2(data)})
        .catch((error) => console.error('Error fetching comments', error))
    }, [productId])

    const goToLanding = () => {
      setCartError(false);
      // navigate('/');
      setSwitchStore(false);
    }

    const closeSwitch = () => {
      setCartError(false);
      setSwitchStore(false);
    }

    const clearUserCart = () => {
          setIsLoading(true);
           
            fetch('https://apis.emarketpod.com/user/cart/remove-all', {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: state.token,
              }
            })
            .then((response) => {
              if (response.status === 403) {
                toast.error("Your session has expired");
                localStorage.removeItem('user');
                navigate('/signin');
                dispatch({ type: 'LOG_OUT', payload: { token: null } })
              } 
                if(response.status === 400){
                 setSwitchStore(true);
                throw new Error();
                }
               
              return response.json()}
            )
              .then((data) => {
                setIsLoading(false);
                toast.success("Cart products removed successfully");
                goToLanding();
                return;
              })
              .catch((error) => {
                setIsLoading(false);
                toast.error("There was an error removing cart products");
                return;
              });
          }; 

    const formatNumber = (num) => {
      return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const formattedPrice = formatNumber(modalProduct?.price);
    const formattedPrice2 = formatNumber(modalProduct2?.price);
    const formattedPrice3 = formatNumber(modalProduct3?.price);
    const formattedPrice4 = formatNumber(modalProduct4?.price);

  return (<>
  <Navbar/>
    <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden lg:px-6">

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
   <div className='flex flex-row justify-center gap-x-2'>
     <div>
   <button 
     onClick={goToLanding} 
     className="rounded-full text-sm  w-[120px] px- py-3 border border-[#31603D] text-[#31603D] bg-[] hover:bg-[#31603D] hover:text-[white]"
   >
     No
   </button>
   </div>
   <div>
   <button 
     onClick={clearUserCart} 
     className="rounded-full text-sm w-[120px] px- py-3 border border-[#31603D] text-white bg-[#31603D] hover:bg-[white] hover:text-[#31603D]"
   >
     Yes, Procced
   </button>
   </div>
   </div>
 </div>
</div>
)}

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
        <div onClick={handleClose} className='flex cursor-pointer'><LiaTimesSolid className="size-[24px] lg:size-[25px] text-[#31603D]"/></div>
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
                <div className='hidden lg:flex'><button onClick={toggleCart} className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
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
        <div onClick={handleClose2} className='flex cursor-pointer'><LiaTimesSolid className="size-[24px] lg:size-[25px] text-[#31603D]"/></div>
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
                <div className='hidden lg:flex'><button onClick={toggleCart} className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
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

      {/* Dialog 3 */}

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
        open={isDialog3}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose3}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle><div className="flex items-center lg:justify-between justify-end">
        <p className="text-[12px] font-semibold lg:text-[14px] text-[#31603D] hidden lg:flex"> An item has been added to your cart </p>
        <div onClick={handleClose3} className='flex cursor-pointer'><LiaTimesSolid className="size-[24px] lg:size-[25px] text-[#31603D]"/></div>
          </div>
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <div className="flex flex-row gap-x-[20px] lg:justify-center hidden lg:flex">
            <div className=""><img className="size-[50px] lg:size-[90px] object-contain" src={modalProduct3?.product_image}/></div>
            <div>
              <p className='text-[black] w-[100px] lg:w-[152px] text-[13px] lg:text-[15px] h-[45px] font-saeada font-semibold'>{modalProduct3?.name}</p>
              <p className='h-[20px] text-[11px] text-[black] hidden lg:flex'>{modalProduct3?.subtitle}</p>
              <p className="h-[25px] text-[13px] lg:text-[15px] text-[black] font-semibold hidden lg:flex">₦{formattedPrice3}</p>
              <div className="flex flex-row items-center gap-x-3 mt-[10px]">
                <div className='hidden lg:flex'><button onClick={toggleCart} className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
                <div onClick ={() => navigate(`/site/getProduct/${modalProduct3.id}`)} className='hidden lg:flex'><p className="text-[11px] lg:text-[13px] underline font-semibold cursor-pointer text-[#31603D]">Item Description</p></div>
              </div>
            </div>
           </div>

           <div className='flex gap-x-2 items-center lg:hidden md:hidden'>
           <div className=""><img className="size-[60px w-20 h-20 object-contain" src={modalProduct3?.product_image}/></div>
           <div className='flex flex-col'>
           <p className='text-[black] w-[100px text-[15px] h-[30px font-semibold'>{modalProduct3?.name}</p>
           <p className='h-[20px] text-[11px] text-[black] lg:flex'>{modalProduct3?.subtitle}</p>
           </div>
           </div>

          </DialogContentText>
        </DialogContent>
    
      </Dialog>


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
        open={isDialog4}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose4}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle><div className="flex items-center lg:justify-between justify-end">
        <p className="text-[12px] font-semibold lg:text-[14px] text-[#31603D] hidden lg:flex"> An item has been added to your cart </p>
        <div onClick={handleClose4} className='flex cursor-pointer'><LiaTimesSolid className="size-[24px] lg:size-[25px] text-[#31603D]"/></div>
          </div>
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <div className="flex flex-row gap-x-[20px] lg:justify-center hidden lg:flex">
            <div className=""><img className="size-[50px] lg:size-[90px] object-contain" src={modalProduct4?.product_image}/></div>
            <div>
              <p className='text-[black] w-[100px] lg:w-[152px] text-[13px] lg:text-[15px] h-[45px] font-saeada font-semibold'>{modalProduct4?.name}</p>
              <p className='h-[20px] text-[11px] text-[black] hidden lg:flex'>{modalProduct4?.subtitle}</p>
              <p className="h-[25px] text-[13px] lg:text-[15px] text-[black] font-semibold hidden lg:flex">₦{formattedPrice4}</p>
              <div className="flex flex-row items-center gap-x-3 mt-[10px]">
                <div className='hidden lg:flex'><button onClick={toggleCart} className="bg-[#31603D] px-2 py-2 lg:px-4 lg:py-2 rounded-full whitespace-nowrap"><div className="flex items-center gap-x-[5px] text-[white] text-[11px] lg:text-[14px]"><GrBasket className="text-[white]"/>View Cart</div></button></div>
                <div onClick ={() => navigate(`/site/getProduct/${modalProduct4.id}`)} className='hidden lg:flex'><p className="text-[11px] lg:text-[13px] underline font-semibold cursor-pointer text-[#31603D]">Item Description</p></div>
              </div>
            </div>
           </div>

           <div className='flex gap-x-2 items-center lg:hidden md:hidden'>
           <div className=""><img className="size-[60px w-20 h-20 object-contain" src={modalProduct4?.product_image}/></div>
           <div className='flex flex-col'>
           <p className='text-[black] w-[100px text-[15px] h-[30px font-semibold'>{modalProduct4?.name}</p>
           <p className='h-[20px] text-[11px] text-[black] lg:flex'>{modalProduct4?.subtitle}</p>
           </div>
           </div>

          </DialogContentText>
        </DialogContent>
    
      </Dialog>


    </React.Fragment>

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

    {isLoading &&  <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
  size="70"
  speed="1.3" 
  color="#4ade80" 
></l-trio>    </div>}



{product && (<>
    <div className="px-[20px] mt-[20px] mb-[50px">
    <div className="flex gap-x-[10px] text-[15px]">
        <div className='cursor-pointer' onClick={() => navigate(-1)}>{product.data.store_name}</div>
        /
        <div className="font-semibold">{product.data.category_name}</div>
    </div>

    <div className="lg:flex lg:justify-between lg:flex-row-reverse gap-x-[100px lg:items-center pt-[30px]">
    <div className="lg:mt-[-4%] lg:py-10 rounded-[10px] lg:px-[12%] flex py-6 mx-2 bg-[white] flex justify-center lg:justify-norma pb-[30px mb-[40px]"><img className="object-cove object-contain w-[200px h-[200px] lg:w-[350px] lg:h-[350px] lg:mr-[500px" src={product.data.image}></img></div>

    
    <div className="lg:pr-[200p] lg:absolut left-6 lg:w-[50%]">
    <div className="flex flex-col gap-y-[10px] pt-[50px lg:mt-[-500px">
       <div className="font-bold text-[20px] w-[200px] lg:text-[35px] lg:w-[350px] lg:pt-[30px font-saeada font-bold">{product.data.name} - {product.data.weight}kg</div>
       <div>{product.data.subtitle}</div>
       <div className="lg: h-[40px] w-[90%]">{product.data.description}</div>
    </div>

    <div className="flex flex-col gap-[20px] pt-[30px]">
    <div className="text-[20px] font-semibold mt-[40px]">₦ {product.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>

   {state.token && <div className="flex gap-[10px]">
        <button onClick={buyNow}><div className="text-[#31603D] text-[14px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[16px] lg:px-[10px] lg:px-[50px]">Buy Now</div></button>
        <div>
        <button onClick={()=> addToCart(product.data.id)}><div className="text-[white] bg-[#31603D] text-[14px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[16px] lg:px-[10px] lg:px-[50px] flex gap-[5px] items-center">Add To Cart <div className="hidden lg:flex lg:text-[px]">+</div></div></button>
        </div>
    </div>}

    {!state.token && <div className="flex gap-[10px]">
        <button onClick={buyNow2}><div className="text-[#31603D] text-[14px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[16px] lg:px-[10px] lg:px-[50px]">Buy Now</div></button>
        <div>
        <button onClick={()=> handleSecondAdd(product.data.id)}><div className="text-[white] bg-[#31603D] text-[14px] border border-[#31603D] py-[8px] px-[24px] rounded-[20px] lg:text-[16px] lg:px-[10px] lg:px-[50px] flex gap-[5px] items-center">Add To Cart <div className="hidden lg:flex lg:text-[px]">+</div></div></button>
        </div>
    </div>}

    </div>
    </div>
    </div>




   
    </div>
    </>)}

    <div className='py-4 px-4 lg:py-0'>
      <hr className='hidden lg:flex py-8'></hr>
    </div>

     {/* People also bought */}


     <div className=''>

    

<div className='flex flex-col lg:flex-row lg:justify-between mb-8 lg:px-6 lg:gap-x-'>

  <div className='lg:self-end'>
<div className='font-semibold font-saeada text-[20px] lg:text-[30px] mt- px-2 lg:mb-10'>People also bought !</div>

{/* <div className=''>
<div className='mt-4 m-aut fle grid grid-cols-2 justify-center lg:flex lg:flex-wrap ga-x-16 lg:gap-x-6 gap-y-4 lg:justify-start'>
{product2.peopleAlsoBought && product2.peopleAlsoBought.length > 0 ? (
product2.peopleAlsoBought.map((products2) => (
<div className="mb-[30px cursor-pointer relative fle justify-cente relative gap-x- flex" key={products2.id}>
  <div className="fle flex-ro justify-center lg:flex lg:flex-wrap lg:justify-start">
    <div className="flex flex-col gap-y-[10px] relative bg-[white] px-[0px] lg:px-[5px] py-[20px] h-[auto] rounded-[5px]">
      <div className="flex justify-center px-[50px]">
        <img
          onClick={() => navigate(`/site/getProduct/${products2.id}`)}
          src={products2.product_image} 
          className="w-24 h-24 object-contain flex justify-center"
        />
        {state.token && (
          <div
            onClick={() => addToCart2(products2)}
            className="absolute cursor-pointer top-4 right-4 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
          >
            <FaPlus className="text-[white]" />
          </div>
        )}
        {!state.token && (
          <div
            onClick={() => handleSecondAdd2(products2)}
            className="absolute cursor-pointer top-4 right-4 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
          >
            <FaPlus className="text-[white]" />
          </div>
        )}
      </div>
      <div
        onClick={() => navigate(`/site/getProduct/${products2.id}`)}
        className="flex flex-col gap-x-[10px] gap-[10px] px-[10px]"
      >
        <div className="w-[180px] truncat font-saeada font-semibold lg:w-[150 px] text-[16px] lg:text-[18px] h-[40px]">
          {products2.name}
        </div>
        <div className="text-[13px] w-[150px] lg:text-[13px] h-[30px] font-sans">
          {products2.subtitle}
        </div>
        <div className="flex absolte bttom-[180px] lg:botom-[380px]">
          <div className="font-bold font-sans text-[14px] lg:text-[16px] h-[10px] lg:h-[30px]">
            ₦ {products2.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          {products2.status === 1 && (
            <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">
              In-stock
            </div>
          )}
          {products2.status !== 1 && (
            <div className="absolute whitespace-nowrap ml-[140px] text-[#D23D23] text-[10px] lg:text-[12px] font-semibold">
              Out of stock
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
))
) : (
<p></p>
)}
</div>
</div> */}


<div className="lg:min-h-scree lg:overflow-y-aut lg:max-h-[865px] justify-center relative flex flex-co gap-y-8 lg:self-end">
{product2.peopleAlsoBought && product2.peopleAlsoBought.length > 0 ? (
<div className="grid grid-cols-2 justify-center lg:flex lg:flex-wrap gap-x-[8px] lg:justify-start">
  {product2.peopleAlsoBought.map((products2) => (
    <div className="mt-[10px] relative cursor-pointer" key={products2.id}>
      <div className="justify-center lg:flex lg:flex-wrap gap-[8px] lg:justify-start">
        <div className="flex flex-col gap-y-[10px] bg-[white] relative px-[0px] lg:px-[15px] py-[20px] h-[auto] rounded-[5px]">
          <div className="flex justify-center px-[50px]">
            <img
              onClick={() => navigate(`/site/getProduct/${products2.id}`)}
              src={products2.product_image}
              className="w-24 h-24 size- [110px] object-cove object-contain flex justify-center bg-[white] p-4"
            />
            {state.token && (
              <div className="absolute top-6 right-2">
                <div
                  onClick={() => addToCart2(products2)}
                  className="absolute cursor-pointer top-0 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
                >
                  <FaPlus className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
            {!state.token && (
              <div className="absolute top-6 right-2">
                <div
                  onClick={() => handleSecondAdd2(products2)}
                  className="absolute cursor-pointer top-0 right-2 lg:right-4 flex items-center border border-[#31603D] bg-[#31603D] text-white rounded-full p-2"
                >
                  <FaPlus className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>
          <div
            onClick={() => navigate(`/site/getProduct/${products2.id}`)}
            className="flex flex-col gap-x-[10px] gap-y-[10px] px-[10px]"
          >
            <div className="w-[180px] truncat font-saeada font-semibold lg:w-[150px] text-[16px] lg:text-[18px] h-[40px]">
              {products2.name}
            </div>
            <div className="text-[13px] w-[150px] lg:text-[13px] h-[30px] font-sans">
              {products2.subtitle}
            </div>
            <div className="flex absolut bottom-0 lg:bottom-[380px]">
              <div className="font-bold font-sans text-[14px] lg:text-[16px] h-[10px] lg:h-[30px]">
                ₦ {products2.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              {products2.status === 1 && (
                <div className="absolute whitespace-nowrap ml-[140px] text-[#31603D] text-[10px] lg:text-[12px] font-semibold">
                  In-stock
                </div>
              )}
              {products2.status !== 1 && (
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






<div className="flex justify-center lg:justify-end relative my-4 lg:my-0 lg:w-[240px]">

<div className="flex flex-col lg:self-end lg:h-[350px] text-[white] lg:px-[0px] lg:py-[0px] px-[30px] py-[20px] gap-[10px] lg:mt-[10px bg-[#31603D] border border-[#31603D] rounded-[8px] w-[90%] lg:w-[300px]">

<div className="hidden lg:flex h-[150px] h-ful">
  <img className="object-cover" src={productdetail}/>
  </div>

<div className="flex flex-col lg:px-4 lg:py- lg:pb-10 lg:fle lg:flex-col gap-y-2 lg:gap-y-">
    <div className="text-[20px] font-bold font-saeada">Share the experience</div>
    <div className="lg:hidden font-sans">Invite friends sha</div>
    <div className="hidden lg:flex text-[14px] font-sans">Love how easy it is to get fresh groceries from your local markets? Why not share the convenience with your friends!</div>


    <div className="flex items-center gap-x-[5px] cursor-pointer lg:absolute bottom-2 lg:mt- lg:mb-">
        <div onClick={copy} className="hidden lg:flex"><MdOutlineContentCopy className="size-[20px]"/></div>
    <button onClick={copy} className="underline font-sans">Copy Link</button>
    </div>

    </div>
</div>

</div>






</div>
</div>


    </div>
    <Footer/>
 </> )
}

export default ProductDetail
