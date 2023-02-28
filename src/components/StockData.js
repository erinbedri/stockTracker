import React, { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export default function StockData({ symbol }) {
    const [stockData, setStockData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("stock/profile2/", {
                    params: {
                        symbol: symbol,
                    },
                });
                console.log(response.data);
                setStockData(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {stockData && (
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <img src={stockData.logo} style={{ width: "100px" }} />
                            <div className="col">
                                <div>
                                    <span className="fw-bold">Name: </span>
                                    {stockData.name}
                                </div>
                                <div>
                                    <span className="fw-bold">Country: </span>
                                    {stockData.country}
                                </div>
                                <div>
                                    <span className="fw-bold">Industry: </span>
                                    {stockData.finnhubIndustry}
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <span className="fw-bold">IPO: </span>
                                    {stockData.ipo}
                                </div>
                                <div>
                                    <span className="fw-bold">Exchange: </span>
                                    {stockData.exchange}
                                </div>
                                <div>
                                    <span className="fw-bold">Currency: </span>
                                    {stockData.currency}
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <span className="fw-bold">Market Cap: </span>
                                    {Math.floor(stockData.marketCapitalization) / 1000 + "B"}
                                </div>
                                <div>
                                    <span className="fw-bold">Shares Outstanding: </span>
                                    {stockData.shareOutstanding / 1000 + "M"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
