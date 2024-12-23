import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Machines from './views/Machines';
import Billing from './views/Billing';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                    path="/login"
                    element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                    path="/home"
                    element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                    path="/machines"
                    element={isAuthenticated ? <Machines /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                    path="/billing"
                    element={isAuthenticated ? <Billing /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
