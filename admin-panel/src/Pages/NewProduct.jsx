import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Button, Form, Input, Typography, Upload, message, Select, Descriptions, Switch } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import apis from "../utils/apis";

const { Option } = Select;

export default function NewProduct() {
    const { myReq } = useContext(MainContext);
    const [isLoading, setLoading] = useState(false);
    const { storeId, id } = useParams();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        subTitle: '',
        weight: '',
        price: '',
        image: null,
        category: null,
        description: '',
        unit: 'Kg',
        status:false
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = async () => {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("subTitle", formData.subTitle);
        data.append("weight", formData.weight);
        data.append("price", formData.price);
        data.append("image", formData.image);
        data.append("category", formData.category);
        data.append("storeId", storeId);
        data.append("description", formData.description);
        data.append("unit", formData.unit);

        if(id)
            data.append("status",Number(formData.status));

        setLoading(true);

        try {
            const response = await myReq(id ? `${apis.editProduct}${id}` : apis.addProduct, data, true);

            if (response.status) {
                message.success(`Product "${formData.name}" successfully ${id ? 'updated' : 'created'}`);
            } else {
                message.error(response.message);
            }
        } catch (err) {
            console.log(err);
            message.error("Error");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'removed') {
            setImagePreview(null);
            setFormData({ ...formData, image: null });
            return;
        }

        if (info.file.status === 'uploading') return;

        if (info.file.originFileObj || info.file) {
            const file = info.file.originFileObj || info.file;
            setFormData({ ...formData, image: file });

            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUnitChange = (unit) => {
        setFormData({ ...formData, unit: unit });
    }

    const getCategories = async () => {
        setLoading(true);
        try {
            const res = await myReq(apis.getCategories + "?storeId=" + storeId, {}, false);
            if (res && res.categories) {
                setCategories(res.categories);
                if (id) {
                    const proRequest = await myReq(apis.getProduct + id, {}, false);
                    if (proRequest && proRequest.data) {
                        const proData = proRequest.data;
                        setImagePreview(proData.image);
                        setFormData(prev => ({
                            ...prev,
                            subTitle: proData.subtitle,
                            ...proData,
                            image: null,
                            category: proData.category_id,
                            status:Boolean(proData.status)
                        }));
                    }
                }
            }
        } catch (err) {
            message.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleToogle = (val) => {
        setFormData({ ...formData, status: val });
    };

    return (
        <Layout isLoading={isLoading}>
            <Header Buttons={() => <BackButton />} />
            <div className="mb-3 py-2">
                <Typography.Title level={5}>
                    {id ? `Edit Product ${id}` : "New Product"}
                </Typography.Title>
            </div>
            <div className="w-100 d-flex gap-2">
                <div className="functionBox w-75 p-3">
                    <div className="mb-3">
                        <Typography.Title level={4}>Product Details</Typography.Title>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please input the product name!' }]}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="antInput"
                            />
                        </Form.Item>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please input the product subtitle!' }]}>
                            <Input
                                placeholder="Product Subtitle"
                                name="subTitle"
                                value={formData.subTitle}
                                onChange={handleInputChange}
                                className="antInput"
                            />
                        </Form.Item>
                    </div>
                    <div className="mb-3 d-flex align-items-center gap-1">
                        <div className="w-75">
                            <Form.Item rules={[{ required: true, message: 'Please input the weight!' }]}>
                                <Input
                                    placeholder="Weight (e.g., 500g)"
                                    name="weight"
                                    value={formData.weight}
                                    type="number"
                                    step={0.5}
                                    onChange={handleInputChange}
                                    className="antInput"
                                />
                            </Form.Item>
                        </div>
                        <div >
                            <Form.Item>
                                <Select
                                    value={formData.unit}
                                    onChange={handleUnitChange}
                                  
                                >
                                    <Option value="Kg">Kg</Option>
                                    <Option value="g">g</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please input the price!' }]}>
                            <Input.TextArea
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 5
                                }}
                                placeholder="Description"
                                className="antInput"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please input the price!' }]}>
                            <Input
                                te
                                placeholder="Price"
                                className="antInput"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="mb-3">
                        <div className="w-100 btn btn-project" onClick={handleSubmit}>
                            {id ? "Update Product" : "Add Product"}
                        </div>
                    </div>
                </div>
                <div className="functionBox w-75 p-3">
                    {
                        id ? <>
                        <div className="mb-2 d-flex justify-content-end">
                            <Switch checked={formData.status} onChange={handleToogle}/>
                        </div>
                        </>:<></>
                    }
                    <div className="mb-3">
                        <div className="imageBox skeleton-load">
                            {imagePreview && <img src={imagePreview} alt="Product" />}
                        </div>
                    </div>
                    <div className="mb-3">
                        <Upload
                            maxCount={1}
                            beforeUpload={(e) => false}
                            onChange={handleImageChange}
                            onRemove={() => {
                                setImagePreview(null);
                                setFormData({ ...formData, image: null });
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Product Image</Button>
                        </Upload>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please select a category!' }]}>
                            <Select
                                placeholder="Select Category"
                                // className="antInput"
                                // style={{height:"70px",borderRadius:20}}
                                value={formData.category}
                                onChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                {categories.map((category) => (
                                    <Select.Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
