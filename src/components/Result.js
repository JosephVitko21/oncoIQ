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

    function overOpa(risk) {
        const opa = {
            opacity: '' + risk,
        };

        return opa;
    }

    function filePath(fileName) {
        return 'https://oncoiq-backend.herokuapp.com/static/tissue_images/' + fileName;
    }

    for (let i = 0; i < prediction.length; i += 5) {
        images.push(
            <CardGroup className='w-50'>
                <Card>
                    <Card.Img variant="top" src={filePath(prediction[i].file_name)} />
                    <div className={overColor(prediction[i].risk_level.toFixed(2))}>
                        {prediction[i].risk_level.toFixed(2)}
                    </div>
                </Card>
                <Card>
                    <Card.Img variant="top" src={filePath(prediction[i+1].file_name)} />
                    <div className={overColor(prediction[i+1].risk_level.toFixed(2))}>
                        {prediction[i+1].risk_level.toFixed(2)}
                    </div>
                </Card>
                <Card>
                    <Card.Img variant="top" src={filePath(prediction[i+2].file_name)} />
                    <div className={overColor(prediction[i+2].risk_level.toFixed(2))}>
                        {prediction[i+2].risk_level.toFixed(2)}
                    </div>
                </Card>
                <Card>
                    <Card.Img variant="top" src={filePath(prediction[i+3].file_name)} />
                    <div className={overColor(prediction[i+3].risk_level.toFixed(2))}>
                        {prediction[i+3].risk_level.toFixed(2)}
                    </div>
                </Card>
                <Card>
                    <Card.Img variant="top" src={filePath(prediction[i+4].file_name)} />
                    <div className={overColor(prediction[i+4].risk_level.toFixed(2))}>
                        {prediction[i+4].risk_level.toFixed(2)}
                    </div>
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
