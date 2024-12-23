import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';

const Login = ({ setIsAuthenticated }) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    let handleLogin = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://mixoapi.com/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (err) {
            console.error('Error:', err);
            setError('Email o contraseña incorrectos');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <div className="text-center" style={{marginBottom: '10%'}}>
                        <Image
                            src="logo.png"
                            alt="Logo"
                            fluid
                            style={{maxWidth: '100%', height: 'auto'}}
                        />
                    </div>

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Usuario</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Introduce tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Introduce tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Iniciar sesión
                        </Button>
                    </Form>

                    {error && <p className="text-danger text-center mt-3">{error}</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
