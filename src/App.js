import React, {useState} from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Landing from './pages/Landing';
import Archive from './pages/Archive';
import Explore from './pages/Explore';
import Case from './pages/Case'

import {LoginPopContext, NavContext} from './context/GlobalContext';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import PostButton from "./components/upload/PostButton";

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
                            <Route path="/case" element={<Case />} />
                        </Routes>
                </BrowserRouter>
            </LoginPopContext.Provider>
            </NavContext.Provider>
            <PostButton />
        </div>
    );
}

export default App;
