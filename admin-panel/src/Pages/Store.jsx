import { message, Typography } from "antd";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LayoutButton from "../components/LayoutButton";
import apis from "../utils/apis";
import ProductRows from "../components/Rows/ProductRow";
import BackButton from "../components/BackButton";
import { MainContext } from "../contexts/MainContext";

export default function Store() {
    const nav = useNavigate();
    const { storeId, storeName } = useParams();
    const [products, setProducts] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState({});
    const [isLoading, setLoading] = useState(false);
    const { appData } = useContext(MainContext);
    const getData = async () => {
        setLoading(true);
        try {
            const res = await fetch(apis.getProducts + storeId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await res.json();
            if (result && result.data) {
                setProducts(result.data);
                const fil = {};
                result.data.map(x => {
                    fil[x.category_name] = fil[x.category_name] != undefined && Array.isArray(fil[x.category_name]) ? [...fil[x.category_name], x] : [x]
                });
                setOrderedProducts(fil);
            } else {
                throw new Error("Failed");
            }
        } catch (err) {
            console.log(err);
            message.error(`Failed to load products for ${storeName}`)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    function newProduct() {
        nav("/new-product/" + storeId);
    }
    function editStore() {
        nav("/new-store/0/" + storeId);
    }
    function deleteStore() {
        message.warning(`${storeName} deleted`);
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
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "20%" }}>Sub Title</th>
                            <th>Weight</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6}>
                                <div className="w-100 p-2">
                                    <div className="w-100 p-0 align-items-center d-flex justify-content-between">
                                        <Typography.Title level={5}>{storeName}</Typography.Title>
                                        <div className="d-flex gap-2">
                                            {
                                                appData.user.role == "SUPER_ADMIN" && (
                                                    <>
                                                        <LayoutButton onClick={deleteStore} text={"Delete Store"}></LayoutButton>
                                                        <LayoutButton onClick={editStore} text={"Edit Store"} type={"success"}></LayoutButton>
                                                    </>
                                                )
                                            }
                                            <LayoutButton onClick={newProduct} text={"Add New Product"} type={"success"}></LayoutButton>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {
                            Object.keys(orderedProducts).map(x=><>
                            <tr key={x}>
                                <td colSpan={6}>
                                    <Typography.Title level={4}>{x}</Typography.Title>
                                </td>
                            </tr>
                            {
                                orderedProducts[x].map((y,ind)=> <ProductRows key={ind} {...y}/>)
                            }
                            </>)
                        }
                       
                    </tbody>

                </table>
            </div>
        </Layout>
    )
}