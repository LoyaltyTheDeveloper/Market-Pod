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
import OrderRows from "../components/Rows/OrderRow";
import { Modal, Button, Form, Input, Select, notification, Row, Col } from "antd";
import Logo from "../assets/images/logo.png";

import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, CarOutlined } from "@ant-design/icons";

const statusOptions = [
    { label: "Canceled", value: '3', icon: <CloseCircleOutlined /> },
    { label: "Awaiting Pick Up", value: '0', icon: <ClockCircleOutlined /> },
    { label: "In Transit", value: '1', icon: <CarOutlined /> },
    { label: "Delivered", value: '2', icon: <CheckCircleOutlined /> }
];

const { Option } = Select;

export default function Orders({ live = true }) {

    const [isLoading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reload, triggerReload] = useState(false);
    const [carriers, setCarriers] = useState([]);
    const [form] = Form.useForm();

    const fireReload = () => triggerReload(!reload);


    const [orders, setOrders] = useState([]);

    const [targetStatus, setTargetStatus] = useState();

    const getStatus = (val) => {
        switch (Number(val)) {
            case 0:
                return "Awaiting Pick up";
            case 1:
                return "In Transit";
            case 2:
                return "Delivered";
            case 3:
                return "Cancled";
            default:
                return "In Transit";

        }
    }
    const handleStatusChange = (value) => {
        setTargetStatus(value);
    };

    const setOrderStatus = async () => {
        if (selectedOrder.status == targetStatus)
            return;
        const targetStatusValue = getStatus(targetStatus);
        Modal.confirm({
            title: "Change Order Status",
            content: `Are you sure you want to set this status of this order to ${targetStatusValue} ?`,
            okText: `Yes set to ${targetStatusValue}`,
            cancelText: "No",
            onOk: changeOrderStatus
        });
    }

    const changeOrderStatus = async () => {
        setLoading(true);
        try {
            const res = await myReq(apis.changeOrderStatus + selectedOrder.id, { status: targetStatus });
            if (res.status) {
                message.success(res.message);
                setSelectedOrder(prev => ({ ...prev, status: "1" }));
                setLoading(false);
                fireReload();
            } else {
                message.error(res.message);
                setLoading(false);
            }
        } catch (err) {
            message.error("Error confirming order");
            setLoading(false);
        }
    }

    const openModal = (order) => {
        setSelectedOrder(order);
        console.log(order)
        form.setFieldsValue({
            carrier_id: null,
            status: order.status || "0",
        });
        setIsModalOpen(true);
    };

    useEffect(() => {
        selectedOrder?.status && setTargetStatus(selectedOrder.status);
    }, [selectedOrder])

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        form.resetFields();
    };


    const handleFormSubmit = (values) => {
        if (!selectedOrder) return;

        const updatedData = {
            ...selectedOrder,
            ...values,
        };

        // Call API or update function
        updateOrder(updatedData)
            .then(() => {
                notification.success({
                    message: "Success",
                    description: "Order updated successfully.",
                });
                closeModal();
            })
            .catch(() => {
                notification.error({
                    message: "Error",
                    description: "Failed to update the order. Please try again.",
                });
            });
    };

    async function assignCarrier(id) {
        setLoading(true);
        try {
            const res = await myReq(apis.assignCarrier, { orderId: selectedOrder.id, carrierId: id });
            if (res.status) {
                message.success(res.message);
                setSelectedOrder(prev => ({ ...prev, ...res.data }));
                setLoading(false);
                fireReload();
            } else {
                message.error(res.message);
                setLoading(false);
            }
        } catch (err) {
            message.error("Error assigning carrier");
            setLoading(false);
        }
    }

    const { myReq } = useContext(MainContext);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await myReq((live ? apis.getOrders : apis.getOrderHistory), {}, false);

            if (res.status) {
                setOrders(res.data);
                setCarriers(res.carriers);

            } else {
                message.error(res.message);
            }

        } catch (err) {
            console.log(err);
            message.error(`Failed to load orders`)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, [reload, live]);

    const { appData } = useContext(MainContext);


    const OrderStatus = ({ stat }) => {
        switch (stat) {
            case "0":
                return <span className="text-warning">Awaiting Pick up</span>;
                break;
            case "1":
                return <span className="text-primary">In Transit</span>;
                break;
            case "2":
                return <span className="text-success">Delivered</span>;
                break;
            case "3":
                return <span className="text-danger">Canceled</span>;
                break;
            default:
                return <span className="text-warnign">Awaiting Pick up</span>;
                break;
        }
    }
    const PaymentStatus = ({ stat }) => {
        switch (stat) {
            case 0:
                return <span className="text-danger">Not Paid</span>;
                break;
            case 1:
                return <span className="text-success">Paid</span>;
                break;
            case 2:
                return <span className="text-primary">Refunded</span>;
                break;
            default:
                return <span className="text-warning">Unknown</span>;
                break;
        }
    }
    const VendorFundedStatus = ({ stat }) => {
        switch (stat) {
            case 0:
                return <span className="text-danger">Not Funded</span>;
                break;
            case 1:
                return <span className="text-success">Funded</span>;
                break;
            case 2:
                return <span className="text-primary">Refunded</span>;
                break;
            default:
                return <span className="text-warning">Unknown</span>;
                break;
        }
    }

    const [displayRows, setDisplayedRows] = useState(null);

    const handleDisplayChange = (value) => {
        setDisplayedRows(value);
        console.log("Selected:", value);
    };

    useEffect(
        ()=>{
            switch(displayRows){
                case 1:
                   setOrders(
                    prev=> prev.map(x=>({...x,hidden:false}))
                   );
                break
                case 2:
                   setOrders(
                    prev=> prev.map(x=>({...x,hidden:x.carrier_name ? true : false}))
                   );
                break
                case 3:
                   setOrders(
                    prev=> prev.map(x=>({...x,hidden:x.carrier_name ? false:true}))
                   );
                break
                default:
                   setOrders(
                    prev=> prev.map(x=>({...x,hidden:false}))
                   );
                break
            }
        },[displayRows]
    )

    return (
        <Layout isLoading={isLoading}>
            <div className="w-lg-75 h-100 p-0 overflow-auto">
                <Header Buttons={() => <BackButton />} />
                <div className="mb-3 py-2">
                </div>
                <table className="w-100 mTabel">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Order-Id</th>
                            <th style={{ width: "20%" }}>Ordered By</th>
                            <th>Delivery Address</th>
                            <th>Carrier</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5}>
                                <div className="w-100 p-2">
                                    <div className="w-100 p-0 align-items-center d-flex justify-content-between">
                                        <Typography.Title level={4}>
                                            {
                                                live ? `All orders ${orders.length}` : "Order History"
                                            }
                                        </Typography.Title>
                                        {
                                            live ? <>
                                                <Select
                                                    style={{ width: 200 }}
                                                    placeholder="Filter Orders"
                                                    onChange={handleDisplayChange}
                                                    value={displayRows}
                                                >
                                                    <Option value={1}>All </Option>
                                                    <Option value={2}>Unassigned</Option>
                                                    <Option value={3}>Assigned</Option>
                                                </Select>
                                            </> : <></>
                                        }
                                        {/* {
                                            appData.user.role === "SUPER_ADMIN" && (<LayoutButton text={"Add New Store"} type={"success"}></LayoutButton>)
                                        } */}

                                    </div>
                                </div>
                            </td>
                        </tr>

                        {
                            orders.map((x, ind) => <OrderRows
                                key={ind}
                                {...x}
                                data={x}
                                hidden={x.hidden}
                                onClick={openModal}
                            />)
                        }
                    </tbody>

                </table>

            </div>



            <Modal
                title={
                    <div style={{ textAlign: "center" }}>
                        <img
                            src={Logo} // Replace with your logo URL
                            alt="Project Logo"
                            style={{ width: 100, marginBottom: 10 }}
                        />
                    </div>
                }
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={800}
            >
                {selectedOrder && (
                    <Row gutter={[16, 16]}>
                        {/* Store Details */}
                        <Col span={10}>
                            <>
                                <Typography.Title level={4}>Order Details</Typography.Title>
                                <p ><strong>Order Id : {selectedOrder.id}</strong></p>
                                <p ><strong>Created Date : {new Date(selectedOrder.created_at).toLocaleDateString()}</strong></p>
                                <p ><strong>Created Time : {new Date(selectedOrder.created_at).toLocaleTimeString()}</strong></p>
                                <p ><strong>Customer:</strong> {selectedOrder.full_name}</p>
                                <p ><strong>Phone:</strong> {selectedOrder.phone_number}</p>
                                <p ><strong>Email:</strong> {selectedOrder.email}</p>
                                <p ><strong>General Area:</strong> {selectedOrder.location_name}</p>
                                <p ><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state}</p>
                                <p ><strong>Product Amount:</strong> ₦{selectedOrder.product_amount}</p>
                                <p ><strong>Delivery Fee:</strong> ₦{selectedOrder.delivery_amount}</p>
                                <p ><strong>Service Charge:</strong> ₦{selectedOrder.service_charge}</p>
                                <p ><strong>Total Charge:</strong> ₦{selectedOrder.total_pay}</p>

                                <p><strong>Carrier:</strong>
                                    {
                                        selectedOrder.carrier_name ? <>
                                            <div className="px-2" style={{ display: "inline-flex", alignItems: "center" }}>
                                                <img
                                                    src={selectedOrder.carrier_logo} // Carrier's logo
                                                    alt={selectedOrder.carrier_name}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        marginRight: 8,
                                                        objectFit: "cover",
                                                        borderRadius: 4
                                                    }}
                                                />
                                                {selectedOrder.carrier_name}
                                            </div>
                                        </> : <><div className="d-inline-flex px-2">N/A</div></>
                                    }


                                </p>
                            </>
                            <Typography.Title level={4}>Store Details</Typography.Title>
                            <img
                                src={selectedOrder.store_image}
                                alt="Store"
                                style={{
                                    width: "100%",
                                    borderRadius: 8,
                                    marginBottom: 16,
                                    objectFit: "cover",
                                }}
                            />
                            <p><strong>Name:</strong> {selectedOrder.store_name || "N/A"}</p>
                            <p><strong>Address:</strong> {selectedOrder.store_address || "N/A"}</p>
                            <p><strong>Market:</strong> {selectedOrder.market_name || "N/A"}</p>

                        </Col>

                        {/* Order Details and Form */}
                        <Col span={14}>
                            <>
                                {/* Ordered Items */}
                                <Typography.Title level={5}>Ordered Items</Typography.Title>
                                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                        {selectedOrder.items.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginBottom: 10,
                                                    borderBottom: "1px solid #f0f0f0",
                                                    paddingBottom: 8,
                                                }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.product_name}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 4,
                                                        objectFit: "cover",
                                                        marginRight: 10,
                                                    }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <p className="m-0"><strong>{item.product_name}</strong></p>
                                                    <p className="m-0">Quantity: {item.quantity}</p>
                                                    <p className="m-0">Price: ₦{item.amount}</p>
                                                    <p className="m-0">Size: {item.size}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No items in this order.</p>
                                )}

                                {/* Form for Updating Order */}
                                {/* <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                                    <Form.Item
                                        name="carrier_id"
                                        label="Assign Carrier"
                                        rules={[{ required: true, message: "Please select a carrier." }]}
                                    >
                                        <Select placeholder="Select Carrier">
                                            {carriers.map((carrier) => (
                                                <Option key={carrier.id} value={carrier.id}>
                                                    {carrier.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="status"
                                        label="Order Status"
                                        rules={[{ required: true, message: "Please select a status." }]}
                                    >
                                        <Select placeholder="Select Status">
                                            <Option value="0">Pending</Option>
                                            <Option value="1">Completed</Option>
                                            <Option value="2">Cancelled</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block>
                                            Update Order
                                        </Button>
                                    </Form.Item>
                                </Form> */}
                                <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                                    <Typography.Title level={5}>Assign Carrier</Typography.Title>
                                    <Form.Item
                                        name="carrier_id"
                                        rules={[{ required: true, message: "Please select a carrier." }]}
                                    >
                                        <Select
                                            placeholder="Select Carrier"

                                        >
                                            {carriers.map((carrier) => (
                                                <Option key={carrier.id} value={carrier.id}>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <img
                                                            src={carrier.logo} // Carrier's logo
                                                            alt={carrier.name}
                                                            style={{
                                                                width: 20,
                                                                height: 20,
                                                                marginRight: 8,
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                        {carrier.name}
                                                    </div>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            const carrierId = form.getFieldValue("carrier_id");
                                            if (carrierId) {
                                                assignCarrier(carrierId);
                                                console.log("Assigning carrier:", carrierId);
                                            } else {
                                                console.log("Please select a carrier first.");
                                            }
                                        }}
                                        style={{ marginBottom: 16 }}
                                        block
                                    >
                                        Assign Carrier
                                    </Button>

                                    <div className="mb-3">
                                        <Typography.Title level={4}>Vendor Details</Typography.Title>
                                        <p className="m-0"><strong>Vendor Name:</strong> {selectedOrder.vendorName || "N/A"}</p>
                                        <p className="m-0"><strong>Phone Number:</strong> {selectedOrder.vendor_number || "N/A"}</p>
                                        {/* <p className="m-0"><strong>Account Number:</strong> {selectedOrder.acc_number || "N/A"}</p> */}

                                    </div>
                                    <Typography.Title level={5}>Order Status</Typography.Title>
                                    <p className="m-0"><strong>Status:</strong> <OrderStatus stat={selectedOrder.status} /></p>
                                    <p className="m-0"><strong>Payment Status:</strong> <PaymentStatus stat={selectedOrder.payment_status} /></p>
                                    <p className="m-0"><strong>Vendor Funded:</strong> <VendorFundedStatus stat={selectedOrder.vendor_funded} /></p>
                                    <div className="d-flex justify-content-end mt-2 gap-2">
                                        {
                                            live && (
                                                <>
                                                    <Select
                                                        defaultValue={selectedOrder.status}
                                                        style={{ width: 200 }}
                                                        value={targetStatus}
                                                        onChange={handleStatusChange}
                                                        options={statusOptions.map(({ label, value, icon }) => ({
                                                            label: <>{icon} {label}</>,
                                                            value
                                                        }))}
                                                    />
                                                    <Button onClick={setOrderStatus} color="danger" style={{ width: "fit-content" }} >
                                                        Change Order Status
                                                    </Button>
                                                </>
                                            )
                                        }
                                    </div>

                                </Form>
                            </>



                        </Col>
                    </Row>
                )}
            </Modal>



        </Layout>
    )
}








