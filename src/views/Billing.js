import React, { useState, useEffect } from 'react';
import Aside from '../components/Aside';
import { Table, Container, Row, Col } from 'react-bootstrap';

const Billing = () => {
    let [services, setServices] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect(() => {
        let fetchServices = async () => {
            try {
                let response = await fetch('http://mixoapi.com/api/services/getAllServices');
                if (!response.ok) {
                    throw new Error('Error al obtener los servicios');
                }
                let data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <p>Cargando servicios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container fluid className="d-flex p-0">
            <Row className="w-100 m-0">
                <Col md={2} className="p-0">
                    <Aside />
                </Col>
                <Col md={9} className="p-0">
                    <div className="content-container p-4">
                        <h1>Facturación</h1>
                        <p>A continuación se muestra la lista de servicios facturados.</p>

                        {/* Contenedor con scroll para la tabla */}
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <Table striped bordered hover responsive>
                                <thead>
                                <tr>
                                    <th>Identificador</th>
                                    <th>Tipo</th>
                                    <th>Servicio</th>
                                    <th>Fecha y Hora</th>
                                    <th>Precio</th>
                                </tr>
                                </thead>
                                <tbody>
                                {services.map((service) => (
                                    <tr key={service._id}>
                                        <td>{service._id}</td>
                                        <td>{service.type}</td>
                                        <td>
                                            {service.service ? `${service.service.alcohol}, ${service.service.bib}` : 'N/A'}
                                        </td>
                                        <td>{new Date(service.date).toLocaleString()}</td>
                                        <td>{service.price} €</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Billing;
