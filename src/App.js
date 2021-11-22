import React, {useState} from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Archive from './pages/Archive';
import Upload from "./pages/Upload"
import Explore from './pages/Explore';

import {LoginPopContext, NavContext} from './context/GlobalContext';
import { ChakraProvider } from "@chakra-ui/react"

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

function App() {
    const [loginPop, setLoginPop] = useState(false);
    const [navState, setNavState] = useState("upload");

    return (
        <div className="h-100">
            <ChakraProvider>
            <NavContext.Provider value={{navState, setNavState}}>
            <LoginPopContext.Provider value={{loginPop, setLoginPop}}>
                <BrowserRouter>
                <Navigation />
                    <Routes>
                        <Route path="/" element={<Explore />} />
                        <Route path="/archive" element={<Archive />} />
                        <Route path="/upload" element={<Upload />} />
                    </Routes>
                </BrowserRouter>
            </LoginPopContext.Provider>
            </NavContext.Provider>
            </ChakraProvider>
        </div>
    );
}

export default App;
