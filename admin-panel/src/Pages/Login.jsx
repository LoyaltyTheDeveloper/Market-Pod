import Layout from "../components/Layout";
import Logo from "../assets/images/logo.png";
import { Button, Input, message } from "antd";
import { useContext, useState } from "react";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import apis from "../utils/apis";
import { MainContext } from "../contexts/MainContext";

export default function Login() {
    const [email, setMail] = useState();
    const [pswd, setPswd] = useState();
    const [isLoading, setLoading] = useState(false);
    const nav = useNavigate();
    const {setTokenAndUser} = useContext(MainContext);
    async function handleLogin() {
        setLoading(true);
        try {
            const request = await fetch(apis.signin, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, pswd })
            });

            const response = await request.json();
            if (response.status) {
                console.group(response);
                message.success(response.message);
                setTokenAndUser(response.token,response.data);
                nav("/",{state:{token:response.token,user:response.data}});
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error("Error occured");
            console.log('signin error ', err);
        } finally {
            setLoading(false);
        }


    }
    return (
        <>
            <Layout isLoading={isLoading}>
                <div className="h-100 m-0 row">
                    <div className="col-6 d-flex align-items-center justify-contents-center">
                        <div className="w-100">
                            <div className="d-flex justify-content-center mb-2 w-100">
                                <img src={Logo} width={130} />
                            </div>
                            <div className="d-flex justify-content-center mb-2 w-100">
                                <Input placeholder="Email" className="w-75"
                                    value={email}
                                    onChange={(x) => { setMail(x.target.value) }}
                                    prefix={<UserOutlined />}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-4 w-100" >
                                <Input.Password placeholder="Password" className="w-75"
                                    value={pswd}
                                    onChange={(x) => { setPswd(x.target.value) }}
                                    prefix={<KeyOutlined />}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-2 w-100" >
                                <Button className="bg-project w-75" onClick={handleLogin}>Login</Button>
                                {/* <div className="w-75 bg-project">Login</div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 bg-project h-100"></div>
                </div>
            </Layout>
        </>
    )
}