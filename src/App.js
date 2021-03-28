import React, {useState} from 'react';
import './App.css';
import Nav from './components/Nav';
import Tab from './components/Tab';
import Landing from './components/Landing';
import {LoginPopContext} from './context/GlobalContext';

function App() {
    const [loginPop, setLoginPop] = useState(false);

    return (
        <div className="h-100">
            <LoginPopContext.Provider value={{loginPop, setLoginPop}}>
                <Nav />
                <Landing />
            </LoginPopContext.Provider>
            <Tab />
        </div>
    );
}

export default App;
