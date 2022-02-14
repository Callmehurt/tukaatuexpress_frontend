import React from "react";
import DeliveryItemCard from "./DeliveryItemCard";
import Tabs from "react-bootstrap/Tabs";

const PaymentReceivedDeliveries = (props) => {
    const deliveries = props.deliveries;
    return (
        <>
            <DeliveryItemCard deliveries={deliveries} />
        </>
    )
}

export default PaymentReceivedDeliveries;