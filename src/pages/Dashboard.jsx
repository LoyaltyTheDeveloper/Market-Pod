import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar.jsx'
import { BsCardText } from "react-icons/bs";
import { PiNotepadBold } from "react-icons/pi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import Footer from '../Components/Footer.jsx';
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { AuthContext, setProfileData } from '../context/Context.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiPhone } from "react-icons/fi";
import {Link} from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { LiaKeySolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiPackage } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Modal, Box, Typography, Button, Card, CardContent } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

function UserDetails({order}) {
  const location = useLocation();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state , dispatch} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  //  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };

    checkScreenSize(); 
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);



const handleCheck = (orders) => {
  if(orders?.payment_status === 1){
    handleOpen(orders);
}
else if (orders?.payment_status === 0){
 makePayment(orders.checkout_url);
}
}



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
  
  const handleOpen = (orders) => {
    setSelectedItems(orders.items); // Assuming orders.items is an array of items
    setSelectedOrderId(orders); // Assuming items is an array and you want the first item's order_id
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItems([]);
  };



  // const queryParams = new URLSearchParams(location.search);
  // const showOrders = queryParams.get("showOrders") === "true";

  // useEffect(() => {
  //   if (location.state?.showOrders) {
  //     setActiveButton('button2');
  //   }
  // }, [location]);

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const showOrders = queryParams.get("showOrders") === "true";

  if (showOrders) {
    setActiveButton("button2");
  }
}, [location.search]);

  useEffect(()=> {
          if (!state.token){
            navigate("/");
          }
        }, []);

  const [formOne, setFormOne] = useState({
    first_name: "",
    last_name: "",
  });

  const isFormOne = formOne.first_name.trim() !== "" && formOne.last_name.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormOne((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const submitFormOne = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('https://apis.emarketpod.com/user/updateProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.token,
      },
      body: JSON.stringify(formOne),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          dispatch(setProfileData({first_name:formOne.first_name,last_name:formOne.last_name}));
          toast.success(data.message);
          setIsLoading(false);

        } else {
          toast.error(data.message);
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });

  };


  // Form two

  const [formTwo, setFormTwo] = useState({
    phone_number: "",
    phone_number2: "",
  });

  const isFormTwo = formTwo.phone_number.trim() !== "" && formTwo.phone_number2.trim() !== "";

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormTwo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitFormTwo = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('https://apis.emarketpod.com/user/updateProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.token,
      },
      body: JSON.stringify(formTwo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          dispatch(setProfileData({phone_number:formTwo.phone_number,phone_number2:formTwo.phone_number2}));
          toast.success(data.message);
          setIsLoading(false);

        } else {
          toast.error(data.message);
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };



  //Form three

   const [formThree, setFormThree] = useState({
    selectedLocation: "",
    delivery_address: "",
  });

  const isFormThree = formThree.selectedLocation.trim() !== "" && formThree.delivery_address.trim() !== "";

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setFormThree((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitFormThree = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('https://apis.emarketpod.com/user/updateProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.token,
      },
      body: JSON.stringify(formThree),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
          setIsLoading(false);

        } else {
          toast.error(data.message);
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const [formFour, setFormFour] = useState({
    current_psw: "",
    new_psw: "",
  });

  const isFormFour = formFour.current_psw.trim() !== "" && formFour.new_psw.trim() !== "";

  const handleChange4 = (e) => {
    const { name, value } = e.target;
    setFormFour((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const submitFormFour = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('https://apis.emarketpod.com/user/updateProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.token,
      },
      body: JSON.stringify(formFour),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
          setIsLoading(false);

        } else {
          toast.error(data.message);
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });

  };



  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
    toast.success("Logged out");
    dispatch({ type: 'LOG_OUT', payload: { token: null } })
  }




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
}, [])


