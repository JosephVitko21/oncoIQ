import React, {useState} from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Slides from './pages/Slides';
import Community from './pages/Community';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostButton from "./components/upload/PostButton";
import Thread from "./pages/Thread";
import Landing from "./pages/Landing";
import {useAuth} from "./auth";

function App() {
    const [logged] = useAuth();

    return (
        <div id="app" className='bg-navy'>
            <BrowserRouter>
                <Navigation />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/slides" element={<Slides />} />
                        <Route path="/thread" element={<Thread />} />
                    </Routes>
            </BrowserRouter>

            {logged ? <PostButton /> : null}

            <footer className="d-flex justify-content-center py-1" style={{backgroundColor:'#111111', marginTop:'120px'}}>
                <p className="m-0 text-left text-white">&copy; oncoIQ 2021</p>
            </footer>
        </div>
    );
}

export default App;
