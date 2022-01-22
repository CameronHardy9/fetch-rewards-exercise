import uniqid from 'uniqid';
import {useState} from 'react';

const divStyling = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center'
};

const formStyling = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'flexSat', 
    flexGrow: 1
}

function Form(props) {
    const [formData, setFormData] = useState({
        name: undefined,
        email: undefined,
        password: undefined,
        occupation: undefined,
        state: undefined
    })

    return(
        <>
            <form style={formStyling}>
                <div style={divStyling}>
                    <input type="text" name="name" id="name" placeholder='Full Name' autoFocus required />
                </div>
                <div style={divStyling}>
                    <input type="email" name="email" id="email" placeholder='Email' required />
                </div>
                <div style={divStyling}>
                    <input type="password" name="password" id="password" placeholder='Password' required />
                </div>
                <div style={divStyling}>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' required />
                </div>
                <div style={divStyling}>
                    <select name="occupation" id="occupation" defaultValue='' required>
                        <option value='' disabled>Select an occupation</option>
                        {
                            props.occupations.map((item) => {
                                return(
                                    <option key={uniqid()} value={item.toLowerCase().replace(' ', '-')}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div style={divStyling}>
                    <select name="state" id="state" defaultValue='' required>
                        <option value='' disabled>Select your state</option>
                        {
                            props.states.map((item) => {
                                return(
                                    <option key={uniqid()} value={item.name.toLowerCase()}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
};

export default Form;