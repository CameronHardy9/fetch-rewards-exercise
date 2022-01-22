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
    justifyContent: 'space-around', 
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
                    <label htmlFor='name'>Full Name</label>
                    <input type="text" name="name" id="name" required />
                </div>
                <div style={divStyling}>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div style={divStyling}>
                    <label htmlFor='password'>Create Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div style={divStyling}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" required />
                </div>
                <div style={divStyling}>
                    <label htmlFor='occupation'>Occupation</label>
                    <select name="occupation" id="occupation" required>
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
                    <label htmlFor='state'>State</label>
                    <select name="state" id="state" required>
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