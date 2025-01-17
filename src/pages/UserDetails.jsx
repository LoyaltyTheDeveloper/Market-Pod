import React, { useState, useContext } from 'react'
import Navbar from '../Components/Navbar'
import { BsCardText } from "react-icons/bs";
import { PiNotepadBold } from "react-icons/pi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import Footer from '../Components/Footer';
import { toast } from 'react-hot-toast';
import { trio } from 'ldrs'
import { AuthContext, setProfileData } from '../context/Context.jsx';
import { useNavigate } from 'react-router-dom';
import { FiPhone } from "react-icons/fi";


function UserDetails() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state , dispatch} = useContext(AuthContext);
  const [formOne, setFormOne] = useState({
    first_name:  state.user?.first_name ?? "",
    last_name: state.user?.last_name ?? "",
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
    phone_number: state.user?.phone_number ??  "",
    phone_number2:state.user?.phone_number2 ??  "",
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


  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
    toast.success("Logged out");
    dispatch({ type: 'LOG_OUT', payload: { token: null } })
  }

  const [activeButton, setActiveButton] = useState('button1');
  return (<>
    <Navbar />
    {isLoading && <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <l-trio
      size="70"
      speed="1.3"
      color="#4ade80"
    ></l-trio>    </div>}
    <div className="pt-[80px] min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col pt-[50px] pb-[30px bg-[#F9F9F9] w-full">

          <div className="flex flex-col gap-y-[20px] pb-[30px]">
            <div className="px-4">
              <h1 className="font-bold text-[24px]">Hello, user...</h1>
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




            <div className="flex flex-col gap-y-[20px]">

              <form
                className="flex flex-col gap-y-[25px]">
                <h1 className="font-bold text-[24px]">Name</h1>
                <div className="relative flex flex-row items-center">
                  <div className="absolute ml-[20px]"><TbUserEdit className="size-[20px]" /></div>

                  <div>
                    <input
                      type="text"
                      id="first_name"
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
                      id="last_name"
                      name="last_name"
                      value={formOne.last_name}
                      onChange={handleChange}
                      defaultValue={state.user?.last_name}
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
                      id="phone_number"
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
                      id="phone_number2"
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


            </div>
          </div>}



          {activeButton === 'button2' && <div className="flex flex-col items-center lg:items-start lg:px-14">

            <div className="">
              <div className="font-bold text-[30px] pb-[30px]">History</div>


              <div className="flex flex-row gap-[10px] lg:gap-[20px] lg:items-center">
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
              </div>

            </div>



          </div>}


        </div>







      </div>
    </div>
    <Footer />
  </>)
}

export default UserDetails
