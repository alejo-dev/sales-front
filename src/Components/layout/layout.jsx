import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/pruduct-admin"></Route>
            </BrowserRouter>
        </div>
    );
};

export default Layout;