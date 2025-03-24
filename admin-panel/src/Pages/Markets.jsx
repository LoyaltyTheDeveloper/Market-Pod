import { message } from "antd";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Row } from "react-bootstrap";
import MarketCard from "../components/MarketCard";
import { useContext, useEffect, useState } from "react";
import apis from "../utils/apis";
import LayoutButton from "../components/LayoutButton";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export default function Markets() {
    const [markets, setMarkets] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { appData, myReq } = useContext(MainContext);
    const nav = useNavigate();

    const getData = async () => {
        setLoading(true);
        try {
            const result = await fetch(apis.getMarkets, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await result.json();
            if (res.markets && Array.isArray(markets)) {
                setMarkets(res.markets);
            } else {
                throw new Error("Failed to load data");
            }
        } catch (err) {
            console.log(err);
            message.error("Failed to load markets");
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        getData();
    }, []);
    function newMarket({ edit = false, id }) {
        edit ? nav("/new-market/:" + id) : nav("/new-market");
    }

    async function closeAllStores() {
        setLoading(true);
        try {
            const res = await myReq(apis.openStores, { status: 0 }, true);
            if (res.status) {
                message.success(res.message);
            } else {
                if (res.message)
                    return message.error(res.message)
                throw new Error("Failed to close stores");
            }
        } catch (err) {
            console.log(err);
            message.error("Failed to close stores");
        } finally {
            setLoading(false);
        }
    }
    async function openAllStores() {
        setLoading(true);
        try {
            const res = await myReq(apis.openStores, { status: 1 }, true);
            if (res.status) {
                message.success(res.message);
            } else {
                if (res.message)
                    return message.error(res.message)
                throw new Error("Failed to open stores");
            }
        } catch (err) {
            console.log(err);
            message.error("Failed to open stores");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Layout isLoading={isLoading}>
            <Header title={"Markets & Vendors"} />
            <div className="d-flex gap-2">
                {
                    (appData && appData.user.role == "SUPER_ADMIN") && <LayoutButton onClick={newMarket} text={"Add New Market"} fill={true} />
                }
                <LayoutButton text={"Open All Stores"} type={"success"} onClick={openAllStores}/>
                <LayoutButton text={"Close All Stores"} onClick={closeAllStores}/>
            </div>

            <div className="row m-0 p-0 w-100 mt-2">
                <div className="col-md-12 col-lg-10 col-12 p-0">
                    <Row className="m-0 p-0">
                        {markets.map((x, ind) => <MarketCard key={ind} {...x} />)}
                    </Row>
                </div>
            </div>
        </Layout>
    )
}