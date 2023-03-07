import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const { accessToken } = useContext(AuthContext);

    return (
        <div className="row align-items-center">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h1 className="text-center">Stock Tracker</h1>

                {!accessToken || accessToken === "null" ? (
                    <>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <div className="d-grid gap-2 mx-auto mt-5">
                                <button className="btn btn-outline-primary btn-lg" type="button">
                                    Login
                                </button>
                            </div>
                        </Link>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            <div className="d-grid gap-2 mx-auto mt-4">
                                <button className="btn btn-primary btn-lg" type="button">
                                    Register
                                </button>
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/stocks" style={{ textDecoration: "none" }}>
                            <div className="d-grid gap-2 mx-auto mt-5">
                                <button className="btn btn-outline-primary btn-lg" type="button">
                                    Stock List
                                </button>
                            </div>
                        </Link>
                        <Link to="/logout" style={{ textDecoration: "none" }}>
                            <div className="d-grid gap-2 mx-auto mt-4">
                                <button className="btn btn-primary btn-lg" type="button">
                                    Logout
                                </button>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
