import { Route, Routes } from "react-router";
import SignUp from './SignUp';
import Login from "./LogIn.js";
import Home from "./Home";
import Setting from "./Setting";
import Dashboard from "./Dashboard";
import Searchbtn from "./Searchbtn";
const CreateRoutes = () => {
    return (


        <Routes>
            <Route path='/' element={<SignUp />} />
            <Route path='login' element={<Login />} />
            <Route path='home' element={<Home />} />
            <Route path='setting' element={<Setting />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='searchbtn' element={<Searchbtn />} />


        </Routes>
    )
};
export default CreateRoutes;



