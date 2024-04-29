import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storage from "../../Storage/Storage";

const Nav = () => {
    const go = useNavigate();
    const logout = async() => {
        storage.remove("authToken");
        storage.remove("authUser");
        go('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-white bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand text-white">VENTAS ({storage.get("authUser")})</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                { storage.get("authUser") ? (
                    <div className="collapse navbar-collapse" id="nav">
                        <ul className="navbar-nav mx-auto mb-2">
                            <li className="nav-item active px-lg-5">
                                <Link to="/products" className="nav-link text-white active">Productos</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mx-auto mb-2">
                            <li className="nav-item px-lg-5">
                                <button className="btn btn-light" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                ): "" }
            </nav>
        </div>
    )
}

export default Nav;