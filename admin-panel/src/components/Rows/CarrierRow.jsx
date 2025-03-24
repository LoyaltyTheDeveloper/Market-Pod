export default function CarrierRow({ carrier_id, carrier_name, carrier_logo, order_count }) {
    return (
        <tr>
            <td>
                <div>
                    <strong>MP-CAR-{carrier_id}</strong>
                </div>
            </td>
            <td>
                <div className="w-100 d-flex gap-2">
                    <img src={carrier_logo} alt={"err"} className="tabelLogo" />
                    <div>
                        <strong>{carrier_name}</strong>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <span className="text-success">Active</span>
                </div>
            </td>
            <td>
            <div>
                        <strong>{order_count}</strong>
                    </div>
            </td>
        </tr>
    )
}