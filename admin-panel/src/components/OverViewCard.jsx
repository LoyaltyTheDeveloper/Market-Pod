import { ContainerOutlined, ShopFilled, TeamOutlined, TruckFilled, UserOutlined } from "@ant-design/icons";
import { Col, Row } from "react-bootstrap";

export default function Overviewcard({title,subTitle,icon,num,numText}) {
    const iconSize = 15;
    return (
        <Col sm={6} md={3} className="overviewCardCol">
            <div className="w-100 h-100 overflow-hidden p-3">
                <div className="w-100 h-25 overflow-hiden">
                    <div className="w-100 d-flex">
                        <div>
                           {icon == "order" &&  <ContainerOutlined style={{ fontSize: iconSize }}></ContainerOutlined>}
                           {icon == "market" &&  <ShopFilled style={{ fontSize: iconSize }}/>}
                           {icon == "carrier" &&  <TruckFilled style={{ fontSize: iconSize }}/>}
                           {icon == "users" &&  <UserOutlined style={{ fontSize: iconSize }}/>}
                           {icon == "team" &&  <TeamOutlined style={{ fontSize: iconSize }}/>}
                        </div>
                        <div className="px-1 overviewTop d-flex flex-column w-100">
                            <div className="d-flex overflow-e"><strong className="title">{title}</strong></div>
                            <div className="d-flex overflow-e"><small className="text">{subTitle}</small></div>
                        </div>
                    </div>
                </div>
                <div className="w-100 h-75 overflow-hidden">
                    <div className="w-100 h-100  mt-2 overviewData justify-content-center align-items-center d-flex flex-column">
                        <div className="num">{num}</div>
                        <div className="numText">{numText}</div>
                    </div>
                </div>
            </div>
        </Col>
    )
}