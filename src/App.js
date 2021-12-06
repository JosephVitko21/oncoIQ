import React, {useState} from 'react';
import './App.css';
import Navigation from './components/nav/Navigation';
import Slides from './pages/Slides';
import Community from './pages/Community';

import {LoginPopContext, NavContext} from './context/GlobalContext';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import PostButton from "./components/upload/PostButton";
import Thread from "./pages/Thread";
import Landing from "./pages/Landing";
import {useAuth} from "./auth";

function App() {
    const [loginPop, setLoginPop] = useState(false);
    const [navState, setNavState] = useState("upload");
    const [logged] = useAuth();

    return (
        <div id="app" className='bg-navy'>
            <NavContext.Provider value={{navState, setNavState}}>
            <LoginPopContext.Provider value={{loginPop, setLoginPop}}>
                <BrowserRouter>
                    <Navigation />
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/slides" element={<Slides />} />
                            <Route path="/thread" element={<Thread />} />
                        </Routes>
                </BrowserRouter>
            </LoginPopContext.Provider>
            </NavContext.Provider>
            {logged ? <PostButton /> : <></>}

        </div>
    );
}

export default App;
