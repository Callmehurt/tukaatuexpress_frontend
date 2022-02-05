import React from "react";
import DeliveryItemCard from "./DeliveryItemCard";

const PaymentReceivedDeliveries = (props) => {
    const deliveries = props.deliveries;
    return (
        <>
            {
                Object.keys(deliveries).length === 0 ? (
                    <>No Recors</>
                ): (
                    <DeliveryItemCard deliveries={deliveries} />
                )
            }
        </>
    )
}

export default PaymentReceivedDeliveries;