import { message, Typography } from "antd";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
// import { UserOutlined } from "@ant-design/icons";

import { Dropdown, Menu, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";


export default function Header({ title, Buttons }) {
    const { appData, logout } = useContext(MainContext);
    function onLogout(){
        message.warning("Admin session terminated");
        logout();
    }
    const menu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="w-100 m-0 py-3 sticky-top " style={{ paddingBottom: 15, backgroundColor: "#f9f9f9" }}>
            <div className="w-100 d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3">
                    {
                        title && <Typography.Title level={5}>{title}</Typography.Title>
                    }
                    {
                        Buttons && <Buttons />
                    }
                </div>
                <div className="px-4">
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <div
                            className="d-flex gap-1 align-items-center"
                            style={{ cursor: "pointer" }}
                        >
                            <div>
                                <div
                                    className="mCircle d-flex justify-content-center align-items-center"
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 60,
                                        backgroundColor: "#ccc",
                                    }}
                                >
                                    <UserOutlined />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <strong>
                                        {appData.user &&
                                            `${appData.user.lastName} ${appData.user.firstName}`}
                                    </strong>
                                </div>
                                <div>
                                    <small style={{ fontSize: 12 }}>
                                        {appData.user && `${appData.user.role}`}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                    {/* <div className="d-flex gap-1">
                        <div>
                            <div className="mCircle d-flex justify-content-center align-items-center" style={{ width: 45, height: 45, borderRadius: 60, backgroundColor: "#ccc" }}>
                                <UserOutlined />
                            </div>
                        </div>
                        <div>
                            <div>
                                <strong>{appData.user && (`${appData.user.lastName} ${appData.user.firstName}`)}</strong>
                            </div>
                            <div >
                                <small  style={{fontSize:12}}>
                                    {appData.user && (`${appData.user.role}`)}
                                </small>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}