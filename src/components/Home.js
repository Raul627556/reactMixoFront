import React, { useState } from 'react';
import { Button, Image, Nav } from 'react-bootstrap';  // Importa los componentes de React-Bootstrap
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import { FaDesktop, FaFileInvoice, FaCogs, FaWarehouse, FaWrench, FaSignOutAlt } from 'react-icons/fa'; // Importa los iconos

const Home = () => {
    const [activeLink, setActiveLink] = useState("/"); // Estado para la navegación activa
    const navigate = useNavigate();  // Inicializa useNavigate para redirigir

    const handleLogout = () => {
        // Eliminar el token de localStorage
        localStorage.removeItem('token');

        // Redirigir al login
        navigate('/login');
    };

    return (
        <div className="d-flex">
            {/* Aside a la izquierda */}
            <aside
                className="d-flex flex-column"
                style={{ width: '250px', height: '100vh', padding: 0, backgroundColor: '#f8f9fa' }}
            >
                <div className="d-flex" style={{ marginBottom: '10%' }}>
                    <Image
                        src="logo.png"
                        alt="Logo"
                        fluid
                        style={{ maxWidth: '25%', height: 'auto', marginLeft: '10%', marginTop: '10%' }}
                    />
                </div>
                <Nav defaultActiveKey="/" className="flex-column p-3">
                    <Nav.Link
                        href="/machines"
                        onClick={() => setActiveLink("/machines")}
                        className={activeLink === "/machines" ? "text-purple" : ""}
                    >
                        <FaDesktop /> Máquinas
                    </Nav.Link>
                    <Nav.Link
                        href="/billing"
                        onClick={() => setActiveLink("/billing")}
                        className={activeLink === "/billing" ? "text-purple" : ""}
                    >
                        <FaFileInvoice /> Facturación
                    </Nav.Link>
                    <Nav.Link
                        href="/services"
                        onClick={() => setActiveLink("/services")}
                        className={activeLink === "/services" ? "text-purple" : ""}
                    >
                        <FaCogs /> Servicios
                    </Nav.Link>
                    <Nav.Link
                        href="/stock"
                        onClick={() => setActiveLink("/stock")}
                        className={activeLink === "/stock" ? "text-purple" : ""}
                    >
                        <FaWarehouse /> Stock
                    </Nav.Link>
                    <Nav.Link
                        href="/maintenance"
                        onClick={() => setActiveLink("/maintenance")}
                        className={activeLink === "/maintenance" ? "text-purple" : ""}
                    >
                        <FaWrench /> Mantenimiento
                    </Nav.Link>
                    <Nav.Link
                        href="/configuration"
                        onClick={() => setActiveLink("/configuration")}
                        className={activeLink === "/configuration" ? "text-purple" : ""}
                    >
                        <FaCogs /> Configuración
                    </Nav.Link>
                </Nav>
                {/* Botón de Logout */}
                <Button variant="danger" className="mt-auto m-3" onClick={handleLogout}>
                    <FaSignOutAlt /> Cerrar sesión
                </Button>
            </aside>

            {/* Contenido principal */}
            <main className="flex-grow-1 p-4">
                <h1>Bienvenido a la Página Principal</h1>
                <p>Esta es una vista simple en la raíz de tu aplicación React.</p>
            </main>
        </div>
    );
};

export default Home;
