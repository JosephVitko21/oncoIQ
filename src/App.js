import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Tab from './components/Tab';
import Login from './components/Login';
import { ArchContext } from './context/GlobalContext';

function App() {
    const [arch, setArch] = useState(false);

    return (
        <div>
            <Nav />
            <ArchContext.Provider value={{arch, setArch}}>
                <div className='container'>
                    <Login />
                    <Tab />
                </div>
            </ArchContext.Provider>
        </div>
    );
}

export default App;
