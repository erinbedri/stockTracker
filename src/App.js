import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { WatchListContextProvier } from "./context/WatchListContext";
import StockList from "./pages/StockList";
import StockDetails from "./pages/StockDetails";

function App() {
    return (
        <WatchListContextProvier>
            <div className="App container mt-5">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<StockList />} />
                        <Route path="/details/:symbol" element={<StockDetails />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </WatchListContextProvier>
    );
}

export default App;
