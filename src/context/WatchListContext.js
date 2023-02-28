import { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvier = (props) => {
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN", "INTC"]
    );

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    const addStock = (stock) => {
        if (!watchList.includes(stock)) {
            setWatchList([...watchList, stock]);
        }
    };

    const deleteStock = (stock) => {
        setWatchList(
            watchList.filter((el) => {
                return el !== stock;
            })
        );
    };

    return (
        <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
            {props.children}
        </WatchListContext.Provider>
    );
};
