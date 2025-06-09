import React, { useState, useEffect, useContext } from 'react';
import pod from '../assets/Podlogo.svg';
import { GrLocation } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { MdPersonOutline } from "react-icons/md";
import { GrBasket } from "react-icons/gr";
import { PiNotepadBold } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";
import produce from '../assets/Vector.svg';
import meat from '../assets/meat.svg';
import milk from '../assets/milk.svg';
import spice from '../assets/herbs.svg';
import oil from '../assets/oil.svg';
import bread from '../assets/bread.svg';
import plastic from '../assets/plastic bottle.svg';
import laundry from '../assets/laundry.svg';
import beauty from '../assets/beauty.svg';
import toy from '../assets/toy.svg';
import stationery from '../assets/stationery.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Context.jsx';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import product from '../assets/Cart image.svg'
import { GoTrash } from "react-icons/go";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { CartContext } from '../context/CartContext.jsx';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import dropdownData from '../index.json';
import { useCartToggle } from '../context/CartToggleContext.jsx';
import { TbTruckDelivery } from "react-icons/tb";
import { TfiPackage } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { Modal } from "@mui/material";

function Navbar() {

  // const [isCartOpen, setIsCartOpen] = useState(false);
   const {isCartOpen, setIsCartOpen} =  useCartToggle();
  const [locations, setSelectedLocation] = useState('');
  trio.register()
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);
   const [refreshOrders, setRefreshOrders] = useState(false);
  const [quantity, setQuantity] = useState(
    Array.isArray(products)
      ? products.reduce((acc, product) => {
        acc[product.id] = product.quantity || 0;
        return acc;
      }, {})
      : {}
  );
  const { cartOne, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, updateNavbar } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
 const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  //  const getProducts = () => {

  //        fetch('https://apis.emarketpod.com/user/cart', {
  //          method: "GET",
  //          headers: {
  //            "Content-Type": "application/json",
  //            Authorization: state.token,

  //          },
  //        })
  //        .then((response) => response.json())
  //          .then((data) => {
  //            setProducts(data);
  //          })
  //          .catch((error) => {
  //            console.error(error);
  //          });
  //      };


  // reload cart

  const [openOrderModal, setOpenOrderModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

   const handleOpen = (orders) => {
    setSelectedItems(orders.items); // Assuming orders.items is an array of items
    setSelectedOrderId(orders); // Assuming items is an array and you want the first item's order_id
    setOpenOrderModal(true);
  };

  const handleClose = () => {
    setOpenOrderModal(false);
    setSelectedItems([]);
  };

    const copy = () => {
            const phone = "+2347014131367";
        
            navigator.clipboard.writeText(phone)
              .then(() => {
                toast.success("Phone number copied to clipboard!");
              })
              .catch(err => {
                console.error("Failed to copy phone number: ", err);
              });
            };


  const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    ...theme.applyStyles('dark', {
      backgroundColor: darken(theme.palette.primary.main, 0.8),
    }),
  }));
  
  const GroupItems = styled('ul')({
    padding: 0,
  });

  const stateAndCapital = [
    // { location: "Abakaliki, Ebonyi State" },
    // { location: "Abeokuta, Ogun State" },


    // { location: "Abuja, FCT" },

    // { location: "Ado-Ekiti, Ekiti State" },
    // { location: "Akure, Ondo State" },
    // { location: "Asaba, Delta State" },
    // { location: "Awka, Anambra State" },
    // { location: "Bauchi, Bauchi State" },
    // { location: "Benin City, Edo State" },
    // { location: "Birnin Kebbi, Kebbi State" },
    // { location: "Calabar, Cross River State" },
    // { location: "Damaturu, Yobe State" },
    // { location: "Dutse, Jigawa State" },
    // { location: "Enugu, Enugu State" },
    // { location: "Gombe, Gombe State" },
    // { location: "Gusau, Zamfara State" },

    // { location: "Ibadan, Oyo State" },
    // { location: "Ikeja, Lagos State" },
    { location: "Ilorin, Kwara State" },

    // { location: "Jalingo, Taraba State" },
    // { location: "Jos, Plateau State" },
    // { location: "Kaduna, Kaduna State" },
    // { location: "Kano, Kano State" },
    // { location: "Katsina, Katsina State" },
    // { location: "Lafia, Nasarawa State" },
    // { location: "Lokoja, Kogi State" },
    // { location: "Maiduguri, Borno State" },
    // { location: "Makurdi, Benue State" },
    // { location: "Minna, Niger State" },

    // { location: "Osogbo, Osun State" },

    // { location: "Owerri, Imo State" },
    // { location: "Port Harcourt, Rivers State" },
    // { location: "Sokoto, Sokoto State" },
    // { location: "Umuahia, Abia State" },
    // { location: "Uyo, Akwa Ibom State" },
    // { location: "Yenagoa, Bayelsa State" },
    // { location: "Yola, Adamawa State" },
    // { location: "Zaria, Kaduna State" }
  ];
  

  const options = stateAndCapital.map((option) => {
    const firstLetter = option.location[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  }
  );

   const locationChange = () => {

   if (locations === ""){
    toast.error("Please select a location.");
   }
   else {
    navigate('/location');
   }
   return;
  }

  useEffect(() => {
    setIsLoading(true);

    fetch('https://apis.emarketpod.com/user/cart', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setProducts(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [refresh]);


  useEffect(() => {
    setIsLoading(true);
      fetch('https://apis.emarketpod.com/user/orders',
        {
          method: "GET",
          headers: {
            "Content-Type":"application/json",
            Authorization: state.token,
          }
        }
      )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setOrders(data.data);
        setError(null);
      }
      )
      .catch((error) => {
        setIsLoading(false);
        setError(error.message)
        console.error(error)})
  }, [refreshOrders])


  // const reloadCart = () => {
  //   useEffect(() => {
  //     setIsLoading(true);
  
  //     fetch('https://apis.emarketpod.com/user/cart', {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: state.token,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setIsLoading(false);
  //         setProducts(data);
  //       })
  //       .catch((error) => {
  //         setIsLoading(false);
  //         console.error(error);
  //       });
  //   }, [refresh]);
  // }

  const deleteProduct = (product) => {
    setIsLoading(true);

    fetch('https://apis.emarketpod.com/user/cart/remove', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.token,
      },
      body: JSON.stringify({ product_id: product.product_id }),
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
        toast.success(data.message);
        setRefresh(!refresh);
        return;
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const updateQuantity = (productId, newQuantity) => {
    setIsLoading(true);
    fetch('https://apis.emarketpod.com/user/cart/update-quantity', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.token,
      },
      body: JSON.stringify({ product_id: productId, quantity: newQuantity }),
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
        toast.success(data.message);
        setRefresh(!refresh);
        setQuantity((prevQuantities) => ({
          ...prevQuantities,
          [productId]: newQuantity,
        }));
        // console.log({product_id: productId, quantity: newQuantity});
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleSearch = () => {
    setIsSearchLoading(true);
    if (!searchQuery) {
      toast.error('Please search a stall or product');
    }

    fetch(`https://apis.emarketpod.com/site/search?query=${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          setIsSearchLoading(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/search", { state: { searchQuery, searchResults: data.results } });
        setIsSearchLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setIsSearchLoading(false);
      })
      .finally(() => {

      });
  };

  const handleSearch2 = (item) => {
    setIsSearchLoading(true);
    fetch(`https://apis.emarketpod.com/site/search?query=${item}`)
      .then((response) => {
        if (!response.ok) {
          setIsSearchLoading(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/search", { state: { item, searchResults: data.results } });
        setIsSearchLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setIsSearchLoading(false);
      })
      .finally(() => {
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleIncrease = (productId) => {
    const currentQuantity = quantity[productId] || 1;
    const newQuantity = currentQuantity + 1;
    updateQuantity(productId, newQuantity);
  }
  const handleDecrease = (productId) => {
    const currentQuantity = quantity[productId] || 1;
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(productId, newQuantity);

    }
  }

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setIsCartOpen(newOpen);

    setRefresh(!refresh);
  };

  

    const toggleOrders = () => {
    setIsOrdersOpen(true);
     setRefresh(!refresh);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);


  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [expandedCategory, setExpandedCategory] = useState(null);

  // const toggleCategory = (category) => {
  //   setExpandedCategory(expandedCategory === category ? null : category);
  // };

  // const toggleExpandedDropdown = (dropdown) => {
  //   setExpandedDropdown(expandedDropdown === dropdown ? null : dropdown);
  // };

  const [expandedDropdown, setExpandedDropdown] = useState(null);

  const toggleCategory = (id) => {
    setExpandedDropdown(expandedDropdown === id ? null : id);
  };

  const categories = [
    { id: 1, name: 'Produce', image: produce, items: ['Produce', 'Fruit', 'Vegetable'] },
    { id: 2, name: 'Meat & Seafood', image: meat, items: ['Meat', 'Poultry', 'Seafood'] },
    { id: 3, name: 'Dairy & Eggs', image: milk, items: ['Diary Products', 'Eggs', 'Dairy Alternatives'] },
    { id: 4, name: 'Herbs & Spice', image: spice, items: ['Fresh & Dried Herbs', 'Spices & Seeds', 'Seasoning & Blends'] },
    { id: 5, name: 'Oil and Vinegar', image: plastic, items: ['Cooking Oils', 'Infused Oils', 'Vinegars'] },
    { id: 6, name: 'Beverage & Packed Foods', image: bread, items: ['Beverage', 'Packaged Foods', 'Snacks'] },
    { id: 7, name: 'Plasticware & Bags', image: oil, items: ['Plastiware', 'Plastic Bags', 'Special Plasticware'] },
    { id: 8, name: 'Laundry', image: laundry, items: ['Detergents & Soaps', 'Fabric Care Products', 'Laundry Accessories'] },
    { id: 9, name: 'Health & Beauty', image: beauty, items: ['Personal Care & Hygiene', 'Hair Care', 'Skin Care & Beauty'] },
    { id: 10, name: 'Baby & Kids', image: toy, items: ['Baby Care Essentials', 'Baby Food & Feeding', 'Kids Clothing & Accessories'] },
    { id: 11, name: 'Stationery', image: stationery, items: ['Writing & Drawing Tools', 'Office Suppliers & Organizers'] },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1020) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const goToDashboard = () => {
        navigate("/dashboard?showOrders=true");
      };

      const goToCheckout = () => {
        navigate("/checkout");
        setIsCartOpen(false);
      }


  const Profile = () => {
    const displayName = `${state.user.last_name ? (state.user.last_name == '' ? 'User' : state.user.last_name) : "User"} ${state.user.first_name ?? ''}`;
    return (
      <button className="font-semibold text-[#31603D]" onClick={() => navigate("/dashboard")}>
        {/* {displayName} */}
       {state.email || 'User'}
      </button>
    )
  }

  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
 

  const subtotal = Array.isArray(products) ? products.reduce((acc, product) => {
    const price = Number(product.price) || 0;
    const quantity = Number(product.quantity) || 0;
    return acc + price * quantity;
  }, 0) :0;

  const subtotal2 = Array.isArray(cartOne) ? cartOne.reduce((acc, product) => {
    const price = Number(product.price) || 0;
    const quantity = Number(product.quantity) || 0;
    return acc + price * quantity;
  }, 0) :0;

  return (<>
    <nav className="bg-white z-50 fixed shadow-md overflow-x-hidden overflow-y-hidden w-full">
      <div className="mx-auto py-[13px] my-auto px-4 lg:ml-[40px]">
        <div className="flex justify-between h-[70px]">



          <div className="flex items-center">  {updateNavbar ? "" : ""}
            
          {isSearchLoading && <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
          size="70"
          speed="1.3"
          color="#4ade80"
        ></l-trio>    </div>}
         

            <div className="ml-[-20px] flex justify-center lg:ml-[-10px]">
              <img src={pod} onClick={() => navigate("/")} className="size-[150px] cursor-pointer" />
            </div>
            <div className="h-[50px] ml-[25px] hidden border-l border-gray-300 lg:flex justify-between"></div>

            <div onClick={openModal} className="ml-[30px] hidden lg:flex flex-col cursor-pointer">
              <div className="font-saeada font-semibold text-[13px]">Location</div>
              <div className="flex flex-row items-center gap-[7px]">
                <div><GrLocation className="size-[16px]" /></div>
                <div className="text-[13px] text-[#31603D] font-bold">Ilorin, Kwara State</div>
                <div><IoIosArrowDown className="size-[16px]" /></div>
              </div>
            </div>

            <div className="absolute right-[170px] flex flex-row items-center gap-x-[50px]">

              <div className="flex flex-row items-center hidden lg:flex md:hidden">
                <RiSearchLine onClick={handleSearch} className="absolute ml-[20px] size-[15px]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-[360px] pl-[50px] py-[10px] pr-[20px] rounded-[100px] bg-[#F9F9F9] focus:outline-none text-[13px]"
                  placeholder="Search Stalls & products"
                />
              </div>

              <div className="hidden lg:flex flex-col w-[100px">
                <div className="font-saeada font-semibold text-[13px]">Account</div>
                <div className="flex flex-row items-center gap-[7px]">
                  <div><MdPersonOutline className="size-[20px]" /></div>
                  {
                    state.isAuthenticated ? <>
                     <div className="font-semibold text-[#31603D] truncate cursor-pointer w-[80px]" onClick={() => navigate("/dashboard")}>
                      {state.email}
                     </div>
                    </> : <>
                    <div className='flex gap-x-2 items-center'>
                      <Link to="/signin"><div className="text-[13px] text-[#31603D] font-bold underline">Login</div></Link>
                      <div>or</div>
                      <Link to="/signup"><div className="text-[13px] text-[#31603D] font-bold underline">Create Account</div></Link>
                      </div>
                    </>
                  }

                </div>
              </div>

              {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
              )}

              {isOrdersOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOrdersOpen(false)}></div>
              )}

              {state.token && 
              <div
               className="flex flex-col items-center hidden lg:flex flex-col cursor-pointer">
                <div className="font-saeada font-semibold text-[13px]">Orders</div>
                <div   onClick={toggleOrders} ><PiNotepadBold className="size-[20px]" /></div>
              </div>}



             {state.token && <div onClick={toggleDrawer(true)} className="hidden cursor-pointer lg:flex flex-col">
                {products.length > 0 && <div className="border border-[#F5C065] size-[12px] bg-[#F5C065] rounded-[100%] absolut fixed right-[77px top-[18px right-[249px] top-[45px]"></div>}
                <div className="font-saeada font-semibold text-[13px]">Cart</div>
                <div className="flex flex-row items-center gap-[10px]">
                  <div className="w-[20px"><GrBasket className="size-[20px]" /></div>
                  <div className="fixe absolut w-[55px] right-[8% text-[13px] text-[#31603D] font-bold whitespace-nowrap">{(products.length) || 0} Item(s)</div>
                </div>
              </div>}

              {!state.token && <div onClick={toggleDrawer(true)} className="hidden cursor-pointer lg:flex flex-col">
                {cartOne.length > 0 && <div className="border border-[#F5C065] size-[12px] bg-[#F5C065] rounded-[100%] absolut fixed right-[77px top-[18px right-[249px] top-[45px]"></div>}
                <div className="font-bold text-[13px]">Cart</div>
                <div className="flex flex-row items-center gap-[10px]">
                  <div className="w-[20px"><GrBasket className="size-[20px]" /></div>
                  <div className="fixe absolut w-[55px] right-[8% text-[13px] text-[#31603D] font-bold whitespace-nowrap">{(cartOne.length) || 0} Item(s)</div>
                </div>
              </div>}
            </div>

            <div
            className="absolute right-[30px] flex flex-row gap-x-[30px] items-center cursor-pointer">
              {state.token && <div className="flex flex-col items-center lg:hidden">
                <div onClick={toggleOrders} ><PiNotepadBold className="size-[20px]" /></div>
              </div>}


              {state.token&&<div onClick={toggleDrawer(true)} className="lg:flex flex-col cursor-pointer lg:hidden">
                {products.length > 0 && <div className="border border-[#F5C065] size-[12px] bg-[#F5C065] rounded-[100%] absolute right-[63px] top-[-4px]"></div>}
                <div><GrBasket className="size-[20px]" /></div>
              </div>}

              {!state.token&&<div onClick={toggleDrawer(true)} className="lg:flex flex-col cursor-pointer lg:hidden">
                {cartOne.length > 0 && <div className="border border-[#F5C065] size-[12px] bg-[#F5C065] rounded-[100%] absolute right-[63px] top-[-4px]"></div>}
                <div><GrBasket className="size-[20px]" /></div>
              </div>}

              <button onClick={toggleSidebar}>
                <div className="grid grid-cols-2 gap-[1px] lg:hidden">
                  <div className="w-[9px] h-[9px] border-[2px] border-black rounded-[3px]"></div>
                  <div className="w-[9px] h-[9px] border-2 border-black rounded-[3px]"></div>
                  <div className="w-[9px] h-[9px] border-2 border-black rounded-[3px]"></div>
                  <div className="w-[9px] h-[9px] border-2 border-black rounded-[3px]"></div>
                </div>
              </button>
            </div>

            {isModal && (
              <>

                <div
                  className="fixed inset-0 bg-black bg-opacity-20 z-50 flex"
                  onClick={closeModal}
                ></div>


           


                <div className="fixed mt-[300px top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center z-50 flex items-center w-[300px] h-[300px]">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full pb-[40px]">
                    <div className="flex flex-row">
                      <h2 className="text-[15px] font-bold mb-4 text-[#31603D]">Select Location</h2>
                      <div className="absolute right-[30px] font-bold" onClick={closeModal}><LiaTimesSolid className="size-[20px] text-[#31603D]" /></div>
                    </div>
                    {/* <div className="flex flex-row items-center mb-[10px]">
                      <GrLocation className="absolute ml-[20px] size-[15px]" />
                      <input
                        type="text"
                        className="w-full border border-gray-300 pl-[50px] py-[10px] pr-[20px] rounded-[100px] focus:outline-none text-[13px]"
                      />
                    </div> */}

                    <div className="flex flex-row items-center mb-[10px]">
                    <GrLocation className="absolute ml-[20px] size-[15px]" />
                    <Autocomplete className=""
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.location}
      onChange={(event, value) => setSelectedLocation(value?.location || '')}
      sx={{
        "& .MuiOutlinedInput-root": {
         borderRadius: "30px"
       }, 
       width: {xs:"100%", lg:"100%"}
     }}
      renderInput={(params) => <TextField {...params} label="" placeholder="Select Location"
      InputProps={{
        ...params.InputProps,
        style: { paddingLeft: "40px" }, 
      }}
/>}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
    </div>
                <button onClick={locationChange}
                      className="font-bold hover:bg-green-700 text-[15px] w-full bg-[#31603D] py-[10px] pr-[20px] text-white rounded-[100px]"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </>
            )}

            <div
              className={`fixed z-10 top-0 left-0 h-full w-full bg-[white] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
              <div className="text-black p-4">
                <div className="flex ml-[20px] mt-[15px] gap-x-[200px]">

                  <div>
                    <div className='cursor-pointer' onClick={openModal}><GrLocation className="size-[20px]" /></div>
                  </div>

                  <LiaTimesSolid className="hover:bg-[grey] size-[25px] absolute right-[45px] text-[#31603D] cursor-pointer" onClick={toggleSidebar} />
                </div>

                <div className="flex lg:mt-[-100px] items-center justify-center my-3">
                  <hr className="w-[45%] border-t border-gray-300" />
                  <hr className="w-[45%] border-t border-gray-300" />
                </div>


                {/* <div className="p-4">
                  <div className="flex flex-col gap-y-[25px]">
                    {categories.map((category) => (
                      <div key={category.id} className="flex flex-col gap-y-2">
                        <div
                          className="flex items-center gap-x-3 cursor-pointer"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <img src={category.image} alt={category.name} className="w-6 h-6" />
                          <span className="text-[16px]">{category.name}</span>
                          <IoIosArrowDown
                            className={`transition-transform ${expandedCategory === category.id ? 'rotate-0' : 'rotate-0'
                              }`}
                          />
                        </div>
                        {expandedCategory === category.id && (
                          <div className="pl-[50px] flex flex-col gap-y-[10px]">
                            {category.items.map((item, index) => (
                              <p key={index} className="text-[14px] text-gray-600">
                                <div onClick={()=>handleSearch2(item)}className="flex flex-row gap-x-[10px] cursor-pointer">
                                  {item}
                                </div>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div> */}



<div className="p-4">
      <div className="flex flex-col gap-y-[25px]">
        {dropdownData.dropdowns.map((dropdown) => {
          // Pick a random category image
          const randomCategory =
            dropdown.categories[
              Math.floor(Math.random() * dropdown.categories.length)
            ];
            // const randomSearch = dropdown.categories.items[Math.floor(Math.random() * dropdown.categories.length)];

          return (
            <div key={dropdown.id} className="flex flex-col gap-y-2">
              <div
                className="flex items-center gap-x-3 cursor-pointer"
                onClick={() => toggleCategory(dropdown.id)}
              >
                <img
                  src={dropdown.image}
                  alt={dropdown.name}
                  className="w-6 h-6"
                />
                <span className="text-[16px]">{dropdown.name}</span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    expandedDropdown === dropdown.id ? "rotate-0" : "rotate-0"
                  }`}
                />
              </div>

              {expandedDropdown === dropdown.id && (
                <div className="pl-[50px] flex items-center gap-x-4">
                  {/* List of categories */}
                  <div className="flex flex-col gap-y-[10px]">
                    {dropdown.categories.map((category) => (
                      <span
                      onClick={()=>handleSearch2(category.category[Math.floor(Math.random() * category.items.length)])}
                        key={category.id}
                        className="cursor-pointer text-[14px] text-gray-600"
                      >
                        {category.category}
                        {/* {category.category[Math.floor(Math.random() * dropdown.categories.items.length)]} */}
                      </span>
                    ))}
                  </div>

                  {/* Random Category Image (Now on the right) */}
                  <img
                    src={randomCategory.image}
                    alt={randomCategory.category}
                    className="w-12 h-12"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>


                <div className="flex items-center justify-center mt-[10px]">
                  <hr className="w-[50%] border-t border-gray-300" />
                  <hr className="w-[50%] border-t border-gray-300" />
                </div>

                <div className="flex flex-row gap-x-[5px] items-center">
                  <div><MdPersonOutline className="size-[20px]" /></div>
                  {
                    state.isAuthenticated ? <>
                      <Profile />
                    </> : <>
                      <Link to="/signin"><div className="text-[13px] text-[#31603D] font-bold underline">Login</div></Link>
                      <div>or</div>
                      <Link to="/signup"><div className="text-[13px] text-[#31603D] font-bold underline">Create Account</div></Link>
                    </>
                  }
                </div>


              </div>

            </div>

          </div>


             <Modal open={openOrderModal} onClose={handleClose}>
           
         <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] lg:w-[450px] bg-white max-h-[80vh] h-[550px'>
             
           {/* Modal Wrapper */}
           <div className='relative h-full flex flex-col'>
       
             {/* Bar Start - Fixed Header */}
             <div className='sticky top-0 bg-white z-20 p-4 border-b rounded-t-md'>
               <div className='flex justify-between items-center'>
                 <div className='flex flex-col'>
                   <div className='font-bold font-saeada md:text-[20px]'>
                     Order ID #{selectedOrderId?.order_id}
                   </div>
       
                   {selectedOrderId?.status === "0" && (
                     <div className="flex items-center gap-x-[5px] text-[12px]">
                       <TfiPackage className='text-[#31603D]' />
                       <div className="text-[#31603D]">Awaiting Pick-up</div>
                     </div>
                   )}
                   {selectedOrderId?.status === "1" && (
                     <div className="flex items-center gap-x-[5px] text-[12px]">
                       <TbTruckDelivery className='text-[#31603D]' />
                       <div className="text-[#31603D]">In Transit</div>
                     </div>
                   )}
                   {selectedOrderId?.status === "2" && (
                     <div className="flex items-center gap-x-[5px] text-[12px]">
                       <LiaLuggageCartSolid className='text-[#31603D]' />
                       <div className="text-[#31603D]">Delivered</div>
                     </div>
                   )}
                   {selectedOrderId?.status === "3" && (
                     <div className="flex items-center gap-x-[5px] text-[12px]">
                       <MdOutlineCancel className='text-[#D23D23]' />
                       <div className="text-[#D23D23]">Cancelled</div>
                     </div>
                   )}
       
                   <button className='text-[#31603D] text-sm md:hidden mt-3' onClick={copy}>
                     Call Customer Service
                   </button>
                 </div>
       
                 <div className='flex items-center gap-x-2'>
                   <button className="bg-[#31603D] text-sm text-white px-3 py-2 hidden md:flex rounded-full" onClick={copy}>
                     Call Customer Service
                   </button>
                   <button onClick={handleClose}>
                     <AiOutlineClose className='text-[#31603D] text-[25px]' />
                   </button>
                 </div>
               </div>
             </div>
             {/* Bar End */}
       
         <div className='flex flex-col justify-between gap-y -8'>
             {/* Scrollable Content */}
             <div>
             <div className='overflow-y-auto p-4 bg-[#F9F9F9] flex-1'>
               {selectedItems?.map((item, i) => (
                 <div key={i} className='flex flex-row gap-x-[20px] items-center mb-4 justify-between w-[95%]'>
                   <img src={item.image} alt={item.product_name} className="w-20 h-20 object-contain bg-white px-1" />
                   <div className='flex flex-col gap-y-2'>
                     <div className='font-bold font-saeada w-[120px] lg:w-[200px] text-md lg:text-xl'>
                       {item.product_name}
                     </div>
                     <div className='font-sans text-sm lg:text-md'>{item.subtitle}</div>
                   </div>
                   <div className='text-sm lg:text-lg w-[100px]'>₦{item.amount * item.quantity}</div>
                 </div>
               ))}
               </div>
       
       
             <div className='overflow-y-auto p-4 bg-[#F9F9F9] flex-1'>
               <div className='font-sans text-sm flex justify-center mt-10'>
                 Sub-Total (before taxes and service fee)
               </div>
               <hr className='mt-4' />
               <div className='flex flex-row justify-between items-center mt-4 mb-4'>
                 <div className='text-md'>Sub-Total</div>
                 <div>₦{selectedOrderId?.product_amount}</div>
               </div>
               <hr className='mb-4' />
               </div>
        </div>
       
             </div>
       
           </div>
         </div>
       </Modal>




        </div>
      </div>
      <div>
        {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}


        {/* <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer> */}
      </div>
    </nav>

    <div>  {updateNavbar ? "" : ""}
      <div className={`fixed top-0 right-0 w-[100%] md:w-[55%] lg:w-[400px] h-full bg-white shadow-lg transition-transform transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} z-50 flex flex-col`}>

        <div className="flex justify-between items-center p-4 bg-[white] h-auto w-full">
        {state.token && <div className="text-[20px] ml-[20px text-[#31603D] font-semibold">Cart({products.length || 0})</div>}
        {!state.token && <div className="text-[20px] ml-[20px text-[#31603D] font-semibold">Cart({cartOne.length || 0})</div>}
          <button onClick={() => setIsCartOpen(false)} className="text-gray-600 hover:text-red-500">
            <AiOutlineClose size={24} className="text-[#31603D]"/>
          </button>
        </div>

        {isLoading && <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
          size="70"
          speed="1.3"
          color="#4ade80"
        ></l-trio>    </div>}

        
      {state.token &&  <div className="flex-1 overflow-y-auto p-4 bg-[#F9F9F9]">
          
        {Array.isArray(products) && products.length > 0 ? (
            <div className="pt-[20px] flex flex-col items-center justify-center">
          {products.map((product) => (<>
                  <div className="bg-[] border-b pb-[20px]" key={product.product_id}>

                    <div className="bg-[] pt-[20px">
                      {/* <div className="font-bold ml-[10px]">Produce {product.category_name}</div> */}
                      <div className="flex flex-row gap-x-[9px]">
                        <div><img src={product.image} className="size-[90px w-24 h-20" /></div>
                        <div className="flex flex-col gap-[10px]">
                          <div className='font-saeada font-semibold'>{product.name} - {product.weight}</div>
                          <div className="text-[grey] text-[15px]">{product.subtitle}</div>
                          <div className="flex items-center gap-[15px]">
                            <div onClick={() => deleteProduct(product)} className="cursor-pointer bg-[#31603D] rounded-[50%] p-[8px]"><GoTrash className="size-[ text-[white]" /></div>
                            <div className="flex gap-x-[22px] items-center border border-[#31603D] rounded-[20px] px-[10px]">
                              <div onClick={() => handleDecrease(product.product_id)} className="text"><FaMinus className="size-[12px] cursor-pointer" /></div>
                              <div className="text-[18px]">{product.quantity}</div>
                              <div onClick={() => handleIncrease(product.product_id)} className="text"><FaPlus className="size-[12px] cursor-pointer" /></div>
                            </div>
                            {/* <div className="font-semibold ml-[25px] text-[15px] whitespace-nowrap">₦ {formatNumber(Number(product.price * product.quantity))}</div> */}
                            <div className="font-semibold ml-[25px] text-[15px] whitespace-nowrap">₦ {formatNumber(Number(product.price * product.quantity))}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <hr className="mt-[10px] mx-[2%]"></hr>
                </>
                

                ))}
         
            </div>
          ) : (<>
           {!isLoading && <div className="flex flex-col gap-y-[10px] mt-[50%] items-center">
            <div className="flex justify-center bg-[white] p-6 rounded-full"><GrBasket className="size-[50px] bg-[red" />
            </div>
            <div>Your personal cart is empty</div>
            <div onClick={toggleDrawer(false)} className="underline font-semibold text-[#31603D]"><Link to="/">Shop Now</Link></div>
          </div>}
          </>)}

        </div>}



        {!state.token &&  <div className="flex-1 overflow-y-auto p-4 bg-[#F9F9F9]">
          
          {Array.isArray(cartOne) && cartOne.length > 0 ? (
              <div className="pt-[20px] flex flex-col items-center justify-center">
            {cartOne.map((product) => (<>
                    <div className="bg-[] border-b pb-[20px]" key={product.product_id}>
  
                      <div className="bg-[] pt-[20px">
                        {/* <div className="font-bold ml-[10px]">Produce</div> */}
                        <div className="flex flex-row gap-x-[9px]">
                          <div><img src={product.image} className="size-[100px w-24 h-20 object-cove"/></div>
                          <div className="flex flex-col gap-[10px]">
                            <div className='font-saeada font-semibold'>{product.name} - {product.weight}</div>
                            <div className="text-[grey] text-[15px]">{product.subtitle}</div>
                            <div className="flex items-center gap-[15px]">
                              <div onClick={() => removeFromCart(product.id)} className="cursor-pointer bg-[#31603D] rounded-[50%] p-[8px]"><GoTrash className="size-[ text-[white]" /></div>
                              <div className="flex gap-x-[22px] items-center border border-[#31603D] rounded-[20px] px-[10px]">
                                <div onClick={() =>  decreaseQuantity(product.id)} className="text"><FaMinus className="size-[12px] cursor-pointer" /></div>
                                <div className="text-[18px]">{product.quantity}</div>
                                <div onClick={() => increaseQuantity(product.id)} className="text"><FaPlus className="size-[12px] cursor-pointer" /></div>
                              </div>
                              <div className="font-semibold ml-[25px] text-[15px] whitespace-nowrap">₦ {formatNumber(Number(product.price * product.quantity))}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    
                    <hr className="mt-[10px] mx-[2%]"></hr>
                  </>
                  
  
                  ))}
           
              </div>
            ) : (<>
             {!isLoading && <div className="flex flex-col gap-y-[10px] mt-[50%] items-center">
              <div className="flex justify-center bg-[white] p-6 rounded-full"><GrBasket className="size-[50px] bg-[red" />
              </div>
              <div>Your personal cart is empty</div>
              <div onClick={toggleDrawer(false)} className="underline font-semibold text-[#31603D]"><Link to="/">Shop Now</Link></div>
            </div>}
            </>)}
  
          </div>}

        {/* Cart Footer */}

{state.token &&<div>
       {products.length > 0 && <div className="p- bg-white h-[2 pb-[90px] pt-[20px] flex flex-col justify-center items-center gap-y-4">
        <div className="w-[500px"><button onClick={goToCheckout} className="flex justify-center items-center text-[white] bg-[#31603D] py-[8px] px-[100px] border border-[#31603D] rounded-[20px] whitespace-nowrap">Proceed to Checkout</button></div>
        <div className="text-[13px] flex items-center gap-x-[5px] justify-center">Sub-Total(before taxes and service fee) <span className="text-[16px] font-bold">₦ {formatNumber(subtotal)}</span></div>
        </div>}
        </div>}

{!state.token && <div>
        {cartOne.length > 0 && <div className="p- bg-white h-[25% pb-[90px] pt-[20px] flex flex-col justify-center items-center gap-y-4">
        <div className="w-[500px"><button onClick={goToCheckout} className="flex justify-center items-center text-[white] bg-[#31603D] py-[8px] px-[100px] border border-[#31603D] rounded-[20px] whitespace-nowrap">Proceed to Checkout</button></div>
        <div className="text-[13px] flex items-center gap-x-[5px] justify-center">Sub-Total(before taxes and service fee) <span className="text-[16px] font-bold">₦ {formatNumber(subtotal2)}</span></div>
        </div>}
        </div>}
      </div>

      {/* Overlay when cart is open */}
      {/* {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
      )} */}
      
    </div>

   {/* Orders */}

     <div>  {updateNavbar ? "" : ""}
      <div className={`fixed top-0 right-0 w-[100%] md:w-[55%] lg:w-[400px] h-full bg-white shadow-lg transition-transform transform ${isOrdersOpen ? "translate-x-0" : "translate-x-full"} z-50 flex flex-col`}>

        <div className="flex justify-between items-center p-4 bg-[white] h-auto w-full">
      
        <div className="text-[20px] ml-[20px text-[#31603D] font-semibold">Orders({orders.length || 0})</div>
          <button onClick={() => setIsOrdersOpen(false)} className="text-gray-600 hover:text-red-500">
            <AiOutlineClose size={24} className="text-[#31603D]"/>
          </button>
        </div>

        {isLoading && <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
          size="70"
          speed="1.3"
          color="#4ade80"
        ></l-trio>    </div>}

        
      <div className="flex- overflow-y-auto p-4 bg-[#F9F9F9]">
          
     





        <div className="flex flex-col gap-y-[30px] items-center lg:items-star">
                {/* Group orders by date */}
                {Object.entries(
                  orders.reduce((grouped, order) => {
                    const formattedDate = new Intl.DateTimeFormat('en-GB').format(new Date(order.created_at));
                    if (!grouped[formattedDate]) {
                      grouped[formattedDate] = [];
                    }
                    grouped[formattedDate].push(order);
                    return grouped;
                  }, {})
                ).map(([date, ordersForDate]) => (
                  <div className="flex flex-col gap-y-[30px]" key={date}>
                    {/* Display the date */}
                    <div className="font-bold px- 4 lg:px-14">{date}</div>
                    {ordersForDate
                    .filter(order => order.status !== "2")
                    .map((order) => (<>
                      <div onClick={() => handleOpen(order)} className="flex cursor-pointer flex-row lg: gap-x-[10px] justify-between lg: items-center lg:px-14" key={order.order_id}>
                        <div>
                          <PiNotepadBold className="size-[30px]" />
                        </div>
                        <div className="flex flex-row gap-x-[px] lg:gap-x-[50px]">
                          <div className="flex flex-col gap-y-[20px] lg:flex-row lg:gap-x-[50px]">
                            <div className="flex flex-col bg-[]">

                              <div className="font-bold text-[17px] lg:w-[180px] lg:text-[20px] whitespace-nowrap font-saeada">
                                Order ID #{order.order_id}
                              </div>
      
                              {order.payment_status === 1 && (
                                <>
                           
                                <div>
                                 {order.status === "0" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                                                            <div><TfiPackage className='size-[15px] text-[#31603D]'/></div>
                                                            <div className="whitespace-nowrap text-[15px] text-[#31603D]">Awaiting Pick-up</div>
                                                          </div>)}
                                  
                                                          {order.status === "1" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                                                            <div><TbTruckDelivery className='size-[15px] text-[#31603D]'/></div>
                                                            <div className="whitespace-nowrap text-[15px] text-[#31603D]">In Transit</div>
                                                          </div>)}
                                  
                                                          {order.status === "2" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                                                            <div><LiaLuggageCartSolid className='size-[15px] text-[#31603D]'/></div>
                                                            <div className="whitespace-nowrap text-[15px] text-[#31603D]">Delivered</div>
                                                          </div>)}
                                  
                                                          {order.status === "3" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                                                            <div><MdOutlineCancel className='size-[15px] text-[#D23D23]'/></div>
                                                            <div className="whitespace-nowrap text-[15px] text-[#D23D23]">Cancelled</div>
                                                          </div>)}
                                                          <div className='flex justify-between items-center'>
                                                          <div className="text-[12px] lg:text-[15px] mt-2 whitespace-nowrap">Tap to view details</div>                                                                                         
                                                          
                                                             </div>
                                                             </div>

                                                                <div className='whitespace-nowrap mt-2'> ₦ {formatNumber(Number(order.product_amount))}</div>
                               
                             </> )}
      
                         
      
                            </div>
                           
                          </div>
                          <div className="flex flex-col gap-y-[40px] lg:flex-row lg:gap-x-[50px]">
      
                          
                          
      
                          </div>
                        </div>
                      </div>
                      
                      <hr className="items-center lg:mx-12"></hr>
                      </>
                    ))}
                    
                  </div>
                ))}
              </div>







        </div>



       

      
      </div>

      {/* Overlay when cart is open */}
      {/* {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
      )} */}
      
    </div>

  </>
  )
}



export default Navbar


