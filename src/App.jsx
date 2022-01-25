import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Form from './components/Form';
import Success from './components/Success';
import apiHandler from './utils/apiHandler';

function App() {
    const [loaded, setLoaded] = useState(false);
    const [states, setStates] = useState(undefined);
    const [occupations, setOccupations] = useState(undefined);
    const [formComplete, setFormComplete] = useState(false);

    useEffect(() => {
        console.log("effect");
        (async () => {
            const fieldData = await apiHandler("GET");

            if (fieldData.occupations && fieldData.states) {
                setStates(fieldData.states);
                setOccupations(fieldData.occupations);
                setLoaded(true);
            }
        })();
    }, [])

    const handleFormComplete = () => {
        setFormComplete(true);
    };

    return (
        <>
            {loaded ? (
                <Routes>
                    <Route path="/" element={<Form states={states} occupations={occupations} handleFormComplete={handleFormComplete} />} />
                    <Route path="/success" element={<Success formComplete={formComplete} />} />
                </Routes>
            ) : (
                <div className="loaderContainer">
                    <div className='dotLoader'></div>
                </div>
            )}
            
        </>
    );
}

export default App;
