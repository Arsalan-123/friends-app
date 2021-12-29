import React, { useState } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase';

const Search = () => {
    const [users, setUsers] = useState([])
    const [searchInput, setsearchInput] = useState("")
    const searchUser = (e) => {
        setsearchInput(e.target.value)
        console.log("run search", e.target.value, searchInput)

        const q = query(collection(db, "users"), where("username", "==", searchInput));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc);
                console.log(doc.data());
            });
            console.log("Current cities in CA: ", cities);
        });
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <input size="50" type="search" value={searchInput} onChange={searchUser} />
            <button onClick={searchUser}>Check</button>
        </div>
    )
}

export default Search;
