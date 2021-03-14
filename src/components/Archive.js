import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import sample from './sample.png';

export default function Archive() {
    const [savedImages, setSavedImages] = useState(['gucci', 'supreme']);

    return (
        <div>
            { savedImages.map((item) => {
                return (
                    <div className='mt-5'>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={sample} />
                        <Card.Body>
                            <Card.Title>{item}</Card.Title>
                            <Card.Text>
                                Overall Risk: {item}
                            </Card.Text>
                            <Button variant="outline-danger">Delete</Button>
                        </Card.Body>
                        </Card>
                    </div>
                );
            }) }
        </div>
    )
}
