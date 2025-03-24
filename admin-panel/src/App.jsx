import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import MainApp from "./MainApp";
import "./App.css";
import Orders from "./Pages/Orders";
import Overview from "./Pages/Overview";
import Markets from "./Pages/Markets";
import Stores from "./Pages/Stores";
import NewMarket from "./Pages/NewMarket";
import { ConfigProvider, message } from "antd";
import { MainContext } from "./contexts/MainContext";
import NewStore from "./Pages/NewStore";
import Store from "./Pages/Store";
import NewProduct from "./Pages/NewProduct";
import Users from "./Pages/Users";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import logo from "./assets/images/logo.png";
import Team from "./Pages/Team";
import Carriers from "./Pages/Carriers";
function App() {

  const initialState = localStorage.getItem('appState')
    ? JSON.parse(localStorage.getItem('appState'))
    : {
      token: "",
      user: {
        firstName: "",
        lastName: "",
        role: "",
        roleId: undefined
      },
      logged: false
    };

  const [appData, setAppData] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appData));
  }, [appData])


  function setTokenAndUser(token, user) {
    setAppData({
      token,
      user,
      logged: Boolean(token) // Set logged to true if a token exists
    });
  }

  const expiredSession = () => {
    setAppData({
      token: "",
      user: {
        firstName: "",
        lastName: "",
        role: "",
        roleId: undefined
      },
      logged: false
    });
    // location.reload("/auth")
    // console.log("false");
    message.error("Expired Token");

  }
  const logout = () => {
    setAppData({
      token: "",
      user: {
        firstName: "",
        lastName: "",
        role: "",
        roleId: undefined
      },
      logged: false
    });
    // location.reload("/auth")
    // console.log("false");
  }

  async function myReq(url, data, post = true) {
    const isFormData = data instanceof FormData;
    // console.log("using " + appConcept.token);
    const headers = new Headers();
    headers.set("Authorization", appData.token)
    headers.set("Cache-Control", "no--cache");
    if (!isFormData) {
      headers.set("Content-Type", "application/json");
    }
    const requestResponse = await fetch(url, {
      method: post ? "POST" : 'GET',
      cache: 'no-cache',
      headers: headers,
      body: post ? isFormData ? data : JSON.stringify(data) : null
    }, 10000).then(
      async x => {
        if (x.status == 403)
          return expiredSession();
        // if (x.status == 403)
        //   return expiredSession(1);
        const result = await x.json();
        return result;
      }
    ).catch(
      err => {
        console.log("req err ", err);
        return ({ status: false, message: err || "Request error" });
      }
    );
    return requestResponse
  }
  return (
    <MainContext.Provider value={{ myReq, setTokenAndUser, appData , logout }}>
      <div className="w-100 h-100 d-flex d-md-none justify-content-center align-items-center">
        <div>
          <div className="d-flex justify-content-center">
            <img src={logo} />
          </div>
          <div>
            <h3 className="text-center">Please use large screen device to access dashoard </h3>
          </div>
        </div>
      </div>
      <div className="w-100 d-md-flex">
        <>
          <ConfigProvider theme={{
            token: {
              colorPrimary: "#31603D",

            }
          }}>
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Login />} />
                <Route path="/" element={<MainApp />}>
                  <Route path="/" element={<Overview />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/history" element={<Orders live={false}/>} />
                  <Route path="/shops" element={<Markets />} />
                  <Route path="/stores/:marketId/:marketName" element={<Stores />} />
                  <Route path="/store/:storeId/:storeName" element={<Store />} />
                  <Route path="/new-market" element={<NewMarket />} />
                  <Route path="/new-market/:id" element={<NewMarket />} />
                  <Route path="/new-store/:marketId" element={<NewStore />} />
                  <Route path="/new-store/:marketId/:id" element={<NewStore />} />
                  <Route path="/new-product/:storeId" element={<NewProduct />} />
                  <Route path="/new-product/:storeId/:id" element={<NewProduct />} />
                  <Route path="/carriers" element={<Carriers />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/team" element={<Team />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ConfigProvider>
        </>
      </div>
    </MainContext.Provider>
  )
}

export default App;
