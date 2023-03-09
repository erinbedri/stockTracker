import { createContext, useEffect, useState, useContext } from "react";
import { app, database } from "../firebaseConfig";
import { AuthContext } from "./AuthContext";

//
import { collection, setDoc, doc, updateDoc, arrayUnion, getDoc, onSnapshot } from "firebase/firestore";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    const { email } = useContext(AuthContext);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const getStocksForEmail = async (email, callback) => {
            const collectionRef = collection(database, "watchList");
            const documentRef = doc(collectionRef, email);
            const documentSnapshot = await getDoc(documentRef);

            if (documentSnapshot.exists()) {
                const data = documentSnapshot.data();
                const stocks = data.stocks;
                callback(stocks);
            } else {
                callback([]);
            }

            const unsubscribe = onSnapshot(documentRef, (doc) => {
                const data = doc.data();
                const stocks = data.stocks;
                callback(stocks);
            });

            return unsubscribe;
        };

        if (email) {
            getStocksForEmail(email, setWatchList);
        } else {
            setWatchList([]);
        }
    }, [email]);

    const addStock = async (stock) => {
        if (!stock) {
            throw new Error("Invalid stock value");
        }

        const collectionRef = collection(database, "watchList");
        const documentRef = doc(collectionRef, email);
        const documentSnapshot = await getDoc(documentRef);

        if (!documentSnapshot.exists()) {
            await setDoc(documentRef, { stocks: [stock] });
            console.log("Document added");
        } else {
            await updateDoc(documentRef, {
                stocks: arrayUnion(stock),
            });
            console.log("Document updated");
        }
    };

    const deleteStock = async (stock) => {
        const collectionRef = collection(database, "watchList");
        const documentRef = doc(collectionRef, email);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();
            const updatedStocks = documentData.stocks.filter((el) => el !== stock);
            await updateDoc(documentRef, { stocks: updatedStocks });
            console.log("Stock deleted from Firestore");
        }
        setWatchList((prevWatchList) => prevWatchList.filter((el) => el !== stock));
    };

    /*
    const collectionRef = doc(database, "watchList", email);
    
    const addStock = (stock) => {
        setDoc(collectionRef, {
            stock: stock,
        })
            .then(() => {
                console.log("Document added");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };

    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN", "INTC"]
    );

       const deleteStock = (stock) => {
        setWatchList(
            watchList.filter((el) => {
                return el !== stock;
            })
        );
    };
    */

    /*
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
    */

    return (
        <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
            {props.children}
        </WatchListContext.Provider>
    );
};
