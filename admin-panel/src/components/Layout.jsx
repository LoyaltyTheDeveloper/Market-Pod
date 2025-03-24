import { Spin } from "antd";

export default function Layout({ children, isLoading }) {
    return (
        <div className="w-100 layout px-2 overflow-auto" style={{height:"100vh"}}>
            {
                isLoading && <div className="layoutLoad d-flex justify-content-center align-items-center">
                    <Spin size="large"></Spin>
                </div>
            }
            {children}
        </div>
    )
}