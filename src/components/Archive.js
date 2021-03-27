import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import sample from './sample.png';
import { ArchContext } from '../context/GlobalContext';
import ImageList from "./ImageList";

export default function Archive() {
    return (
        <ImageList />
    )
}
