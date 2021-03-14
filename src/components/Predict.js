import React, { useState } from 'react';
import PredictDisplay from './PredictDisplay';
import Button from 'react-bootstrap/Button';

export default function Predict() {
    const [prediction, setPrediction] = useState(null);
    const [imgUrl, setImgUrl] = useState({
        imageURL: '',
    });

    function upload() {
        setPrediction(69);
    }

    function handleUploadImage(event) {
        event.preventDefault();
    
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                setImgUrl({ imageURL: `http://localhost:8000/${body.file}` });
            });
        });
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
            {/* <Button variant="outline-primary" onClick={upload}>Upload Slide Image</Button> */}
            <form onSubmit={handleUploadImage}>
                <div>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <div>
                <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                </div>
                <br />
                <div>
                <button>Upload</button>
                </div>
                <img src={this.state.imageURL} alt="img" />
            </form>
        </div>
    );
}
