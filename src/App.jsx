import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Form from './components/Form';
import Success from './components/Success';
import apiHandler from './utils/apiHandler';

function App() {
    //State hook for all dropdown field loading
    const [loaded, setLoaded] = useState(false);
    //State dropdown
    const [states, setStates] = useState(undefined);
    //Occupations dropdown
    const [occupations, setOccupations] = useState(undefined);
    //Validation for completed form to limit 'success page' access
    const [formComplete, setFormComplete] = useState(false);

    useEffect(() => {
        //Fetch dropdown field data and save in state
        (async () => {
            const fieldData = await apiHandler("GET");

            if (fieldData.occupations && fieldData.states) {
                //Update load status and dropdowns if dropdown field data is present
                setStates(fieldData.states);
                setOccupations(fieldData.occupations);
                setLoaded(true);
            }
        })();
    }, [])

    //Update state once form is validated as complete by child component 'Form.jsx'
    const handleFormComplete = () => {
        setFormComplete(true);
    };

    return (
        <>
            {/* Conditionally render pages after field data is returned from server - show CSS loader until true */}
            {loaded ? (
                <Routes>
                    <Route path="/" element={<Form states={states} occupations={occupations} handleFormComplete={handleFormComplete} />} />
                    <Route path="/success" element={<Success formComplete={formComplete} />} />
                    <Route path="/error" element={<h1>Error: Something went wrong. Please try again later.</h1>} />
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
