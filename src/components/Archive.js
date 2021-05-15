import React, {useEffect, useState} from 'react';
import ArchiveEntry from "./ArchiveEntry";

import user from "../utils/user";
import domain from "../utils/site-domain";

export default function Archive() {
    const [imgList, setImgList] = useState(null);

    useEffect(() => {
        fetchUserImages()
            .then(data => {
                setImgList(data);
            });
    }, []);

    if (!imgList) return <p>Loading...</p>
    return (
        <div className="container d-flex flex-wrap mt-4">
            {console.log(imgList)}
            {imgList.map((datum) => {
                console.log("datum:", datum)
                return (
                        <ArchiveEntry
                            file_id={datum.file_id}
                            image_id={datum.image_id}
                            name={datum.name}
                            date={datum.date}
                        />
                );
            })}
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