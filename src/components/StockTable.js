import React, { useEffect, useState } from "react";

import finnHub from "../apis/finnHub";

export default function StockTable() {
    const [stockList, setStockList] = useState(["GOOGL", "MSFT", "AMZN", "INTL"]);
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    stockList.map((stock) => {
                        return finnHub.get("/quote", {
                            params: {
                                symbol: stock,
                            },
                        });
                    })
                );

                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol,
                    };
                });
                setStockData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">STOCK</th>
                        <th scope="col">Current price</th>
                        <th scope="col">Change</th>
                        <th scope="col">Percent change</th>
                        <th scope="col">High price of the day</th>
                        <th scope="col">Low price of the day</th>
                        <th scope="col">Open price of the day</th>
                        <th scope="col">Previous close price</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((stock, index) => {
                        return (
                            <tr key={stock.symbol}>
                                <th scope="row">{index + 1}</th>
                                <td>{stock.symbol}</td>
                                <td>{stock.data.c}</td>
                                <td>{stock.data.d}</td>
                                <td>{stock.data.dp}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td>{stock.data.pc}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
