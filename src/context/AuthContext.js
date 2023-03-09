import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    const [email, setEmail] = useState(localStorage.getItem("email") || null);

    useEffect(() => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("email", email);
    }, [accessToken, email]);

    const login = (token, email) => {
        setAccessToken(token);
        setEmail(email);
    };

    const logout = () => {
        setAccessToken(null);
        setEmail(null);
    };

    return <AuthContext.Provider value={{ accessToken, email, login, logout }}>{props.children}</AuthContext.Provider>;
};
