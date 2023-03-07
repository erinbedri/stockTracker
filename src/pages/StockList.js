import React from "react";
import { Link } from "react-router-dom";
import StockTable from "../components/StockTable";

export default function StockList() {
    return (
        <div>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <div className="d-grid gap-2 mx-auto mt-5">
                    <h1 className="text-center mb-3">Stock Tracker</h1>
                </div>
            </Link>

            <StockTable />
        </div>
    );
}
