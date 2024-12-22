import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Comprobamos si hay un token en el almacenamiento local
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // Si hay token, el usuario está autenticado
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Si el usuario está autenticado, se redirige a Home, si no, al Login */}
                <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
                <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
                <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} /> {/* Ruta para Home */}
            </Routes>
        </Router>
    );
};

export default App;
