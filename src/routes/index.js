import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Register from "../pages/Register/register";
import Admin from "../pages/Admin/admin";
import Private from "./private";

function BuscarApp(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/admin" element={<Private> <Admin/> </Private>}/>
        </Routes>
    )
}

export default BuscarApp;