import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { AuthContext } from "../../context/AuthContext";

export default function Register() {
    let auth = getAuth();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [data, setData] = useState({});

    const inputHandler = (e) => {
        let newInput = { [e.target.name]: e.target.value };

        setData({ ...data, ...newInput });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                login(response.user.accessToken, response.user.email);
                navigate("/stocks");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="row align-items-center">
            <div className="mx-auto col-10 col-md-8 col-lg-6">
                <h2>Login</h2>

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
                        <div className="form-floating">
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
                        <p className="mt-3">
                            If you do not have an account yet, please
                            <Link to="/register" style={{ textDecoration: "none" }}>
                                <span> register</span>
                            </Link>
                        </p>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
