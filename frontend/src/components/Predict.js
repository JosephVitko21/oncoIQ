import React, { useState } from 'react';
import PredictDisplay from './PredictDisplay';
import Button from 'react-bootstrap/Button';

export default function Predict() {
    const [prediction, setPrediction] = useState(null);

    function upload() {
        setPrediction(69);
    }

    if (prediction != null) {
        return (
            <div className='mt-5'>
                <PredictDisplay />
            </div>
        );
    }

    return (
        <div className='mt-5'>
            <Button variant="outline-primary" onClick={upload}>Upload Slide Image</Button>
        </div>
    );
}
