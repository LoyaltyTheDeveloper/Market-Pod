import { useNavigate } from "react-router-dom";
import LayoutButton from "../LayoutButton";

export default function ProductRows({ image,name,weight,id, status, price,subtitle,store_id,unit}) {
    const nav = useNavigate();
    function View(){
        nav(`/new-product/${store_id}/${id}`);
    }
    return (
        <tr>
            <td>
                <div className="w-100 d-flex gap-2">
                    <img src={image} alt={"err"} className="tabelLogo" />
                    <div>
                        <strong>{name}</strong>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <strong>{subtitle}</strong>
                </div>
            </td>
            <td>
                <div>
                    <strong>{weight} {weight && unit}</strong>
                </div>
            </td>
            <td>
                <div>
                    <strong>&#8358;{price}</strong>
                </div>
            </td>
            <td>
                <div>
                    <strong>{
                        status ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>
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