useEffect(() => {
          
      fetch('https://apis.emarketpod.com/site/getLocations', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
        .then((data) => {
          setLocations(data.locations);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    const formatNumber = (num) => {
      return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const makePayment = (pay) => {
      console.log(pay)
      if(pay){
        window.location.href = pay;
      }
    }

  const [activeButton, setActiveButton] = useState('button1');
  const displayName = `${state.user.last_name ? (state.user.last_name == '' ? 'User' : state.user.last_name) : "User"} ${state.user.first_name ?? ''}`;

  return (<>
    <Navbar />
    {isLoading && <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
      size="70"
      speed="1.3"
      color="#4ade80"
    ></l-trio>    </div>}

     {/* <Modal open={open} onClose={handleClose}>

    
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] lg:w-[450px] bg-white p-4 max-h-[80vh] overflow-y-auto rounded-md'
        >
            <div className='flex justify-between items-center mb-4'>
             <div className='flex flex-col'>
            <div className='font-bold font-saeada md:text-[20px]'>Order ID #{selectedOrderId?.order_id}</div>
           
           {selectedOrderId?.status === "0" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                            <div><TfiPackage className='size-[13px] md:size-[15px] lg:size-[15px] text-[#31603D]'/></div>
                            <div className="whitespace-nowrap text-[13px] md:size-[15px] lg:size-[15px] text-[#31603D]">Awaiting Pick-up</div>
                          </div>)}
  
                          {selectedOrderId?.status === "1" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                            <div><TbTruckDelivery className='size-[13px] md:size-[15px] lg:size-[15px] text-[#31603D]'/></div>
                            <div className="whitespace-nowrap text-[13px] md:size-[15px] lg:size-[15px] text-[#31603D]">In Transit</div>
                          </div>)}
  
                          {selectedOrderId?.status === "2" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                            <div><LiaLuggageCartSolid className='size-[13px] md:size-[15px] lg:size-[15px] text-[#31603D]'/></div>
                            <div className="whitespace-nowrap text-[13px] md:size-[15px] lg:size-[15px] text-[#31603D]">Delivered</div>
                          </div>)}
  
                          {selectedOrderId?.status === "3" && (<div className="flex items-center gap-x-[5px] text-[12px]">
                            <div><MdOutlineCancel className='size-[13px] md:size-[15px] lg:size-[15px] text-[#D23D23]'/></div>
                            <div className="whitespace-nowrap text-[13px] md:size-[15px] lg:size-[15px] text-[#D23D23]">Cancelled</div>
                          </div>)}

                          <button className='text-[#31603D] text-sm md:hidden lg:hidden mt-3'>Call Customer Service</button>
                          </div>

                          <div className='flex items-center gap-x-2'>
                          <button className="mt- bg-[#31603D] text-sm text-white px-3 py-2 hidden md:flex lg:flex rounded-full">
            Call Customer Service
          </button>
          <button onClick={handleClose}><AiOutlineClose className='text-[#31603D] text-[25px]'/></button>
          </div>
          </div>
        

         <div className='bg-[#F9F9F9]'>
          {selectedItems?.map((item, i) => (<>
            <div className=''>
              <div className=''>

                <div className='flex flex-row gap-x-[20px] items-center mb-4 justify-between w-[95%]' key={i}>
                  <img src = {item.image} alt={item.product_name} className="w-20 h-20 lg:w-20 lg:h-20 object-contain bg-[white] px-1" />
                  <div className='flex flex-col gap-y-2'>
                  <div className='font-bold font-saeada w-[120px] lg:w-[200px] text-md lg:text-xl'>{item.product_name}</div>
                   <div className='font-sans text-sm lg:text-md'>{item.description}</div>
                   </div>
                    <div className='text-sm lg:text-lg w-[100px]'>₦{item.amount}</div>
                </div>

              </div>
            </div>
           
         </> ))}
          <div className='font-sans text-sm flex justify-center mt-10'>Sub-Total (before taxes and service fee)</div>
          <hr className='mt-4'></hr>

          <div className='flex flex-row justify-between items-center mt-4 mb-4'>
          <div className='text-md'>Sub-Total</div>
          <div>NGN5000</div>
          </div>
          <hr className='mb-4'></hr>
          </div>
          
         
          
        </div>
        
      </Modal> */}

      <Modal open={open} onClose={handleClose}>
    
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

      


    <div className="pt-[80px] min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col pt-[50px] pb-[30px bg-[#F9F9F9] lg:w-[60%]">

          <div className="flex flex-col gap-y-[20px] pb-[30px]">
            <div className="px-4">
              <h1 className="font-bold text-[24px] font-saeada">Hello, {displayName}</h1>
              <h1>{state.email}</h1>
            </div>
            <div>
              <button
                className={`px-2 py-3 lg:px-8 rounded-r-[30px] ${activeButton === 'button1' ? 'bg-[#31603D] text-white' : ''
                  }`}
                onClick={() => setActiveButton('button1')}
              >
                <div className="flex items-center gap-x-[10px]">
                  <div><BsCardText className="size-[25px]" /></div>
                  <div>
                    Account Information
                  </div>
                </div>

              </button>
            </div>

            <div>
              <button
                className={`px-2 py-3 lg:px-8 rounded-r-[30px] ${activeButton === 'button2' ? 'bg-[#31603D] text-white' : ''
                  }`}
                onClick={() => setActiveButton('button2')}
              >
                <div className="flex items-center gap-x-[10px]">
                  <div><PiNotepadBold className="size-[25px]" /></div>
                  <div>
                    Order History
                  </div>
                </div>

              </button>
            </div>



            <div onClick={Logout} className="flex items-center gap-x-[10px] cursor-pointer px-2 lg:px-8">
              <div><RiLogoutCircleRLine className="size-[25px] text-[#D23D23]" /></div>
              <div>Log Out</div>
            </div>



          </div>


        </div>







        <div className="pt-[50px] bg-[] w-full lg min-h-screen overflow-y-auto max-h-72 no-scrollbar lg:pr-[50%]">


          {activeButton === 'button1' && <div className="lg:px-14 flex flex-col items-center lg:items-start">




            <div className="flex flex-col gap-y-[60px] mb-[100px]">

              <form
                className="flex flex-col gap-y-[25px]">
                <h1 className="font-bold text-[24px] font">Name</h1>
                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><TbUserEdit className="size-[20px]" /></div>

                  <div>
                    <input
                     type="text"
                     id="field1"
                     name="first_name"
                     value={formOne.first_name}
                     onChange={handleChange}
                     required
                    className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="First Name">
                </input>
                      </div>

                </div>


                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><TbUserEdit className="size-[20px]" /></div>
                  <div>

                    <input
                     type="text"
                     id="field2"
                     name="last_name"
                     value={formOne.last_name}
                     onChange={handleChange}
                     required
                    className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Last Name">
                </input>

                      </div>
                    </div>

                <button
                  onClick={submitFormOne}
                  disabled={!isFormOne}
                  className={`w-full py-4 px-4 rounded-[100px] text-white font-bold ${isFormOne ? "bg-[#31603D]" : "bg-[#31603D] opacity-60 cursor-not-allowed"
                    }`}
                >
                  Update Changes
                </button>
              </form>

              <form
                className="flex flex-col gap-y-[25px]">
                <h1 className="font-bold text-[24px]">Phone</h1>
                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><FiPhone className="size-[20px]" /></div>

                  <div>
                    <input
                     type="number"
                     min="0"
                     id="field1"
                     name="phone_number"
                     value={formTwo.phone_number}
                     onChange={handleChange2}
                     required
                    className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Phone">
                </input>
                      </div>

                </div>


                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><FiPhone className="size-[20px]" /></div>
                  <div>

                    <input
                     type="number"
                     id="field2"
                     name="phone_number2"
                     value={formTwo.phone_number2}
                     onChange={handleChange2}
                     required
                    className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Alternate Phone">
                </input>
          
                      </div>
                    </div>

                <button
                  onClick={submitFormTwo}
                  disabled={!isFormTwo}
                  className={`w-full py-4 px-4 rounded-[100px] text-white font-bold ${isFormTwo ? "bg-[#31603D]" : "bg-[#31603D] opacity-60 cursor-not-allowed"
                    }`}
                >
                  Update Changes
                </button>
              </form>

              <form
                className="flex flex-col gap-y-[25px]">
                <h1 className="font-bold text-[24px]">Delivery Address</h1>
                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><GrLocation className="size-[20px]" /></div>

                  <div>
                  <select
          name="selectedLocation"
          className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none"
          id="location"
          value={formThree.selectedLocation}
          onChange={handleChange3}
          required
        >
          <option className ="text-[grey]" value="">General Area</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
                      </div>

                </div>


                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><GrLocation className="size-[20px]" /></div>
                  <div>

                    <input
                     type="text"
                     id="field2"
                     name="delivery_address"
                     value={formThree.delivery_address}
                     onChange={handleChange3}
                     required
                    className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" 
                    placeholder="Delivery Address">
                </input>
          
                      </div>
                    </div>

                    <div className="mt-[px] px-[10px] py-[10px] bg-[#F9F9F9] w-[350px] rounded-[5px]">
            <p className="font-bold">Tip</p>
            <p>For the best experience, make use of the nearest 
            landmark, school, church, etc in your description.</p>
          </div>

                <button
                  onClick={submitFormThree}
                  disabled={!isFormThree}
                  className={`w-full py-4 px-4 rounded-[100px] text-white font-bold ${isFormThree ? "bg-[#31603D]" : "bg-[#31603D] opacity-60 cursor-not-allowed"
                    }`}
                >
                  Update Changes
                </button>
              </form>


              <form
                className="flex flex-col gap-y-[25px]">
                <h1 className="font-bold text-[24px]">Change Password</h1>
                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><LiaKeySolid className="size-[20px]" /></div>

                  <div>
                    <input
                     type="text"
                     id="field1"
                     name="current_psw"
                     value={formFour.current_psw}
                     onChange={handleChange4}
                     required
                    className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Enter Current Password">
                </input>
                      </div>

                </div>


                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><LiaKeySolid className="size-[20px]" /></div>
                  <div>

                    <input
                     type="text"
                     id="field2"
                     name="new_psw"
                     value={formFour.new_psw}
                     onChange={handleChange4}
                     required
                    className="border border-[grey]-300 py-4 pl-[50px] rounded-[100px] w-[350px] focus:outline-none" placeholder="Enter New Password">
                </input>

                      </div>
                    </div>

                <button
                  onClick={submitFormFour}
                  disabled={!isFormFour}
                  className={`w-full py-4 px-4 rounded-[100px] text-white font-bold ${isFormFour ? "bg-[#31603D]" : "bg-[#31603D] opacity-60 cursor-not-allowed"
                    }`}
                >
                  Update Changes
                </button>
              </form>


            </div>
          </div>}



          {activeButton === 'button2' && <div className="flex flex-col">

            <div className="">
             


              {/* <div className="flex flex-row gap-[10px] lg:gap-[20px] lg:items-center">
                <div><PiNotepadBold className="size-[27px]" /></div>

                <div className="flex flex-row gap-x-[px] lg:gap-x-[50px]">
                  <div className="flex flex-col gap-y-[20px] lg:flex-row lg:gap-x-[50px]">
                    <div className="flex flex-col">
                      <div className="font-bold text-[17px] lg:text-[20px] whitespace-nowrap">Order ID #0988</div>
                      <div className="flex items-center gap-x-[5px] text-[12px]">
                        <div>Icon</div>
                        <div className="whitespace-nowrap">Awaiting Pick-up</div>
                      </div>
                    </div>

                    <div className="w-[250px] truncate text-[15px] lg:text-[17px]">No 3, Tanke bubu, walai street, ademola close, ilorin, kwara</div>
                  </div>

                  <div className="flex flex-col gap-y-[40px] lg:flex-row lg:gap-x-[50px]">
                    <div className="font-bold text-[17px] lg:text-[20px] whitespace-nowrap flex justify-end">NGN 35246</div>
                    <div className="whitespace-nowrap flex justify-end text-[15px]">Tap to view</div>
                  </div>
                </div>
              </div> */}

            {/* {!isLoading &&<div className="">
            
                        {Array.isArray(orders) && orders.length > 0 ? (<>
                           <div className="font-bold text-[30px] pb-[30px] px-4 lg:px-14">History</div>
                          <div className="flex flex-col gap-y-[30px] items-center lg:items-start">
                            {orders.map((order) => (<>
                              <div className="" key={order.order_id}>
                                <div className="font-bold pb-[30px] lg:px-14">{new Intl.DateTimeFormat('en-GB').format(new Date(order.created_at))}</div>
                              <div className="flex flex-row gap-[10px] lg:gap-[20px] lg:items-center lg:px-14">
                <div><PiNotepadBold className="size-[27px]" /></div>

                <div className="flex flex-row gap-x-[px] lg:gap-x-[50px]">
                  <div className="flex flex-col gap-y-[20px] lg:flex-row lg:gap-x-[50px]">
                    <div className="flex flex-col">
                      <div className="font-bold text-[17px] lg:text-[20px] whitespace-nowrap">Order ID #0988</div>
                      <div className="flex items-center gap-x-[5px] text-[12px]">
                        <div>Icon</div>
                        <div className="whitespace-nowrap">Awaiting Pick-up</div>
                      </div>
                    </div>

                    <div className="w-[250px] truncate text-[15px] lg:text-[17px]">{order.location_name}, {order.address}, {order.city}, {order.state}</div>
                  </div>

                  <div className="flex flex-col gap-y-[40px] lg:flex-row lg:gap-x-[50px]">
                    <div className="font-bold text-[17px] lg:text-[20px] whitespace-nowrap flex justify-end">NGN {order.product_amount}</div>
                    <div className="whitespace-nowrap flex justify-end text-[15px]">Tap to view</div>
                  </div>
                  
                </div>
                
              </div>
              <hr className="mt-[20px] items-center mx-4 lg:mx-14"></hr>




                                </div>
                            </>
            
                            ))}
                          </div>
            
                        </>) : (<>
            
                          {!isLoading && <div className="flex flex-col mt-[50%] lg:whitespace-nowrap lg:mt-[100%] lg:pl-[200%] items-center justify-center">
                            <div>You don't have past orders</div>
                            <div className="underline font-semibold text-[#31603D]"><Link to="/">Shop Now</Link></div>
                          </div>}
            
                        </>)}
                      </div>} */}










                      {!isLoading && (
 
 
 <div className="lg:mx-[-30px">
   <div className="font-bold text-[30px] pb-[30px] px-4 lg:px-14 font-saeada">History</div>
    {Array.isArray(orders) && orders.length > 0 ? (
      <>
        {/* <div className="font-bold text-[30px] pb-[30px] px-4 lg:px-14">History</div> */}
        <div className="flex flex-col gap-y-[30px] items-center lg:items-start">
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
              <div className="font-bold px-4 lg:px-14">{date}</div>
              {ordersForDate.map((order) => (<>
                <div onClick={isSmallScreen ? () => handleCheck(order) : undefined} className="flex cursor-pointer md:cursor-default lg:cursor-default flex-row lg:gap-x-[20px] justify-between lg:items-center lg:px-14" key={order.order_id}>
                  <div>
                    <PiNotepadBold className="size-[27px]" />
                  </div>
                  <div className="flex flex-row gap-x-[px] lg:gap-x-[50px]">
                    <div className="flex flex-col gap-y-[20px] lg:flex-row lg:gap-x-[50px]">
                      <div className="flex flex-col bg-[]">
                        <div className="font-bold text-[17px] lg:w-[180px] lg:text-[20px] whitespace-nowrap font-saeada">
                          Order ID #{order.order_id}
                        </div>

                        {order.payment_status === 1 && (
                          <>
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
                       </> )}

                        {order.payment_status === 0 && (<div className="flex items-center gap-x-[5px] text-[12px]">
                          <div><AiOutlineExclamationCircle className='size-[15px] text-[#EED202]'/></div>
                          <div className="whitespace-nowrap text-[15px] text-[#EED202]">Pending Payment</div>
                        </div>)}

                      </div>
                      <div className="lg:w-[300px] w-[250px] truncate text-[15px] lg:text-[17px]">
                        {order.location_name}, {order.address}, {order.city}, {order.state}
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-[40px] lg:flex-row lg:gap-x-[50px]">

                      <div className="font-bold text-[14px] lg:text-[20px] whitespace-nowrap flex justify-en w-[50px] lg:w-[100px] lg:px-">
                      ₦ {formatNumber(Number(order.product_amount))}
                      </div>

                      {order.payment_status === 1 && ( <>
                        <div className="lg:hidden whitespace-nowrap flex justify-end text-[12px] lg:text-[15px] text-[#31603D] cursor-pointer">Tap to view</div>
                      <div onClick={() => handleOpen(order)} className="hidden lg:flex"><button className="bg-[#31603D] border border-[#31603D] text-white px-8 rounded-[50px]">View</button></div>
                      </>)}

                      {order.payment_status === 0 && ( <>
                        <div 
                          className="lg:hidden whitespace-nowrap flex justify-end text-[12px] lg:text-[15px] text-[#31603D] cursor-pointer">Tap to pay</div>
                      <div className="hidden lg:flex"><button onClick={() => makePayment(order.checkout_url)} className="bg-[white] border border-[#31603D] border-[2px] text-[#31603D] px-8 rounded-[50px]">Pay</button></div>
                      </>)}

                    </div>
                  </div>
                </div>
                
                <hr className="items-center lg:mx-12"></hr>
                </>
              ))}
              
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
      {error && (<>
      <div className='flex flex-col mt-[50%] lg:whitespace-nowrap lg:mt-[100%] lg:pl-[160%] items-center justify-center'>
        {error}
      </div>
      </>)}

      {!error &&(<>
        {!isLoading && (
          <div className="flex flex-col mt-[50%] lg:whitespace-nowrap lg:mt-[100%] lg:pl-[160%] items-center justify-center">
            <div>You don't have past orders</div>
            <div className="underline font-semibold text-[#31603D]">
              <Link to="/">Shop Now</Link>
            </div>
          </div>
        )}
      </>)}
        
      </>
    )}
  </div>
)}

            </div>
          </div>}
        </div>
      </div>
    </div>
    <Footer />
  </>)
}

export default UserDetails
