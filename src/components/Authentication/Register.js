import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { app } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
    let auth = getAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const inputHandler = (e) => {
        let newInput = { [e.target.name]: e.target.value };

        setData({ ...data, ...newInput });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (data.password === "") {
            alert("Password cannot be empty!");
            return;
        }

        if (data.password !== data.rePassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate("/login");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="row align-items-center">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h2>Register</h2>

                <form className="mt-4" onSubmit={onSubmitHandler}>
                    <div>
                        <div className="form-floating mb-3">
                            <input
                                name="email"
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="john@doe.com"
                                onChange={(e) => inputHandler(e)}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="******"
                                onChange={(e) => inputHandler(e)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating">
                            <input
                                name="rePassword"
                                type="password"
                                className="form-control"
                                id="rePassword"
                                placeholder="******"
                                onChange={(e) => inputHandler(e)}
                            />
                            <label htmlFor="rePassword">Repeat Password</label>
                        </div>

                        <p className="mt-3">
                            If you already have an account, please
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <span> login</span>
                            </Link>
                        </p>

                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
