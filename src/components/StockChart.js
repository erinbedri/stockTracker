import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function StockChart({ chartData, symbol }) {
    const [dateFormat, setDateFormat] = useState("24h");
    const { day, week, year } = chartData;
    console.log(chartData);

    const options = {
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px",
            },
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300,
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false,
            },
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM",
            },
        },
    };

    const determineTimeFormat = () => {
        switch (dateFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    };

    const series = [
        {
            name: symbol,
            data: determineTimeFormat(),
        },
    ];

    return (
        <>
            <div className="mt-5 p-4 shadow-sm bg-white">
                <Chart options={options} series={series} type="area" width="100%" height="500px" />
            </div>

            <div>
                <button type="button" className="btn btn-primary" onClick={() => setDateFormat("24h")}>
                    24h
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setDateFormat("7d")}>
                    7d
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setDateFormat("1y")}>
                    1y
                </button>
            </div>
        </>
    );
}
