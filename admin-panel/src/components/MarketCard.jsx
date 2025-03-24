import { ContainerOutlined, EditFilled, ShopFilled, TeamOutlined, TruckFilled, UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export default function MarketCard({ name, addr, image, id }) {
    const nav = useNavigate();
    function showStores() {
        nav("/stores/" + id + "/" + name);
    }
    function editMarket(event) {
        event.stopPropagation();
        nav("/new-market/" + id);
    }
    const iconSize = 15;
    const { appData } = useContext(MainContext);
    return (
        <Col sm={6} md={3} className="overviewCardCol">
            <div className="w-100 h-100 overflow-hidden" onClick={showStores}>
                <div className="w-100 overflow-hiden" style={{ height: "65%" }}>
                    <div className="w-100 d-flex h-100">
                        <img src={image} className="w-100 h-100 object-cover" />
                    </div>
                </div>
                <div className="w-100 overflow-hidden" style={{ height: "35%" }}>
                    <div className="px-2 overviewTop d-flex flex-column w-100 py-1">
                        <div className="d-flex overflow-e justify-content-between w-100">
                            <strong className="title">{name}</strong>
                            {
                                appData.user.role === "SUPER_ADMIN" && (<div onClick={editMarket}>
                                    <EditFilled style={{ color: "#31603D", fontSize: 14 }} />
                                </div>)
                            }
                        </div>
                        <div className="d-flex overflow-e"><small className="text">{addr}</small></div>
                    </div>
                </div>
            </div>
        </Col>
    )
}