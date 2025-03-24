import LayoutButton from "./LayoutButton";
import { useNavigate } from "react-router-dom";

export  default function BackButton(){
    const nav = useNavigate();
    return (
        <LayoutButton fill={true} text={"Back"} onClick={()=>{nav(-1)}}/>
    )
}