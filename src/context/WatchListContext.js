import { createContext, useEffect, useState, useContext } from "react";
import { app, database } from "../firebaseConfig";
import { AuthContext } from "./AuthContext";

//
import {
    collection,
    setDoc,
    doc,
    updateDoc,
    arrayUnion,
    getDoc,
    onSnapshot,
    deleteFieldsetDoc,
} from "firebase/firestore";

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
                const stocks = data;
                callback(stocks);
            } else {
                callback([]);
            }

            const unsubscribe = onSnapshot(documentRef, (doc) => {
                const data = doc.data();
                const stocks = data;
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

    const addStock = async (stock, count) => {
        if (!stock) {
            throw new Error("Invalid stock value");
        }

        const collectionRef = collection(database, "watchList");
        const documentRef = doc(collectionRef, email);
        const documentSnapshot = await getDoc(documentRef);

        if (!documentSnapshot.exists()) {
            await setDoc(documentRef, {});
            console.log("Document added");
        }

        const documentData = documentSnapshot.data();
        const updatedData = { ...documentData, [stock]: count };
        await updateDoc(documentRef, updatedData);
        console.log("Document updated");
    };

    const deleteStock = async (stock) => {
        if (!stock) {
            throw new Error("Invalid stock value");
        }

        const collectionRef = collection(database, "watchList");
        const documentRef = doc(collectionRef, email);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
            const documentData = documentSnapshot.data();

            const updatedData = {};
            for (const key in documentData) {
                if (key !== stock) {
                    updatedData[key] = documentData[key];
                }
            }

            try {
                await setDoc(documentRef, updatedData);
                console.log("Document updated");
            } catch (error) {
                console.error("Update error: ", error);
            }
        } else {
            console.log("Document does not exist");
        }
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
