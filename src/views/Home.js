import React, {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import Aside from '../components/Aside';

const Home = () => {

    return (
        <Row>
            <Col md={2}>
                <Aside/>
            </Col>
            <Col md={10}>
                <main className="flex-grow-1 p-4">
                    <h1>Bienvenido a la Página Principal</h1>
                </main>
            </Col>
        </Row>
    );
};

export default Home;
