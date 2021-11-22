import React, {useState} from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Archive from './pages/Archive';
import Upload from "./pages/Upload"
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
        <div className="h-100">
            <NavContext.Provider value={{navState, setNavState}}>
                <LoginPopContext.Provider value={{loginPop, setLoginPop}}>
                    <BrowserRouter>
                    <Navigation />
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/archive" element={<Archive />} />
                            <Route path="/upload" element={<Upload />} />
                        </Routes>
                    </BrowserRouter>
                </LoginPopContext.Provider>
            </NavContext.Provider>
        </div>
    );
}

export default App;
