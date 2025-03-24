import { useNavigate } from "react-router-dom";
import LayoutButton from "../LayoutButton";

export default function StoreRows({ img, store, vendor, id, stat, addr,toogle}) {
    const nav = useNavigate();
    function View(){
        nav(`/store/${id}/${store}`);
    }
    return (
        <tr>
            <td>
                <div className="w-100 d-flex gap-2">
                    <img src={img} alt={"err"} className="tabelLogo" />
                    <div>
                        <strong>{store}</strong>
                    </div>
                </div>
            </td>
            <td>
                <div>{addr}</div>
            </td>
            <td>
                <div>
                    <strong>{vendor}</strong>
                </div>
            </td>
            <td>
                <div>
                    <strong style={{cursor:"pointer"}} onClick={()=>{toogle(id,!stat)}}>{
                        stat ? <span className="text-success">Opened</span> : <span className="text-danger">Closed</span>
                    }</strong>
                </div>
            </td>
            <td>
                <div>
                    <div className="w-100 h-100 d-fle justify-content-centr">
                       <LayoutButton onClick={View} text={"View"} type={"success"}></LayoutButton>
                    </div>
                </div>
            </td>
        </tr>
    )
}