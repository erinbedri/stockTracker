import React, { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const formatMarketCap = (number) => {
    if (number > 1000000) return (number / 1000000).toFixed(2).toLocaleString("en-US") + "T";
    else if (number > 1000) return (number / 1000).toFixed(2).toLocaleString("en-US") + "B";
    else return number.toFixed(2).toLocaleString("en-US") + "M";
};

const formatSharesOut = (number) => {
    if (number > 1000000) return (number / 1000).toFixed(2).toLocaleString("en-US") + "T";
    else if (number > 1000) return (number / 1000).toFixed(2).toLocaleString("en-US") + "B";
    else return number.toFixed(2).toLocaleString("en-US") + "M";
};

export default function StockData({ symbol }) {
    const [stockData, setStockData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    finnHub.get("stock/metric", {
                        params: {
                            symbol,
                            metric: "all",
                        },
                    }),
                    finnHub.get("stock/profile2/", {
                        params: {
                            symbol: symbol,
                        },
                    }),
                ]);
                setStockData({
                    basics: responses[0].data.metric,
                    data: responses[1].data,
                });
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
                        <img src={stockData.data.logo} style={{ width: "100px" }} alt="logo" />
                        <div className="col">
                            <div>
                                <span className="fw-bold">Name: </span>
                                {stockData.data.name}
                            </div>
                            <div>
                                <span className="fw-bold">Country: </span>
                                {stockData.data.country}
                            </div>
                            <div>
                                <span className="fw-bold">Industry: </span>
                                {stockData.data.finnhubIndustry}
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <span className="fw-bold">IPO: </span>
                                {stockData.data.ipo}
                            </div>
                            <div>
                                <span className="fw-bold">Exchange: </span>
                                {stockData.data.exchange}
                            </div>
                            <div>
                                <span className="fw-bold">Currency: </span>
                                {stockData.data.currency}
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <span className="fw-bold">Market Cap: </span>$
                                {formatMarketCap(stockData.data.marketCapitalization)}
                            </div>
                            <div>
                                <span className="fw-bold">Shares Outstanding: </span>
                                {formatSharesOut(stockData.data.shareOutstanding)}
                            </div>
                        </div>

                        <div className="row mt-5 mb-5">
                            <h4 className="fw-bold">Statistics</h4>
                            <div className="col">
                                <div>
                                    <span className="fw-bold">Beta: </span>
                                    {stockData.basics.beta.toFixed(2)}
                                </div>
                                <div>
                                    <span className="fw-bold">52 Weeek High: </span>$
                                    {stockData.basics["52WeekHigh"].toFixed(2)}
                                </div>
                                <div>
                                    <span className="fw-bold">52 Weeek High Date: </span>
                                    {stockData.basics["52WeekHighDate"]}
                                </div>
                                <div>
                                    <span className="fw-bold">52 Weeek Low: </span>$
                                    {stockData.basics["52WeekLow"].toFixed(2)}
                                </div>
                                <div>
                                    <span className="fw-bold">52 Weeek Low Date: </span>
                                    {stockData.basics["52WeekLowDate"]}
                                </div>
                                <div>
                                    <span className="fw-bold">Current Divident Yield (ttm): </span>
                                    {stockData.basics.currentDividendYieldTTM
                                        ? `${stockData.basics.currentDividendYieldTTM.toFixed(2)}%`
                                        : "NA"}
                                </div>
                                <div>
                                    <span className="fw-bold">Divident per Share (ttm): </span>
                                    {stockData.basics.dividendsPerShareTTM
                                        ? `$${stockData.basics.dividendsPerShareTTM.toFixed(2)}`
                                        : "NA"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
