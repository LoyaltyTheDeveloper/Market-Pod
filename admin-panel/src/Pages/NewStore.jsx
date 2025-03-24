import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Button, Form, TimePicker, Input, Typography, Upload, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { BankOutlined, CreditCardOutlined, PhoneFilled, ShopFilled, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import apis from "../utils/apis";
import dayjs from "dayjs";
import LayoutButton from "../components/LayoutButton";

export default function NewStore() {
    const { myReq } = useContext(MainContext);
    const [isLoading, setLoading] = useState(false);
    const { marketId, id } = useParams();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        addr: '',
        vendor: '',
        categories: [],
        openTime: '06:00',
        closeTime: '17:30',
        image: null,
        bank_name:'',
        acc_number:'',
        vendor_number:''
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = async () => {
        // Handle sending data to the server here
        const data = new FormData();
        data.append("name", formData.name);
        data.append("addr", formData.addr);
        data.append("image", formData.image);
        data.append("vendorName", formData.vendor);
        data.append("marketId", marketId);
        data.append("categories", JSON.stringify(categories.filter(x => { return x.status }).map(x => x.id)));
        data.append("openTime", formData.openTime);
        data.append("closeTime", formData.closeTime);
        data.append("bank_name", formData.bank_name);
        data.append("acc_number", formData.acc_number);
        data.append("vendor_number", formData.vendor_number);

        setLoading(true);

        try {
            const response = await myReq(id ? `${apis.editStore}${id}` : apis.addStore, data, true);

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

    // useEffect(()=>)

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
            const categoriesRes = await myReq(apis.getCategories, {}, false);
            if (categoriesRes && categoriesRes.categories) {
                setCategories(categoriesRes.categories);
                if (id) {
                    const res = await myReq(`${apis.getStore}${id}`, {}, false);
                    if (res && res.data) {
                        const data = res.data;
                        data.image && setImagePreview(data.image);
                        setFormData(prev => ({
                            ...prev,
                            addr: data.addr,
                            name: data.name,
                            categories: Array.isArray(data.cats) ? data.cats.map(x => (Number(x))) : [],
                            vendor: data.vendorName,
                            openTime: data['open_time'],
                            closeTime: data['close_time'],
                            bank_name:data.bank_name,
                            acc_number:data.acc_number,
                            vendor_number:data.vendor_number
                        }));
                        setCategories(prev => (
                            prev.map(x => {
                                return data.cats.includes(String(x.id)) ? { ...x, status: true } : x
                            })
                        ))
                    } else {
                        throw new Error("Failed");
                    }
                }
            }
        } catch (err) {
            message.error("Failed to load market data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(
        () => {
            console.log('MarktId ', marketId);
            getData(id);
        }, [id]
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInput = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const format = 'HH:mm';
    return (
        <Layout isLoading={isLoading}>
            <Header Buttons={() => <BackButton />} />
            <div className="mb-3 py-2">
                <Typography.Title level={5} >
                    {id ? `Edit Store ${id}` : "New Store"}
                </Typography.Title>
            </div>
            <div className="w-100 gap-4 d-flex m-0 p-0">
                <div className="functionBox w-75 p-3">
                    {/* Display selected image preview */}
                    <div className="mb-3">
                        <div className="imageBox skeleton-load">
                            {imagePreview && <img src={imagePreview} alt="Store" />}
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
                            <Button icon={<UploadOutlined />}>Store Image</Button>
                        </Upload>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please input the store name!' }]}>
                            <Input
                                className="antInput"
                                prefix={<ShopFilled />}
                                placeholder="Store Name"
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
                                name="addr"
                                value={formData.addr}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please input Vendor name!' }]}>
                            <Input
                                className="antInput"
                                prefix={<UserOutlined />}
                                placeholder="John Doe..."
                                name="vendor"
                                value={formData.vendor}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="mb-3">
                        <Form.Item rules={[{ required: true, message: 'Please input Vendor name!' }]}>
                            <Input
                                className="antInput"
                                prefix={<PhoneFilled />}
                                placeholder="08133121212"
                                name="vendor_number"
                                value={formData.vendor_number}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="w-50">
                            <Form.Item rules={[{ required: true, message: 'Please input bank name!' }]}>
                                <Input
                                    className="antInput"
                                    prefix={<BankOutlined />}
                                    placeholder="Bank Name"
                                    name="bank_name"
                                    value={formData.bank_name}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="w-50">
                            <Form.Item rules={[{ required: true, message: 'Please input account number!' }]}>
                                <Input
                                    className="antInput"
                                    prefix={<CreditCardOutlined />}
                                    placeholder="Account Number"
                                    name="acc_number"
                                    value={formData.acc_number}
                                    onChange={handleInputChange}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    {/* open and close time */}
                    <div className="mb-3">
                        <div className="w-100 d-flex p-0 m-0 gap-2">
                            <div className="w-50">
                                <label className="px-3 mb-1" style={{ fontSize: 11 }}>
                                    Open Time
                                </label>
                                <Form.Item rules={[{ required: true, message: 'Please input the address!' }]}>
                                    <TimePicker suffixIcon={<FontAwesomeIcon icon={faClock} />} className="antInput w-100" name="openTime" onChange={(e) => { handleInput('openTime', [e.hour(), ':', e.minute()].join('')) }} defaultValue={dayjs(formData.openTime, format)} format={format} />
                                    {/* <Input
                                    className="antInput"
                                    prefix={}
                                    placeholder="Open Time..."
                                    name="openTime"
                                    value={formData.openTime }
                                    onChange={handleInputChange}
                                /> */}
                                </Form.Item>
                            </div>
                            <div className="w-50">
                                <label className="px-3 mb-1" style={{ fontSize: 11 }}>
                                    Close Time
                                </label>
                                <Form.Item rules={[{ required: true, message: 'Please input the address!' }]}>
                                    <TimePicker suffixIcon={<FontAwesomeIcon icon={faClock} />} className="antInput w-100" name="closeTime" onChange={(e) => { handleInput('closeTime', [e.hour(), ':', e.minute()].join('')) }} defaultValue={dayjs(formData.closeTime, format)} format={format} />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="functionBox w-75 p-3">
                    {/* Display selected image preview */}
                    <Typography.Title level={5}>Select categories</Typography.Title>
                    <div className="d-flex mb-2 justify-content-center gap-3 flex-wrap py-2">
                        {
                            categories.map((x, ind) => {
                                return <LayoutButton fill={x.status}
                                    onClick={() => {
                                        setCategories(
                                            prev => prev.map(ix => ix.id == x.id ? { ...ix, status: !ix.status } : ix
                                            )
                                        )
                                    }}
                                    type={"success"} text={x.name} key={ind} />
                            })
                        }
                    </div>
                    {/* open and close time */}
                    <div className="mb-3">
                        <div className="w-100 btn btn-project" onClick={handleSubmit}>
                            {id ? "Update Store" : "Add Store"}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
