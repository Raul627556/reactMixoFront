import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
/*
import Home from './Home';
*/

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta para la vista principal */}
                <Route path="/" element={<Home />} />

                {/* Ruta para la vista de Login */}
                <Route path="/login" element={<Login />} />

                {/* Agrega otras rutas aquí si es necesario */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
