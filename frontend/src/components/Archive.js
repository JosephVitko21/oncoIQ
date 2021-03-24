import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import sample from './sample.png';
import { ArchContext } from '../context/GlobalContext';

export default function Archive() {
    const [savedImages, setSavedImages] = useState([]);
    const {arch, setArch} = useContext(ArchContext);

    function getUserImg() {
        var myHeaders = new Headers();
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1];
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch('https://oncoiq-backend.herokuapp.com/api/get_user_images', requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result);
            setSavedImages(result);
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    function filePath(fileName) {
        return 'https://oncoiq-backend.herokuapp.com/static/tissue_images/' + fileName;
    }

    if (arch) {
        getUserImg();
        setArch(false);
    }

    return (
        <div>
            { savedImages.map((item) => {
                return (
                    <div className='mt-5'>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={filePath(item.image_file)} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                {item.date}
                            </Card.Text>
                            <Button variant="outline-primary">View</Button>
                            <Button className='ml-2' variant="outline-danger">Delete</Button>
                        </Card.Body>
                        </Card>
                    </div>
                );
            }) }
        </div>
    )
}
