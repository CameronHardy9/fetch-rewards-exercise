import uniqid from 'uniqid';
import {useState} from 'react';

function Form(props) {
    const [formData, setFormData] = useState({
        name: undefined,
        email: undefined,
        password: undefined,
        occupation: undefined,
        state: undefined
    })

    const [validate, setValidate] = useState(false);

    const handleInput = (c) => {
        setFormData({...formData,
        [c.target.name]: c.target.value});
    }

    const handlePassword = (c) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        const validate = c.target.value.match(regex);
        if(validate) {
            c.target.style.borderColor = '';
            setValidate(true);
        } else {
            c.target.style.borderColor = 'red';
            setValidate(false);
            setFormData({...formData,
                password: undefined});
        }
    };

    const handleValidation = (c) => {
        const password = document.querySelector('#password');
        if(password.value === c.target.value && validate) {
            c.target.style.borderColor = '';
            setFormData({...formData,
                password: password.value});
            console.log(formData);
        } else {
            c.target.style.borderColor = 'red';
            setFormData({...formData,
                password: undefined});
        }
    };

    return(
        <>
            <form className='form'>
                <div className='field'>
                    <input type="text" name="name" id="name" placeholder='Full Name' autoFocus required onBlur={(c) => handleInput(c)} />
                </div>
                <div className='field'>
                    <input type="email" name="email" id="email" placeholder='Email' required onBlur={(c) => handleInput(c)} />
                </div>
                <div className='field'>
                    <input type="password" name="password" id="password" placeholder='Password' required onBlur={(c) => {
                        handlePassword(c);
                    }} />
                </div>
                <div className='field'>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' required onBlur={(c) => {
                        handleValidation(c);
                    }} />
                </div>
                <div className='field'>
                    <select name="occupation" id="occupation" defaultValue='' required onBlur={(c) => handleInput(c)} >
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
                <div className='field'>
                    <select name="state" id="state" defaultValue='' required onBlur={(c) => handleInput(c)} >
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