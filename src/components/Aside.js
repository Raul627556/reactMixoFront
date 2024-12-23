import React, { useState } from 'react';
import { Nav, Button, Image } from 'react-bootstrap';
import { FaDesktop, FaFileInvoice, FaCogs, FaTools, FaBox, FaShippingFast, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Aside = () => {
    let navigate = useNavigate();
    let [isCollapsed, setIsCollapsed] = useState(false);

    let handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    let toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside
            className={`d-flex flex-column ${isCollapsed ? 'collapsed' : ''}`}
            style={{
                width: isCollapsed ? '80px' : '250px',
                height: '100vh',
                padding: 0,
                backgroundColor: '#f8f9fa',
                transition: 'width 0.3s',
            }}
        >
            <div
                className="d-flex justify-content-between align-items-center"
                style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    width: '100%',
                }}
            >
                <Image
                    src="logo.png"
                    alt="Logo"
                    fluid
                    style={{
                        width: isCollapsed ? '0' : '120px',
                        height: isCollapsed ? '0' : '40px',
                        transition: 'width 0.3s, height 0.3s',
                        overflow: 'hidden',
                    }}
                />

                <Button
                    variant="light"
                    onClick={toggleMenu}
                    style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {isCollapsed ? <FaBars /> : <FaTimes />}
                </Button>
            </div>

            <Nav defaultActiveKey="/" className="flex-column p-3">
                <Nav.Link href="/machines">
                    <FaDesktop /> {!isCollapsed && 'Máquinas'}
                </Nav.Link>
                <Nav.Link href="/billing">
                    <FaFileInvoice /> {!isCollapsed && 'Facturación'}
                </Nav.Link>
                <Nav.Link
                    href="#"
                    disabled
                    className="text-muted"
                    style={{ pointerEvents: 'none', opacity: 0.6 }}
                >
                    <FaTools /> {!isCollapsed && 'Servicios'}
                </Nav.Link>
                <Nav.Link
                    href="#"
                    disabled
                    className="text-muted"
                    style={{ pointerEvents: 'none', opacity: 0.6 }}
                >
                    <FaBox /> {!isCollapsed && 'Stock'}
                </Nav.Link>
                <Nav.Link
                    href="#"
                    disabled
                    className="text-muted"
                    style={{ pointerEvents: 'none', opacity: 0.6 }}
                >
                    <FaShippingFast /> {!isCollapsed && 'Mantenimiento'}
                </Nav.Link>
                <Nav.Link
                    href="#"
                    disabled
                    className="text-muted"
                    style={{ pointerEvents: 'none', opacity: 0.6 }}
                >
                    <FaCogs /> {!isCollapsed && 'Configuración'}
                </Nav.Link>
            </Nav>

            <Button
                variant="danger"
                className={`mt-auto m-3 d-flex align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
                onClick={handleLogout}
                style={{ textAlign: isCollapsed ? 'center' : 'inherit' }}
            >
                <FaSignOutAlt />
                {!isCollapsed && <span style={{ marginLeft: '10px' }}>Cerrar sesión</span>}
            </Button>
        </aside>
    );
};

export default Aside;
