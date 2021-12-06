import React, {useEffect, useState} from 'react';
import googleDomain from "../../../utils/google-drive-domain";
import TileGrid from "../../archive/dialog/TileGrid";
import {makeAuthenticatedRequest} from "../../../utils/middleware";
import {Card, Col, Row} from "react-bootstrap";
import moment from "moment";
import PostFooter from "./PostFooter";

export default function PostCard(props) {
    const [data, setData] = useState({})

    const getData = () => {
        makeAuthenticatedRequest('GET', '/images/' + props.image_id)
            .then(r => {
                setData(r)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Card className='mb-4'>
            <Card.Header>
                <Card.Title className='mt-2'>
                    {data.name}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} className="mt-4 mb-4">
                    <div style={{width: '50%'}}>
                        <TileGrid
                            tiles={data.tiles}
                            id={data.image_id}
                            image_url={googleDomain + data.file_id}
                            num_rows={data.num_rows}
                            num_cols={data.num_cols}
                            showSlider={true}
                        />
                    </div>
                </div>
                {data.description}
            </Card.Body>

            <Card.Footer>
                <PostFooter
                    poster = {data.uploader}
                    job={data.uploader_job}
                    profilePic={data.uploader_profile_pic}
                    date={data.date}
                />
            </Card.Footer>
        </Card>
    );
}
