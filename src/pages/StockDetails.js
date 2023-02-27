import React from "react";
import { useParams } from "react-router-dom";

export default function StockDetails() {
    const { symbol } = useParams();

    return <div>Stock {symbol}</div>;
}
