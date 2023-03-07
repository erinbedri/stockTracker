import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const AuthenticatedUser = ({ children }) => {
    const { accessToken } = useContext(AuthContext);

    if (!accessToken || accessToken === "null") {
        return <Navigate to={"/"} replace />;
    }

    return children ? children : <Outlet />;
};

export default AuthenticatedUser;
