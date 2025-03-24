import { message, Typography } from "antd";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Row } from "react-bootstrap";
import Overviewcard from "../components/OverViewCard";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import apis from "../utils/apis";

export default function Overview() {
    const { myReq } = useContext(MainContext);

    const [isLoading, setLoading] = useState(false);
    const [data,setPageData] = useState({
        order_count: 0,
        market_count: 0,
        stores_count: 0,
        carriers_count: 0,
        users_count: 0,
        product_count: 0,
        team_count: 0
    });

    const getData = async () => {
        setLoading(true);
        try {
            const res = await myReq(apis.getStat,{},false);
            if(res.status){
                setPageData(res.data);
            }else if(res.message){
                message.error(res.message);
            }else{
                throw new Error("Failed to load data");
            }
        } catch (err) {
            console.log(err);
            message.error(`Failed to load data `)
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout isLoading={isLoading}>
            <Header title={"Dashboard Overview"} />
            <div className="row m-0 p-0 w-100">
                <div className="col-md-12 col-lg-10 col-12 p-0">
                    <Row className="m-0 p-0">
                        <Overviewcard title={"Orders"}
                            icon={"order"}
                            subTitle={"Total Number of Orders"}
                            num={data.order_count}
                            numText={"50% more than last month"}
                        />
                        <Overviewcard title={"Markets"}
                            icon={"market"}
                            subTitle={"Total Number of Markets"}
                            num={data.market_count}
                            numText={"57% more than last month"}
                        />
                        <Overviewcard title={"Vendors"}
                            icon={"market"}
                            subTitle={"Total Number of Vendors"}
                            num={data.stores_count}
                            numText={"9% more than last month"}
                        />
                        <Overviewcard title={"Carriers"}
                            icon={"carrier"}
                            subTitle={"Total Number of carriers"}
                            num={data.carriers_count}
                            numText={"10% more than last month"}
                        />
                        <Overviewcard title={"Users"}
                            icon={"users"}
                            subTitle={"Total Number of Users"}
                            num={data.users_count}
                            numText={"12% more than last month"}
                        />
                        <Overviewcard title={"Team"}
                            icon={"team"}
                            subTitle={"Total Number of team members"}
                            num={data.team_count}
                            numText={"0% more than last month"}
                        />
                        <Overviewcard title={"Products"}
                            icon={"order"}
                            subTitle={"Total Number of team productss"}
                            num={data.product_count}
                            numText={"0% more than last month"}
                        />
                        <Overviewcard title={"Revenune"}
                            icon={"order"}
                            subTitle={"Total Number of team members"}
                            num={"04"}
                            numText={"0% more than last month"}
                        />
                    </Row>
                </div>
            </div>
        </Layout>
    )
}