import React, { useState, useEffect } from 'react'
import { Route, Routes } from "react-router";
import SignUp from './SignUp';
import Login from "./LogIn.js";
import Home from "./Home";
import Setting from "./Setting";
import Dashboard from "./Dashboard";
import Searchbtn from "./Searchbtn";
import AuthHandler from "./AuthHandler/AuthHandler"
import AuthContext from './Context/AuthContext';
import { auth } from './Firebase';
import { Spin } from 'antd';



const CreateRoutes = () => {
    const [toogle, setToogle] = useState(false);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        auth.onAuthStateChanged((user) => {
            if (user) {
                setToogle(true)
                setLoading(false)
            } else {
                setToogle(false)
                setLoading(false)
            }
        });
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn: toogle,
            setToogle: setToogle,
        }}>
            {
                loading
                    ?
                    <div style={{ width: "100%", height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin size="large" />
                    </div>
                    :
                    <AuthHandler />
            }
        </AuthContext.Provider>
    )
};
export default CreateRoutes;



