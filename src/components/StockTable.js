import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

import finnHub from "../apis/finnHub";
import StockSearch from "./StockSearch";
import { WatchListContext } from "../context/WatchListContext";

export default function StockTable() {
    const [stockData, setStockData] = useState([]);
    const { watchList, deleteStock } = useContext(WatchListContext);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const changeColor = (percentage) => {
        return percentage > 0 ? "success" : "danger";
    };

    const changeIcon = (percentage) => {
        return percentage > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
    };

    const onRemove = (e, stock) => {
        e.stopPropagation();

        const response = window.confirm("Are you sure you want to delete this stock from your list?");
        if (response) {
            deleteStock(stock.symbol);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    watchList.map((stock) => {
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
                setLoading(false);
                setStockData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [watchList]);

    const handleStockSelect = (symbol) => {
        navigate(`details/${symbol}`);
    };

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

            <div className="row">
                <StockSearch />
            </div>

            <div className="row mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr className="table-secondary">
                            <th scope="col">#</th>
                            <th scope="col">STOCK</th>
                            <th scope="col">Current price</th>
                            <th scope="col">Change</th>
                            <th scope="col">Percent change</th>
                            <th scope="col">High price of the day</th>
                            <th scope="col">Low price of the day</th>
                            <th scope="col">Open price of the day</th>
                            <th scope="col">Previous close price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((stock, index) => {
                            return (
                                <tr
                                    key={stock.symbol}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleStockSelect(stock.symbol)}
                                >
                                    <th scope="row">{index + 1}</th>
                                    <td>{stock.symbol}</td>
                                    <td>${stock.data.c.toFixed(2)}</td>
                                    <td className={`text-${changeColor(stock.data.d)}`}>
                                        ${stock.data.d} {changeIcon(stock.data.d)}
                                    </td>
                                    <td className={`text-${changeColor(stock.data.d)}`}>
                                        {stock.data.dp} {changeIcon(stock.data.dp)}
                                    </td>
                                    <td>${stock.data.h.toFixed(2)}</td>
                                    <td>${stock.data.l.toFixed(2)}</td>
                                    <td>${stock.data.o.toFixed(2)}</td>
                                    <td>${stock.data.pc.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={(e) => onRemove(e, stock)}>
                                            X
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
