import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import sample from './sample.png';

export default function PredictDisplay() {
    return (
        <div>
            <div className='mt-5'>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={sample} />
                <Card.Body>
                    <Card.Title>Prediction 1</Card.Title>
                    <Card.Text>
                        Positive: 0.9, Negative: 0.1
                    </Card.Text>
                    <Button variant="outline-success">Save</Button>
                </Card.Body>
                </Card>
            </div>
        </div>
    );
}
