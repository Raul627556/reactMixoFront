import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';  // Importa los componentes de Bootstrap

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Verificar si ya está logueado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');  // Si hay un token, redirige al Home
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://mixoapi.com/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);  // Guarda el token
            console.log('Login exitoso:', response.data);
            navigate('/home');  // Redirige a Home
        } catch (err) {
            console.error('Error:', err);
            setError('Email o contraseña incorrectos');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    {/* Imagen en la parte superior */}
                    <div className="text-center" style={{marginBottom: '10%'}}>
                        <Image
                            src="logo.png"
                            alt="Logo"
                            fluid
                            style={{maxWidth: '100%', height: 'auto'}}
                        />
                    </div>

                    {/* Formulario de Login */}
                    <Form onSubmit={handleLogin}>
                        {/* Campo de usuario */}
                        <Form.Group className="mb-4"> {/* Espacio adicional con mb-4 */}
                            <Form.Label className="fw-bold">Usuario</Form.Label> {/* Label en negrita con fw-bold */}
                            <Form.Control
                                type="email"
                                placeholder="Introduce tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Campo de contraseña */}
                        <Form.Group className="mb-4"> {/* Espacio adicional con mb-4 */}
                            <Form.Label className="fw-bold">Contraseña</Form.Label> {/* Label en negrita con fw-bold */}
                            <Form.Control
                                type="password"
                                placeholder="Introduce tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Botón de submit */}
                        <Button variant="primary" type="submit" className="w-100">
                            Iniciar sesión
                        </Button>
                    </Form>

                    {/* Mensaje de error */}
                    {error && <p className="text-danger text-center mt-3">{error}</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
