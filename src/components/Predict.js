import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Result from'./Result';

export default function Predict() {
    const [prediction, setPrediction] = useState(null);
    const [uploadInput, setUploadInput] =useState(null);
    const [id, setId] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [overRisk, setOverRisk] = useState(0);
    const [imageID, setImageID] = useState(null)

    function handleIDChange(event) {
        event.preventDefault();
        setId(event.target.value);
    }

    function handleUploadImage(event) {
        event.preventDefault();
    
        var myHeaders = new Headers();
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1];
        myHeaders.append("Authorization", "Bearer " + token);

        const data = new FormData();
        data.append('file', uploadInput.files[0]);
        data.append('name', id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch('http://localhost:5000/api/upload_image', requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setImgFile(result.image_file);
            setOverRisk(result.overall_risk.toFixed(4));
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    useEffect(() => {
        var myHeaders = new Headers();
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1];
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({"image_file":imgFile});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch('http://localhost:5000/api/get_tiles', requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setPrediction(result.tiles);
            setImgFile(null);
            setImageID(result.image_file)
        })
        .catch((error) => {
            console.log('error', error);
        });
    }, [imgFile]);

    if (prediction != null) {
        return (
            <div className='mt-5'>
                <Result prediction={prediction} image_id={imageID}/>
                <p>Overall Risk: {overRisk}</p>
                <Button className='mt-3' variant='primary' onClick={() => setPrediction(null)}>Upload</Button>
            </div>
        );
    }

    return (
        <div className='mt-4'>
            <br />
            <h3 className='mb-4'>Upload a histopathology image</h3>
            <Form onSubmit={handleUploadImage}>
                <Form.Group className='mt-3' controlId='formID'>
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control className='w-auto' type='text' placeholder='Patient ID' onChange={handleIDChange}/>
                </Form.Group>
                <input className='mt-4' ref={(ref) => setUploadInput(ref)} type="file" />
                <Button className='' variant='primary' type='submit'>
                    Upload
                </Button>
            </Form>
        </div>
    );
}
