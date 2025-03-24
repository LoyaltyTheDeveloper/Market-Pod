import { message, Typography } from "antd";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import LayoutButton from "../components/LayoutButton";
import apis from "../utils/apis";
import BackButton from "../components/BackButton";
import { MainContext } from "../contexts/MainContext";
import CarrierRow from "../components/Rows/CarrierRow";



export default function Carriers() {

    const [isLoading, setLoading] = useState(false);
    const [carriers, setCarriers] = useState([]);

    const { myReq } = useContext(MainContext);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await myReq(apis.getCarriers, {}, false);

            if (res.status) {
                setCarriers(res.data);
            } else {
                message.error(res.message);
            }

        } catch (err) {
            console.log(err);
            message.error(`Failed to load carriers`)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    const { appData } = useContext(MainContext);

    // function viewOrder(data) {
    //     console.log(data);
    //     setSelectedOrder(data);
    // }
    // useEffect(() => {
    //     if (selectedOrder && selectedOrder !== null) {
    //         openModal();
    //     }
    // }, [selectedOrder])
    return (
        <Layout isLoading={isLoading}>
            <div className="w-lg-75 h-100 p-0 overflow-auto">
                <Header Buttons={() => <BackButton />} />
                <div className="mb-3 py-2">
                </div>
                <table className="w-100 mTabel">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Carrier-Id</th>
                            <th style={{ width: "20%" }}>Carrier Name</th>
                            <th>Status</th>
                            <th>No of Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5}>
                                <div className="w-100 p-2">
                                    <div className="w-100 p-0 align-items-center d-flex justify-content-between">
                                        <Typography.Title level={5}>All Carriers {carriers.length}</Typography.Title>
                                        {
                                           // appData.user.role === "SUPER_ADMIN" && (<LayoutButton text={"Export"} type={"success"}></LayoutButton>)
                                        }

                                    </div>
                                </div>
                            </td>
                        </tr>
                        {
                            carriers.map((x, ind) => <CarrierRow
                                key={ind}
                                {...x}
                            />)
                        }
                    </tbody>

                </table>

            </div>


        </Layout>
    )
}








