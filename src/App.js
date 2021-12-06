import React, {useState} from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Archive from './pages/Archive';
import Explore from './pages/Explore';

import {LoginPopContext, NavContext} from './context/GlobalContext';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import PostButton from "./components/upload/PostButton";
import Thread from "./pages/Thread";

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
                            <Route path="/thread" element={<Thread />} />
                        </Routes>
                </BrowserRouter>
            </LoginPopContext.Provider>
            </NavContext.Provider>
            <PostButton />
        </div>
    );
}

export default App;
