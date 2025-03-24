export default function SideLink({children,text}){
    return(
        <div className="w-100">
            <div className={`side-active py-3 d-flex gap-2 align-items-center `} style={{paddingLeft:30}}>
                {children}
                <span className="sideText">{text}</span>
            </div>
        </div>
    )
}