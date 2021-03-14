import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Result from'./Result';

export default function Predict() {
    const [prediction, setPrediction] = useState(null);
    const [uploadInput, setUploadInput] =useState(null);
    const [id, setId] = useState(null);
    const [imgFile, setImgFile] = useState(null);

    const dummy = [1, 2, 3, 4, 5, 0.6, 2, 3, 4, 5, 1, 2, 3, 4, 5, 0.2, 2, 3, 4, 5, 1, 2, 3, 4, 5];

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

        fetch('https://oncoiq-backend.herokuapp.com/api/upload_image', requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setImgFile(result.image_file);
            console.log('img', imgFile);
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    useEffect(() => {
        var myHeaders = new Headers();
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1];
        myHeaders.append("Authorization", "Bearer " + token);

        const data = new FormData();
        data.append('image_file', imgFile);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch('https://oncoiq-backend.herokuapp.com/api/get_tiles', requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setImgFile(null);
        })
        .catch((error) => {
            console.log('error', error);
        });
    }, [imgFile]);

    if (prediction != null) {
        return (
            <div className='mt-5'>
                <Result prediction={dummy}/>
                <Button className='mt-3' variant='primary' onClick={() => setPrediction(null)}>New Predictions</Button>
            </div>
        );
    }

    return (
        <div className='mt-5'>
            <Form onSubmit={handleUploadImage}>
                <input ref={(ref) => setUploadInput(ref)} type="file" />
                <br />
                <Form.Group className='mt-3' controlId='formID'>
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control type='text' placeholder='Patient ID' onChange={handleIDChange}/>
                </Form.Group>
                <Button className='mt-3' variant='primary' type='submit'>
                    Upload
                </Button>
            </Form>
        </div>
    );
}
