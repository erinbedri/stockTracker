import React, { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const formatMarketCap = (number) => {
    if (number > 1000000) return Math.floor(number / 1000).toLocaleString("en-US") + "T";
    else if (number > 100000) return Math.floor(number / 1000).toLocaleString("en-US") + "B";
    else return Math.floor(number / 1000).toLocaleString("en-US") + "M";
};

const formatSharesOut = (number) => {
    if (number > 100000) return Math.floor(number).toLocaleString("en-US") + "T";
    else if (number > 1000) return Math.floor(number).toLocaleString("en-US") + "B";
    else return Math.floor(number).toLocaleString("en-US") + "M";
};

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
                <div className="p-4 shadow-sm bg-white">
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
                                {formatMarketCap(stockData.marketCapitalization)}
                            </div>
                            <div>
                                <span className="fw-bold">Shares Outstanding: </span>
                                {formatSharesOut(stockData.shareOutstanding)}
                            </div>
                            <div>
                                <span className="fw-bold">Homepage: </span>
                                {stockData.weburl}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
