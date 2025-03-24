import LayoutButton from "../LayoutButton";


export default function OrderRows({ id, full_name, email, carrier_logo, carrier_name, address, location_name, state, city, data, onClick, hidden }) {

    function View() {
        onClick(data);
    }

    return (
        <>
            {
                !hidden ? <tr>
                    <td>
                        <div>
                            <strong>{id}</strong>
                        </div>
                    </td>
                    <td>
                        <div><strong>
                            {full_name}
                        </strong></div>
                    </td>
                    <td>
                        <div>
                            {address} {location_name} , {state} , {city}
                        </div>
                    </td>
                    <td>
                        <div className="w-100 d-flex gap-2">
                            {
                                carrier_name ? <>
                                    <img src={carrier_logo} alt={"err"} className="tabelLogo" />
                                    <div>
                                        <strong>{carrier_name}</strong>
                                    </div>
                                </> : <>
                                    N/A
                                </>
                            }

                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="w-100 h-100 d-fle justify-content-centr">
                                <LayoutButton onClick={View} text={"View"} type={"success"}></LayoutButton>
                            </div>
                        </div>
                    </td>
                </tr> : <></>
            }
        </>
    )
}