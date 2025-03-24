import { Col, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MainContext } from "./contexts/MainContext";

export default function MainApp() {

    const { appData } = useContext(MainContext);
    const nav = useNavigate();
    // cons
    useEffect(() => {
        if (!appData.token) {
            nav("/auth");
        }
    }, [appData]);
    return (
        <div className="w-100 h-100">
            <Row className="h-100">
                <Col md={3} lg={3} xl={2}>
                    <SideBar />
                </Col>
                <Col className="h-100 p-0" md={9} lg={9} xl={10} style={{ backgroundColor: "#F9F9F9" }}>
                    <Outlet />
                </Col>
            </Row>
        </div>
    )
}