import { useNavigate } from "react-router-dom";
import LayoutButton from "../LayoutButton";
import { UserOutlined } from "@ant-design/icons";

export default function UsersRows({ img, email, id, stat, first_name, last_name, phone }) {
    const nav = useNavigate();
    function View() {
        nav(`/store/${id}/${store}`);
    }
    function getStatus(stat){
        switch(stat){
            case 0:
                return <span className="text-warning">Unverified</span>
            break;
            case 1:
                return <span className="text-success">Active</span>
            break;
            case 2:
                return <span className="text-danger">Suspended</span>
            break;
            default:
                return <span className="text-danger">- - -</span>
            break;
        }
    }
    function getActionButton(stat){
        switch(stat){
            case 0:
                return <span className="text-warning">- - -</span>
            break;
            case 1:
                return <LayoutButton onClick={View} text={"Suspend"} ></LayoutButton>
            break;
            case 2:
                return <LayoutButton onClick={View} text={"Unsuspend"} type={"success"}></LayoutButton>
            break;
            default:
                return <span className="text-danger">- - -</span>
            break;
        }
    }
    return (
        <tr>
            <td>
                <div className="w-100 d-flex gap-1 align-items-center">
                    <UserOutlined style={{fontSize:24}}/>
                    <div>
                        <strong>{email}</strong>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <strong>
                        {last_name} {first_name}
                    </strong>
                </div>
            </td>
            <td>
                <div>
                    <strong>{phone}</strong>
                </div>
            </td>
            <td>
                <div>
                    <strong>{
                        getStatus(stat)
                    }</strong>
                </div>
            </td>
            {/* <td>
                <div>
                    <div className="w-100 h-100 d-fle justify-content-centr">
                        {getActionButton(stat)}
                    </div>
                </div>
            </td> */}
        </tr>
    )
}