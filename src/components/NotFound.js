import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="row align-items-center">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h1 className="text-center">404</h1>
                <h4 className="text-center mt-3">The page you are looking for does not exist.</h4>

                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="d-grid gap-2 mx-auto mt-5">
                        <button className="btn btn-primary btn-lg" type="button">
                            Home
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
}
