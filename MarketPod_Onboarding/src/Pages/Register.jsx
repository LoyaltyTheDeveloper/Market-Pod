import React from 'react';
import register1 from '../assets/register1.svg';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from 'react';
import vendor from '../assets/vendor.svg';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import 'ldrs/ring';
import { ring } from 'ldrs';
import { toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Register() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  ring.register()
  const navigate = useNavigate();
  const items = ["Produce", "Meat & Seafood", "Diary & Eggs", "Herbs & Spice", "Oil & Vinegar", "Beverage & Packed Foods", "Plasticware & Bags", "Laundry", "Health & Beauty", "Baby & Kids", "Stationery"];

  const [products, setSelectedItems] = useState([]);
  const [bankName, setSelectedBank] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [years, setYears] = useState();
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phonePrimary, setPhonePrimary] = useState('');
  const [phoneAlternate, setPhoneAlternate] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isPending, setIsPending] = useState(false);

const theme = useTheme();
const [activeDays, setDays] = React.useState([]);

  const toggleSelection = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item) 
        : [...prevSelected, item] 
    );
  };

  const handleSubmit = (e) => {
  
    setIsPending(true);
    e.preventDefault();
    if (products.length === 0 || !bankName || businessName === '' || firstName === '' || lastName === '' || storeAddress === '' || state === '' || country === '' || years === null || idType === '' || idNumber === '' || phonePrimary === '' || phoneAlternate === '' || email === '' || whatsapp === '' || activeDays === '' || openingTime === '' || closingTime === '' || accountNumber === '' || accountName === '') {
      toast.error("Fill in all required fields");
      setIsPending(false);
      console.error;
      return;
    }
    const formData = {
      businessName,
      firstName,
      lastName,
      storeAddress,
      state,
      country,
      years,
      idType,
      idNumber,
      phonePrimary,
      phoneAlternate,
      email,
      whatsapp,
      activeDays,
      openingTime,
      closingTime,
      bankName,
      accountNumber,
      accountName,
      products
    };

    fetch('https://apis.emarketpod.com/site/onboard-vendor', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
          .then((data) => {
            if (data.status === true) {
              setIsPending(false);
              setOpen(true);
            } else {
             toast.error(data.message);
              setIsPending(false);
              return;
            }
          })
          .catch((error) => {
            toast.error('An error occurred. Please try again');
            console.log(error);
            setIsPending(false);
            });

  };
  const goHome = () => {
    navigate("/");
  }


  // The active days schedule

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thurday',
  'Friday',
  'Saturday',
  'Sunday'
];

