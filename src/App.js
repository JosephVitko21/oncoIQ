import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Tab from './components/Tab';
import Login from './components/Login';
import { LoginContext } from './context/GlobalContext';

function App() {
    const [loggedin, setLogin] = useState(false);

    return (
        <div>
            <Nav />
            <LoginContext.Provider value={{loggedin, setLogin}}>
                <div className='container'>
                    <Login />
                    <Tab />
                </div>
            </LoginContext.Provider>
        </div>
    );
}

export default App;
