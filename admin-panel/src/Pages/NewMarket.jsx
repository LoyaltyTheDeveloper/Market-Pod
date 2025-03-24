import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Button, Form, Input, Typography, Upload, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { ShopFilled, UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import apis from "../utils/apis";

export default function NewMarket() {
    const { myReq } = useContext(MainContext);
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (info) => {
        console.log("Shoo Change")
        if (info.file.status === 'removed') {
            // Clear preview and form data on remove
            setImagePreview(null);
            setFormData({ ...formData, image: null });
            return;
        }

        if (info.file.status === 'uploading') return;

        if (info.file.originFileObj || info.file) {
            const file = info.file.originFileObj || info.file;
            console.log("Img Seen")
            setFormData({ ...formData, image: file });

            // Create image preview
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            console.log("Didn't seee");
        }
    };

    const getData = async (id) => {
        setLoading(true);
        try {
            const res = await myReq(`${apis.getMarket}${id}`, {}, false);
            if (res && res.data) {
                const data = res.data;
                data.image && setImagePreview(data.image);
                setFormData(prev => ({
                    ...prev,
                    address: data.addr,
                    name: data.name
                }));
            } else {
                throw new Error("Failed");
            }
        } catch (err) {
            message.error("Failed to load market data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(
        () => {
            if (id) {
                getData(id);
            }
        }, [id]
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        // Handle sending data to the server here
        const data = new FormData();
        data.append("name", formData.name);
        data.append("addr", formData.address);
        data.append("image", formData.image);
        setLoading(true);

        try {
            const response = await myReq(id ? `${apis.editMarket}${id}` : apis.addMarket, data);

            if (response.status) {
                message.success(`Market "${formData.name} " successfully ${id ? 'Updated' : 'created'}`);
            } else {
                message.error(response.message);
            }
        } catch (err) {
            console.log(err);
            message.error("Error");
        } finally {
            setLoading(false)
        }
    };

    return (
        <Layout isLoading={isLoading}>
            <Header Buttons={() => <BackButton />} />
            <div className="mb-3 py-2">
                <Typography.Title level={5}>
                    {id ? `Edit market ${id}` : "New Market"}
                </Typography.Title>
            </div>
            <div className="functionBox w-75 p-3">
                {/* Display selected image preview */}
                <div className="mb-3">
                    <div className="imageBox skeleton-load">
                        {imagePreview && <img src={imagePreview} alt="Market" />}
                    </div>
                </div>
                <div className="mb-3">
                    <Upload
                        maxCount={1}
                        beforeUpload={(e) => false} // Prevent automatic upload
                        onChange={handleImageChange}
                        onRemove={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, image: null });
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Market Image</Button>
                    </Upload>
                </div>
                <div className="mb-3">
                    <Form.Item rules={[{ required: true, message: 'Please input the market name!' }]}>
                        <Input
                            className="antInput"
                            prefix={<ShopFilled />}
                            placeholder="Market Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                </div>
                <div className="mb-3">
                    <Form.Item rules={[{ required: true, message: 'Please input the address!' }]}>
                        <Input
                            className="antInput"
                            prefix={<FontAwesomeIcon icon={faLocationPin} />}
                            placeholder="Address..."
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                </div>
                <div className="mb-3">
                    <div className="w-100 btn btn-project" onClick={handleSubmit}>
                        {id ? "Update Market" : "Add Market"}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
