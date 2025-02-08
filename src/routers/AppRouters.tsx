import React from 'react';
import { BrowserRouter as Router,Routes, Route } from "react-router";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";

const AppRouters: React.FC = () => {
    return (
        <div>
            <Router>
                <Routes>
                    {/*Main layout*/}
                    <Route path="/" element={<Home />} />
                    {/*Auth layout*/}
                    <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                    <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
                    <Route path="/forgot_password" element={<AuthLayout><Register /></AuthLayout>} />
                </Routes>
            </Router>
        </div>
    );
};

export default AppRouters;
