import React, {useState} from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Archive from './pages/Archive';
import Post from "./pages/Post"
import AI from "./pages/AI"
import Explore from './pages/Explore';
import Case from './pages/Case'

import {LoginPopContext, NavContext} from './context/GlobalContext';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

function App() {
    const [loginPop, setLoginPop] = useState(false);
    const [navState, setNavState] = useState("upload");

    return (
        <div id="app">
            <NavContext.Provider value={{navState, setNavState}}>
            <LoginPopContext.Provider value={{loginPop, setLoginPop}}>
                <BrowserRouter>
                <Navigation />
                    <Routes>
                        <Route path="/" element={<Explore />} />
                        <Route path="/archive" element={<Archive />} />
                        <Route path="/ai" element={<AI />} />
                        <Route path="/post" element={<Post />} />
                        <Route path="/case" element={<Case />} />
                    </Routes>
                </BrowserRouter>
            </LoginPopContext.Provider>
            </NavContext.Provider>
        </div>
    );
}

export default App;
