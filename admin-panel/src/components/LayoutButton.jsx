export default function LayoutButton({type,text,onClick,children,fill}){
    return(
        <div onClick={onClick} className={`px-4 m-0 layoutButton py-1 ${type=="success" ? "success":"danger"} ${fill && "fill"}`}>
            {text} {children}
        </div>
    )
}