import { message, Button, Avatar, Select, Form, Modal, Input, Spin } from "antd";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { Row, Col, Card } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import apis from "../utils/apis";
import { MainContext } from "../contexts/MainContext";

const { Option } = Select;

export default () => {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const { myReq } = useContext(MainContext);

    const [isModalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();

    const createAdmin = async (values) => {
        setLoading(true);
        try {
            const response = await myReq(apis.addAdmins, values, true);
            if (response.status) {
                message.success("Admin created successfully.");
                fetchAdmins(); // Refresh the admin list
                setModalOpen(false);
                form.resetFields(); // Clear form fields
            } else {
                // console.log(response);
                message.error(response.message);
            }
        } catch (error) {
            console.error(error);
            message.error("Error creating admin.");
        } finally {
            setLoading(false);
        }
    };




    // Fetch all admins
    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const data = await myReq(apis.getAdmins, {}, false);
            if (data.admins && Array.isArray(data.admins)) {
                setAdmins(data.admins);
            } else {
                if (data.message) {
                    message.error(data.message)
                } else {
                    throw new Error("Failed to fetch admins.");
                }

            }
        } catch (error) {
            console.error(error);
            message.error("Error loading admin data.");
        } finally {
            setLoading(false);
        }
    };

    // Deactivate an admin account
    const deactivateAdmin = async (adminId,status) => {
        try {
            const response = await myReq(`${apis.updateAdmin}`, {adminId,status});
            if (response.status) {
                message.success(response.message);
                fetchAdmins(); // Refresh the admin list
            } else {
                if(response.message)
                    return message.error(response.message);
                throw new Error(response.message || "Failed to deactivate admin.");
            }
        } catch (error) {
            console.error(error);
            message.error("Error deactivating admin.");
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <>
            <Layout isLoading={isLoading}>
                <Header title="Admin Profiles" />
                <div className="py-1">
                    <Button type="primary" onClick={() => setModalOpen(true)}>
                        Add New Admin
                    </Button>
                </div>
                <div className="row m-0 p-0 w-100 mt-2">
                    <div className="col-md-12 col-lg-10 col-12 p-0">
                        <Row className="m-0 p-0">
                            {admins.map((admin, index) => (
                                <Col
                                    key={index}
                                    md={8}
                                    lg={6}
                                    xl={4}
                                    sm={6}
                                    xs={12}
                                    className="mb-3"
                                >
                                    <Card className="shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex align-items-center mb-3">
                                                <Avatar
                                                    size={64}
                                                    style={{ backgroundColor: "#1890ff" }}
                                                >
                                                    {admin.firstName[0]}
                                                    {admin.lastName[0]}
                                                </Avatar>
                                                <div className="ms-3">
                                                    <Card.Title className="mb-0">
                                                        {admin.firstName} {admin.lastName}
                                                    </Card.Title>
                                                    <Card.Subtitle className="text-muted">
                                                        {admin.email}
                                                    </Card.Subtitle>
                                                </div>
                                            </div>
                                            <Card.Text>
                                                <strong>Role:</strong> {admin.role} <br />
                                                {/* <strong>Region:</strong> {admin.region_id} <br /> */}
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    className={
                                                        admin.status === 1
                                                            ? "text-success"
                                                            : "text-danger"
                                                    }
                                                >
                                                    {admin.status === 1 ? "Active" : "Inactive"}
                                                </span>
                                            </Card.Text>
                                            <Button
                                                type="primary"
                                                className={admin.status === 1 ? "bg-danger":"bg-success text-white"}
                                                // disabled={admin.status === 0}
                                                onClick={() => deactivateAdmin(admin.id,(admin.status === 1 ? 0:1))}
                                            >
                                               {admin.status === 1 ? "Deactivate":"Activate"} 
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </Layout>
            <Modal
                title="Create New Admin"
                visible={isModalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={createAdmin}
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: "Please enter the first name" }]}
                    >
                        <Input placeholder="Enter first name" />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please enter the last name" }]}
                    >
                        <Input placeholder="Enter last name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter the email" },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="pswd"
                        rules={[{ required: true, message: "Please enter a password" }]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: "Please select a role" }]}
                    >
                        <Select placeholder="Select role">
                            <Option value="Admin">Admin</Option>
                            <Option value="SUPER_ADMIN">SuperAdmin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block disabled={isLoading && isModalOpen}>
                            Create Admin
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
