import React, { useState } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Slides from './pages/Slides';
import Community from './pages/Community';
import Thread from "./pages/Thread";
import Landing from "./pages/Landing";
import PostButton from "./components/upload/PostButton";
import Navigation from './components/nav/Navigation';
import Footer from './components/landing/Footer';

import { useAuth } from "./auth";
import theme from "./styles/theme";

function App() {
    const [logged] = useAuth();

    return (
        <div>
            <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Navigation />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/slides" element={<Slides />} />
                        <Route path="/thread" element={<Thread />} />
                    </Routes>
            </BrowserRouter>

            <Footer />
            {logged ? <PostButton /> : null}
            </ChakraProvider>
        </div>
    );
}

export default App;
