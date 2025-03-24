import { message, Typography } from "antd";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutButton from "../components/LayoutButton";
import apis from "../utils/apis";
import StoreRows from "../components/Rows/StoresRow";
import BackButton from "../components/BackButton";
import UsersRows from "../components/Rows/UsersRow";

export default function Users() {
    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await fetch(apis.getUsers, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await res.json();
            if (result && result.data) {
                setUsers(result.data);
            } else {
                throw new Error("Failed");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    function newStore() {
        nav("/new-store/" + marketId);
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
                            <th style={{ width: "20%" }}>Email</th>
                            <th style={{ width: "20%" }}>Name</th>
                            <th>Phone </th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5}>
                                <div className="w-100 p-2">
                                    <div className="w-100 p-0 align-items-center d-flex justify-content-between">
                                        <Typography.Title level={5}>Users</Typography.Title>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {
                            users.map((x, ind) => <UsersRows
                                key={ind}
                                email={x.email || "- - -"}
                                id={x.id || "- - -"}
                                stat={x.stat}
                                first_name={x.first_name || "- - -"}
                                last_name={x.last_name || "- - -"}
                                phone={x.phone || "- - -"}

                            />)
                        }
                    </tbody>

                </table>
            </div>
        </Layout>
    )
}