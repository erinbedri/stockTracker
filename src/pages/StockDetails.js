import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import finnHub from "../apis/finnHub";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: data.c[index].toFixed(2),
        };
    });
};

export default function StockDetails() {
    const { symbol } = useParams();
    const [chartData, setChartData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime() / 1000);
            let oneDay;
            const oneWeek = currentTime - 604800;
            const oneYear = currentTime - 31556926;

            if (date.getDay() === 6) {
                oneDay = currentTime - 2 * 24 * 60 * 60;
            } else if (date.getDay() === 0) {
                oneDay = currentTime - 3 * 24 * 60 * 60;
            } else {
                oneDay = currentTime - 24 * 60 * 60;
            }

            try {
                const responses = await Promise.all([
                    finnHub.get("stock/candle", {
                        params: {
                            symbol,
                            from: oneDay,
                            to: currentTime,
                            resolution: 15,
                        },
                    }),
                    finnHub.get("stock/candle", {
                        params: {
                            symbol,
                            from: oneWeek,
                            to: currentTime,
                            resolution: 60,
                        },
                    }),
                    finnHub.get("stock/candle", {
                        params: {
                            symbol,
                            from: oneYear,
                            to: currentTime,
                            resolution: "W",
                        },
                    }),
                ]);
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data),
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [symbol]);

    return (
        <>
            {loading && (
                <div className="m-5 d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div
                        className="spinner-grow text-primary ms-auto"
                        style={{ width: "3rem", height: "3rem" }}
                        role="status"
                        aria-hidden="true"
                    ></div>
                </div>
            )}

            <div>{chartData && <StockChart chartData={chartData} symbol={symbol} />}</div>

            <StockData symbol={symbol} />
        </>
    );
}
