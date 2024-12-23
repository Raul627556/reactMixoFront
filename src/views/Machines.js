import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form, Badge } from 'react-bootstrap';
import Aside from '../components/Aside'; // Importa el componente Aside

const Machines = () => {
    let [machines, setMachines] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    let fetchTotalServices = async (machineId) => {
        try {
            let response = await fetch(`http://mixoapi.com/api/services/getAllMachineServicesSum/${machineId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el total de servicios');
            }
            let data = await response.json();
            return data.totalServices;
        } catch (err) {
            setError(err.message);
            return 0;
        }
    };

    useEffect(() => {
        let fetchMachines = async () => {
            try {
                let response = await fetch('http://mixoapi.com/api/machines/getAllMachines');
                if (!response.ok) {
                    throw new Error(`Error al obtener las máquinas: ${response.status}`);
                }
                let data = await response.json();

                // Para cada máquina, obtener el total de servicios
                let machinesWithServices = await Promise.all(
                    data.map(async (machine) => {
                        let totalServices = await fetchTotalServices(machine._id); // Obtener el total de servicios
                        return { ...machine, totalServices }; // Agregar el total de servicios a la máquina
                    })
                );

                setMachines(machinesWithServices); // Asigna los datos al estado
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchMachines();
    }, []);

    let handleEdit = (machineId) => {
        let updatedMachines = machines.map((machine) => {
            if (machine._id === machineId) { // Compara con _id
                return { ...machine, isEditing: !machine.isEditing };
            }
            return machine;
        });
        setMachines(updatedMachines);
    };

    let handleSave = async (machineId, name, status) => {
        try {
            let response = await fetch(`http://mixoapi.com/api/machines/updateMachine/${machineId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, status }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la máquina');
            }

            let updatedMachines = machines.map((machine) => {
                if (machine._id === machineId) {
                    machine.isEditing = false;
                    machine.name = name;
                    machine.status = status;
                }
                return machine;
            });

            setMachines(updatedMachines);
        } catch (error) {
            setError('Error al guardar los cambios');
        }
    };

    if (loading) return <p>Cargando máquinas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Row className="m-0">
            <Col md={2} className="p-0">
                <Aside />
            </Col>

            <Col md={10} className="p-3">
                <h2 className="mt-4">Máquinas</h2>

                <Row xs={1} md={2} className="g-4 mt-4">
                    {machines.map((machine) => (
                        <Col key={machine._id}>
                            <Card>
                                <Row>
                                    <Col md={3} className="p-0">
                                        <Card.Img
                                            variant="top"
                                            src={machine.imageUrl || 'https://via.placeholder.com/150'}
                                            style={{ height: '100%', objectFit: 'cover' }}
                                        />
                                    </Col>
                                    <Col md={9}>
                                        <Card.Body>
                                            <Card.Title>
                                                {machine.isEditing ? (
                                                    <Form.Control
                                                        type="text"
                                                        value={machine.name}
                                                        onChange={(e) => {
                                                            let updatedMachines = machines.map((m) => {
                                                                if (m._id === machine._id) {
                                                                    return { ...m, name: e.target.value };
                                                                }
                                                                return m;
                                                            });
                                                            setMachines(updatedMachines);
                                                        }}
                                                    />
                                                ) : (
                                                    machine.name
                                                )}
                                            </Card.Title>

                                            <Badge bg="info" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                                Servicios: {machine.totalServices}
                                            </Badge>

                                            <Card.Text>
                                                <strong>Localization:</strong> {machine.localization}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Status: </strong>
                                                {machine.isEditing ? (
                                                    <Form.Control
                                                        as="select"
                                                        value={machine.status}
                                                        onChange={(e) => {
                                                            let updatedMachines = machines.map((m) => {
                                                                if (m._id === machine._id) {
                                                                    return { ...m, status: e.target.value };
                                                                }
                                                                return m;
                                                            });
                                                            setMachines(updatedMachines);
                                                        }}
                                                    >
                                                        <option value="active">Activo</option>
                                                        <option value="inactive">Inactivo</option>
                                                        <option value="maintenance">Mantenimiento</option>
                                                    </Form.Control>
                                                ) : (
                                                    machine.status
                                                )}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Category:</strong> {machine.category}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Version:</strong> {machine.version}
                                            </Card.Text>

                                            <Button
                                                style={{ marginBottom: '2%' }}
                                                variant={machine.isEditing ? 'success' : 'primary'}
                                                onClick={() => {
                                                    if (machine.isEditing) {
                                                        handleSave(machine._id, machine.name, machine.status);
                                                    } else {
                                                        handleEdit(machine._id);
                                                    }
                                                }}
                                                className="float-end"
                                            >
                                                {machine.isEditing ? 'Guardar' : 'Modificar'}
                                            </Button>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Machines;
