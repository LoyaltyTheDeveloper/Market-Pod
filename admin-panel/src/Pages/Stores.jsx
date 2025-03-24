import { message, Typography } from "antd";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LayoutButton from "../components/LayoutButton";
import apis from "../utils/apis";
import StoreRows from "../components/Rows/StoresRow";
import BackButton from "../components/BackButton";
import { MainContext } from "../contexts/MainContext";

export default function Stores() {
    const nav = useNavigate();
    const { marketId, marketName } = useParams();
    const [stores, setStores] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { myReq } = useContext(MainContext);
    const [reload,triggerReload] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await fetch(apis.getStores + "/" + marketId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await res.json();
            if (result && result.stores) {
                setStores(result.stores);
            } else {
                throw new Error("Failed");
            }
        } catch (err) {
            console.log(err);
            message.error(`Failed to load stores for ${marketName}`)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, [reload]);

    const { appData } = useContext(MainContext);

    function newStore() {
        nav("/new-store/" + marketId);
    }

    async function toogleOpenCloseStatus(storeId, status) {
        setLoading(true);
        try {
            const res = await myReq(apis.openStores+'?storeId='+storeId, { status: Number(status) }, true);
            if (res.status) {
                message.success(res.message);
                triggerReload(!reload)
            } else {
                if (res.message)
                    return message.error(res.message)
                throw new Error("Failed to open store");
            }
        } catch (err) {
            console.log(err);
            message.error(`Failed to ${status ? 'open':'close'} store`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout isLoading={isLoading}>
            <div className="w-lg-75 h-100 p-0 overflow-auto">
                <Header Buttons={() => <BackButton />} />
                <div className="mb-3 py-2">
                </div>
                <table className="w-100 mTabel">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Store Name</th>
                            <th style={{ width: "20%" }}>Store Address</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5}>
                                <div className="w-100 p-2">
                                    <div className="w-100 p-0 align-items-center d-flex justify-content-between">
                                        <Typography.Title level={5}>{marketName}</Typography.Title>
                                        <div className="d-flex gap-2">
                                            {
                                                appData.user.role === "SUPER_ADMIN" && (<LayoutButton onClick={newStore} text={"Add New Store"} type={"success"}></LayoutButton>)
                                            }
                                        </div>


                                    </div>
                                </div>
                            </td>
                        </tr>
                        {
                            stores.map((x, ind) => <StoreRows
                                key={ind}
                                id={x.id}
                                store={x.name}
                                img={x.image}
                                addr={x.addr}
                                stat={Boolean(x.is_open)}
                                vendor={x.vendorName}
                                toogle={toogleOpenCloseStatus}
                            />)
                        }
                    </tbody>

                </table>
            </div>
        </Layout>
    )
}