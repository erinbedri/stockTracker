import React, { useEffect, useState } from "react";

import finnHub from "../apis/finnHub";

export default function StockTable() {
    const [stockList, setStockList] = useState(["GOOGL", "MSFT", "AMZN", "INTL"]);
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        stockList.map((stock) => {
            finnHub
                .get("/quote", {
                    params: {
                        symbol: stock,
                    },
                })
                .then((res) => {
                    setStockData((prevState) => {
                        return [
                            ...prevState,
                            {
                                data: res.data,
                                symbol: res.config.params.symbol,
                            },
                        ];
                    });
                });
        });
    }, []);

    return <div>Table</div>;
}
