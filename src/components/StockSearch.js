import React, { useState, useEffect, useContext } from "react";

import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/WatchListContext";

export default function StockSearch() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const { addStock } = useContext(WatchListContext);

    const renderDropdown = () => {
        const dropdownClass = search ? "show" : null;
        return (
            <ul
                style={{
                    height: "250px",
                    overflowY: "scroll",
                    overflowX: "hidder",
                    cursor: "pointer",
                }}
                className={`dropdown-menu ${dropdownClass}`}
            >
                {results.map((result) => (
                    <li
                        className="dropdown-item"
                        key={result.symbol}
                        onClick={() => {
                            addStock(result.symbol);
                            setSearch("");
                        }}
                    >
                        {result.description} ({result.symbol})
                    </li>
                ))}
            </ul>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search,
                    },
                });

                const data = response.data.result.filter(
                    (result) =>
                        !result.symbol.includes(".") && !result.symbol.includes(":") && !result.symbol.includes("^")
                );
                setResults(data);
            } catch (err) {}
        };
        if (search.length > 0) {
            fetchData();
        } else {
            setResults([]);
        }
    }, [search]);

    return (
        <div className="w-50 mx-auto">
            <div className="form-floating dropdown">
                <input
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Search for Stock"
                    autoComplete="off"
                />
                <label htmlFor="search">Search for Stock</label>

                {renderDropdown()}
            </div>
        </div>
    );
}
