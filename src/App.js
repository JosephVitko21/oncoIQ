import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Tab from './components/Tab';
import Login from './components/Login';
import { ArchContext } from './context/GlobalContext';
import {Helmet} from "react-helmet";

function App() {
    const [arch, setArch] = useState(false);

    return (
        <div>
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Helmet>
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
