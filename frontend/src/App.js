import './App.css';
import Nav from './components/Nav';
import Tab from './components/Tab';

function App() {
    return (
        <div>
            <Nav />
            <div className='container'>
                <Tab />
            </div>
        </div>
    );
}

export default App;
