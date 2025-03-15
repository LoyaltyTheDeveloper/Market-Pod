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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props}
  timeout={{enter: 1500, exit:1000 }}
  />;
});

function ProductDetail() {
  const location = useLocation();
  // useAuthRequest("url","POST",{carId:3})
  const isOpen = location.state?.isOpen;
  const productStore = location.state?.productStore;
   const [isLoading, setIsLoading] = useState(false);
   const { state, dispatch } = useContext(AuthContext);
   const navigate = useNavigate();
   const { addToCartOne } = useContext(CartContext);
   const [isDialog, setIsDialog] = React.useState(false);
   const [isDialog2, setIsDialog2] = React.useState(false);
   const [modalProduct, setModalProduct] = useState(null);
   const [modalProduct2, setModalProduct2] = useState(null);

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
      .then((response) => response.json())
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
                return response.json()}
        )
          .then((data) => {
            setIsLoading(false);
            // handleOpen();
            // toast.success(data.message);
            return;
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(error);
            return;
          });
    navigate('/checkout');
  }

  const buyNow2 = (id) => {
    // addToCart(id);
    if (!isOpen) {
      return toast.error("The store for this product is closed");
    }
    else {
    addToCartOne(product.data);
    navigate('/checkout');
    }
  }

  const handleSecondAdd = (id) => {
    if (!isOpen) {
      return toast.error("The store for this product is closed");
    }
     else {
      handleOpen2();
      addToCartOne(product.data);
      setModalProduct2(product.data);
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

    const formatNumber = (num) => {
      return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const formattedPrice = formatNumber(modalProduct?.price);
    const formattedPrice2 = formatNumber(modalProduct2?.price);

  return (<>
  <Navbar/>
    <div className="min-h-screen bg-[#F9F9F9] overflow-x-hidden overflow-y-hidden">

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
    <div className="px-[20px] mt-[20px] mb-[50px]">
    <div className="flex gap-x-[10px] text-[15px]">
        <div className='cursor-pointer' onClick={() => navigate(-1)}>{productStore}</div>
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

<div className="flex justify-center lg:justify-end">
    
    <div className="flex flex-col text-[white] lg:px-[0px] lg:py-[0px] px-[30px] py-[20px] gap-[10px] mt-[30px] bg-[#31603D] border border-[#31603D] rounded-[8px] w-[95%] lg:w-[270px]">
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
