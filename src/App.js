import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { WatchListContextProvider } from "./context/WatchListContext";
import Home from "./components/Home";
import StockList from "./pages/StockList";
import StockDetails from "./pages/StockDetails";
import AuthenticatedUser from "./components/Authentication/AuthenticatedUser";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Logout from "./components/Authentication/Logout";
import NotFound from "./components/NotFound";

function App() {
    return (
        <AuthContextProvider>
            <WatchListContextProvider>
                <div className="App container mt-5">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />

                            <Route element={<AuthenticatedUser />}>
                                <Route path="/stocks" element={<StockList />} />
                                <Route path="/stocks/details/:symbol" element={<StockDetails />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </WatchListContextProvider>
        </AuthContextProvider>
    );
}

export default App;
