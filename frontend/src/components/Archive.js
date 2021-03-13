import React from 'react';
import Card from 'react-bootstrap/Card';
import sample from './sample.png';

export default function Archive() {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={sample} />
            <Card.Body>
                <Card.Title>Prediction 1</Card.Title>
                <Card.Text>
                    Positive: 0.9, Negative: 0.1
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    )
}
