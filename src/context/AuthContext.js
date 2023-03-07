import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);

    useEffect(() => {
        localStorage.setItem("accessToken", accessToken);
    }, [accessToken]);

    const login = (token) => {
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken({});
    };

    return <AuthContext.Provider value={{ accessToken, login, logout }}>{props.children}</AuthContext.Provider>;
};
