import { AppstoreOutlined, ContainerOutlined, HistoryOutlined, ShopOutlined, TeamOutlined, TruckFilled, UserOutlined } from "@ant-design/icons";
import Logo from "../assets/images/logo.png";
import SideLink from "./SideLink";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export default function SideBar() {
    const { appData } = useContext(MainContext);
    const MyNavLink = ({ children, to, activePaths = [] }) => {

        const location = useLocation();

        const isActivePath = activePaths.some(path => location.pathname.includes(path));
        return (
            <NavLink
                to={to}
                className={({ isActive, isPending, isTransitioning }) => {
                    return [
                        isActive || isActivePath ? "activeLink" : "",
                        "side-bar-link"
                    ].join(" ");
                }}
            >
                {children}
            </NavLink>
        )
    }
    const iconSize = 15;
    return (
        <div className="w-100 h-100 overflow-auto">
            <div className="d-flex h-100 flex-column justify-content-between">
                <div>
                    <div className="d-flex justify-content-center py-3">
                        <img src={Logo} width={130} />
                    </div>
                    <MyNavLink to={"/"}>
                        <SideLink text={"Overview"}>
                            <AppstoreOutlined style={{ fontSize: iconSize }} />
                        </SideLink>
                    </MyNavLink>

                    <MyNavLink to="/orders">
                        <SideLink text={"Live Orders"}>
                            <ContainerOutlined style={{ fontSize: iconSize }} />
                        </SideLink>
                    </MyNavLink>
                    <MyNavLink to="/history">
                        <SideLink text={"Order History"}>
                            <HistoryOutlined style={{ fontSize: iconSize }} />
                        </SideLink>
                    </MyNavLink>
                    <MyNavLink to="/shops" activePaths={["stores", "new-market", "new-store", "store", "new-product"]}>
                        <SideLink text={"Shops & Vendors"}>
                            <ShopOutlined style={{ fontSize: iconSize }} />
                        </SideLink>
                    </MyNavLink>
                    {
                        appData.user.role == "SUPER_ADMIN" && (
                            <>
                                <MyNavLink to="/carriers">
                                    <SideLink text={"Carriers"}>
                                        <TruckFilled style={{ fontSize: iconSize }} />
                                    </SideLink>
                                </MyNavLink>
                                <MyNavLink to="/users">
                                    <SideLink text={"Users"}>
                                        <UserOutlined style={{ fontSize: iconSize }} />
                                    </SideLink>
                                </MyNavLink>
                                <MyNavLink to="/team">
                                    <SideLink text={"Team"}>
                                        <TeamOutlined style={{ fontSize: iconSize }} />
                                    </SideLink>
                                </MyNavLink>
                            </>
                        )
                    }
                </div>
                <div></div>
            </div>
        </div>
    )
}