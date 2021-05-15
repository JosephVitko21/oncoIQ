import React, {useState} from 'react';
import './App.css';
import Navig from './components/Navig';
import Tab from './components/Tab';
import Landing from './components/Landing';
import {LoginPopContext, NavContext} from './context/GlobalContext';

function App() {
    const [loginPop, setLoginPop] = useState(false);
    const [navState, setNavState] = useState("upload");

    return (
        <div className="h-100">
            <NavContext.Provider value={{navState, setNavState}}>
                <LoginPopContext.Provider value={{loginPop, setLoginPop}}>
                    <Navig />
                    <Landing />
                </LoginPopContext.Provider>
            </NavContext.Provider>
        </div>
    );
}

export default App;
