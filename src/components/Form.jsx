import uniqid from 'uniqid';
import { useNavigate } from 'react-router';
import {useState} from 'react';

function Form(props) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: undefined,
        email: undefined,
        password: undefined,
        occupation: undefined,
        state: undefined
    })

    const [validate, setValidate] = useState(false);

    const handleInput = (c) => {
        c.target.style.borderColor = '';
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

    const handleSubmit = () => {
        let formCompleted = true;
        for (const item in formData) {
            if (!formData[item]) {
                document.querySelector(`#${item}`).style.borderColor = 'red';
                formCompleted = false;
            }
        }
        if (formCompleted) {
            navigate('success');
        }
    }

    return(
        <div className='container'>
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
                                    <option key={uniqid()} value={item}>{item}</option>
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
                                    <option key={uniqid()} value={item.name}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button type='button' formNoValidate onClick={() => handleSubmit()}>Submit</button>
            </form>
        </div>
    )
};

export default Form;