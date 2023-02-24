import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import StockList from "./pages/StockList";
import StockDetails from "./pages/StockDetails";

function App() {
    return (
        <div className="App container mt-5">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StockList />} />
                    <Route path="/details/:symbol" element={<StockDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
