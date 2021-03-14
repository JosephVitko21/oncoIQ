import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import sample from './sample.png';

export default function Result({ prediction }) {
    const images = [];

    function overColor(risk) {
        var base = 'overlay text-center ';

        if (risk > 0.75) {
            base += 'bg-danger';
        } else if (risk > 0.5) {
            base += 'bg-warning';
        } else {
            base += 'bg-success';
        }

        return base;
    }

    for (let i = 0; i < prediction.length; i += 5) {
        images.push(
            <CardGroup className='w-50'>
                <Card>
                    <Card.Img variant="top" src={sample} />
                    <div className={overColor(prediction[i])}>
                        {prediction[i]}
                    </div>
                </Card>
                <Card style={{ width: '100px' }}>
                    <Card.Img variant="top" src={sample} />
                </Card>
                <Card style={{ width: '100px' }}>
                    <Card.Img variant="top" src={sample} />
                </Card>
                <Card style={{ width: '100px' }}>
                    <Card.Img variant="top" src={sample} />
                </Card>
                <Card style={{ width: '100px' }}>
                    <Card.Img variant="top" src={sample} />
                </Card>
            </CardGroup>
        );
    }

    return (
        <div>
            {images}
        </div>
    );
}