function getStyles(name, activeDays, theme) {
  return {
    fontWeight: activeDays.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}



const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setDays(
    
    typeof value === 'string' ? value.split(',') : value,
  );
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

const banks = [
  
  { name: 'Access Bank' },
  { name: 'Citibank Nigeria' },
  { name: 'Ecobank Nigeria' },
  { name: 'Fidelity Bank' },
  { name: 'First Bank of Nigeria' },
  { name: 'First City Monument Bank (FCMB)' },
  { name: 'Globus Bank' },
  { name: 'Guaranty Trust Bank (GTBank)' },
  { name: 'Heritage Bank' },
  { name: 'Keystone Bank' },
  { name: 'Polaris Bank' },
  { name: 'Providus Bank' },
  { name: 'Stanbic IBTC Bank' },
  { name: 'Standard Chartered Bank' },
  { name: 'Sterling Bank' },
  { name: 'SunTrust Bank' },
  { name: 'Union Bank of Nigeria' },
  { name: 'United Bank for Africa (UBA)' },
  { name: 'Unity Bank' },
  { name: 'Wema Bank' },
  { name: 'Zenith Bank' },
  { name: 'AB Microfinance Bank' },
  { name: 'Accion Microfinance Bank' },
  { name: 'LAPO Microfinance Bank' },
  { name: 'Seedvest Microfinance Bank' },
  { name: 'FinaTrust Microfinance Bank' },
  { name: 'Infinity Microfinance Bank' },
  { name: 'Nirsal Microfinance Bank' },
  { name: 'Renmoney Microfinance Bank' },
  { name: 'Boctrust Microfinance Bank' },
  { name: 'Fina Microfinance Bank' },
  { name: 'Opay' },
  { name: 'PalmPay' },
  { name: 'Moniepoint' },
  { name: 'FirstMonie' },
  { name: 'Paga' },
  { name: 'Kuda Bank' },
  { name: 'Rubies Bank' },
  { name: 'ALAT by Wema' },
  { name: 'Eyowo' },
  { name: 'Carbon' },
  { name: 'Branch' },
  { name: 'FairMoney' },
  { name: 'VFD Microfinance Bank' },
  { name: 'Mintyn Bank' },
  { name: 'Sparkle' },
  { name: 'Paycom' },
  { name: 'Chipper Cash' }
];

const options = banks.map((option) => {
  const firstLetter = option.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...option,
  };
}
);

  return (<>
  <div className="min-h-screen flex flex-col">
    <div className="flex flex-col lg:flex-row md:flex-row">

      <div>
    <div><img src={register1} className="w-full object-cover md:hidden lg:hidden"/></div>
    {/* <div className="w-full max-w-md mx-auto h-[70%]"><img src={vendor} className="hidden w-full object-cover md:flex lg:flex h-full"/></div> */}
    </div>

    <div className="lg:px-[150px] lg:overflow-y-scroll">

    <div className="mt-[25px]">
        <button onClick={goHome} className="flex ml-[20px] lg:ml-[-100px] items-center border border-[#31603D] bg-[#31603D] text-[white] rounded-[20px] px-[20px] py-[2px]"><IoIosArrowRoundBack className="size-[30px]"/>Back</button>
    </div>

    <div className="mt-[35px] flex flex-col justify-center items-center">
        <h3 className="text-[#31603D] font-semibold font-sans">Let's get you started</h3>
        <h1 className="font-bold text-[25px] font-saeada">Register as a vendor</h1>
    </div>

<form>
    <div className="flex flex-col space-y-4 p-4 mb-[10px]">
      {/* First Field */}
      <div className="flex flex-col">
        <label className="font-saeada text-gray-500 font-bold text-[20px] mb-[20px]">
          Business Information
        </label>
        <input
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400 "
          placeholder="Business Name"
        />
      </div>

      {/* Second Row: Two Shorter Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {/* Field 1 */}
        <div className="flex-1">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="First Name"
          />
        </div>

        {/* Field 2 */}
        <div className="flex-1">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Last Name"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            id="storeAddress"
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Store Address (Street & City)"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="State"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            id="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Country"
          />
        </div>

        <div className="flex-1">
          <input
            type="number"
            min="0"
            id="years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Years in Operation"
          />
        </div>

        <div className="flex-1">
        <select className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    placeholder="ID Type"
                >
                   <option className="text-gray-300" value="">ID Type</option>
                   <option value="Business reg no">Business reg no</option>
                   <option value="NIN">NIN</option>
                   <option value="Driver License">Driver License</option>
                   <option value="Passort">Passport</option>
                   <option value="State approved Market Affiliated body ID">State approved Market Affiliated body ID</option>
                  </select>
        </div>

        <div className="flex-1">
          <input
            type="text"
            min="0"
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="ID Number"
          />
        </div>

      </div>
    </div>

    <div className="flex flex-col space-y-4 p-4">
      {/* First Field */}
        <label className="font-saeada text-gray-500 font-bold text-[20px]">
          Contact Details
        </label>

      {/* Second Row: Two Shorter Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {/* Field 1 */}
        <div className="flex-1">
          <input
            type="text"
            min="0"
            id="phone"
            value={phonePrimary}
            onChange={(e) => setPhonePrimary(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Primary Contact Number"
          />
        </div>

        {/* Field 2 */}
        <div className="flex-1">
          <input
            type="text"
            min="0"
            id="phone"
            value={phoneAlternate}
            onChange={(e) => setPhoneAlternate(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Alternate Contact Number"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Email Address (Optional)"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            min="0"
            id="phone"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="WhatsApp or Phone"
          />
        </div>


      </div>
    </div>

<div className="p-4">
    <label className="font-saeada text-gray-500 font-bold text-[20px]">
          Products
        </label>
    <div className="space-y-4">

{/* Filter Menu */}
<div className="flex flex-wrap gap-2 font-semibold mt-[10px] lg:pr-[100px]">
  {items.map((item) => (
    <button
      key={item}
      type="button"
      value={products}
      onChange={(e) => setSelectedItems(e.target.value)}
      onClick={() => toggleSelection(item)}
      className={`px-6 py-2 border border-black rounded-[30px] ${
        products.includes(item)
          ? "bg-[#31603D] text-white"
          : "text-gray-800"
      }`}
    >
      {item}
    </button>
  ))}
</div>
</div>
</div>

<div className="flex flex-col space-y-4 p-4">
      {/* First Field */}
        <label className="font-saeada text-gray-500 font-bold text-[20px]">
          Service Details
        </label>

      {/* Second Row: Two Shorter Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {/* Field 1 */}

        <div>
        <FormControl
    sx={{
       "& .MuiOutlinedInput-root": {
        borderRadius: "30px"
      },
      width: {xs:"170px", lg:"400px"}
    }}
  >
        <Select
          multiple
          displayEmpty
          value={activeDays}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Active Days (Schedule)</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Active Days (Schedule)</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, activeDays, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>


      </div>
    </div>

    <div className="flex flex-col space-y-4 p-4">

    <div className="">
      {/* First Field */}
        <label className="font-saeada text-gray-500 font-bold text-[20px]">
          Opening Time
        </label>

      {/* Second Row: Two Shorter Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {/* Field 1 */}
        <div className="flex-1">
          <input
            type="time"
            id="openingTime"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Bank Name"
          />
        </div>

      </div>
    </div>

    <div className="">
      {/* First Field */}
        <label className="font-saeada text-gray-500 font-bold text-[20px]">
          Closing Time
        </label>

      {/* Second Row: Two Shorter Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {/* Field 1 */}
        <div className="flex-1">
          <input
            type="time"
            id="closingTime"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Bank Name"
          />
        </div>

      </div>
    </div>
</div>
    
    <div className="flex flex-col space-y-4 p-4">
      {/* First Field */}
        <label className="font-saeada text-gray-500 font-bold text-[20px]">
          Banking & Payment Information
        </label>

      {/* Second Row: Two Shorter Fields */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {/* Field 1 */}
        <div className="flex-1">
        <Autocomplete
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => setSelectedBank(value?.name || '')}
      sx={{
        "& .MuiOutlinedInput-root": {
         borderRadius: "30px"
       },
       width: {xs:"170px", lg:"400px"}
     }}
      renderInput={(params) => <TextField {...params} label="Bank Name" />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
        </div>



        {/* Field 2 */}
        <div className="flex-1">
          <input
            type="text"
            min="0"
            id="bankAccount"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Bank Account Number"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            id="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full border border-gray-300 rounded-[30px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Account Holder's Name"
          />
        </div>

      </div>
    </div>

</form>

<div className="font-sans p-4 font-semibold flex flex-wrap lg:whitespace-nowrap">
By proceeding you agree to the <p className="underline text-[#31603D]"><Link to="/privacypolicy">Privacy Policy</Link></p> and <p className="underline text-[#31603D]"><Link to="/termsofuse">Terms of Service</Link></p>
  </div>

  {!isPending &&<div className="font-sans flex justify-center mb-[30px] lg:flex lg:justify-start lg:p-4"><button type="submit" onClick={handleSubmit} className="hover:bg-[green] text-[white] px-[120px] py-3 lg:px-40 rounded-[25px] border border-[#31603D] bg-[#31603D] font-bold">Proceed</button></div>}
  {isPending &&<div className="flex items-center justify-center mb-[30px] lg:flex lg:justify-start lg:p-4"><button disabled className="opacity-[80%] text-[white] px-[140px] py-3 lg:px-40 rounded-[25px] border border-[#31603D] bg-[#31603D] font-bold"><l-ring
  size="20"
  stroke="3"
  bg-opacity="0"
  speed="2" 
  color="white" 
></l-ring></button></div>}
    </div>


    </div>
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex justify-center font-bold">Registration Successful</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="flex text-center">
            <div className="text-[13px] lg:text-[15px]">
          Your registration is successful, Our team would verify
          the submitted details and reach out to you within 3-5 
          business days. Thank you for choosing MarketPod !
          </div>
          </DialogContentText>
        </DialogContent>
        <div className="flex justify-center mb-[30px] lg:flex lg:p-4"><button onClick={goHome} className="flex justify-center text-[white] px-[80px] lg:px-[140px] py-3 lg:px-40 rounded-[25px] border border-[#31603D] bg-[#31603D] font-bold">Continue</button></div>
      </Dialog>
    </React.Fragment>

    <div className="bg-[white] sticky lg:overflow-x-hidden lg:overflow-y-hidden lg:w-full"><Footer/></div>
    </div>
  </>)
}

export default Register
