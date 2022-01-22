import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Form from './components/Form';
import Success from './components/Success';

function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {loaded ? (
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            ) : (
                <h1>Loading...</h1>
            )}
            
        </>
    );
}

export default App;
