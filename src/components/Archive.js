import React, {useEffect, useState} from 'react';

import user from "../utils/user";
import domain from "../utils/site-domain";
import ImageDetailModal from "./ImageDetail";
import {Button, FormControl, FormLabel, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter, faSearch, faSort} from '@fortawesome/free-solid-svg-icons'

export default function Archive() {
    const [imgList, setImgList] = useState(null);

    useEffect(() => {
        fetchUserImages()
            .then(data => {
                setImgList(data);
            });
    }, []);

    if (!imgList) return <p>Loading...</p>
    // TODO: Separate the search box and button from the filter and sort buttons
    // TODO: Add search, filter, sort, functionality
    // TODO: Implement lazy loading
    return (
        <div className="container text-center mt-5">
            <h3>My Image Archive</h3>
            <p>Click or tap on a histology to view its details</p>
            <br />
            <Row className='search-row'>
                <div className='form-outline'>
                    <FormControl type="search" id="searchForm" placeholder="Search"/>
                </div>
                <Button variant='light'><FontAwesomeIcon icon={faSearch} /></Button>
                <div className='justify-content-end'>
                    <Button variant='light'><FontAwesomeIcon icon={faFilter} /></Button>
                    <Button variant='light'><FontAwesomeIcon icon={faSort} /></Button>
                </div>
            </Row>
            <div className="archive-gallery container d-flex flex-wrap mt-4">
                {console.log(imgList)}
                {imgList.map((datum) => {
                    console.log("datum:", datum)
                    return (
                        <ImageDetailModal
                            file_id={datum.file_id}
                            image_id={datum.image_id}
                            name={datum.name}
                            date={datum.date}
                            risk_level={datum.risk_level}
                            model={datum.model}
                        />
                    );
                })}
            </div>
        </div>
    );
}

async function fetchUserImages() {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + '/images'
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
            },
            redirect: 'follow'
        }).then(response => {
            response.json()
                .then(data => {
                    console.log("data:", data)
                    if(data.status_code === 401) {
                        // if request returns 401, get new token and try again
                        console.log("refreshing token")
                        user.refreshToken()
                            .then(_ => {
                                fetchUserImages()
                                    .then(response => {
                                        response.json()
                                            .then(data => {
                                                if(data.status_code === 200) {
                                                    // if it works this time, return data
                                                    resolve(data)
                                                } else {
                                                    console.log("Refresh token failed, going back to login page")
                                                    reject("Could not log in")
                                                }
                                            }).catch(err => reject(err))
                                    }).catch(err => reject(err))
                            }).catch(err => reject(err))
                    } else {
                        // otherwise, return data
                        resolve(data);
                    }
                }).catch(err => reject(err))
        }).catch(e => reject(e))
    })
}
