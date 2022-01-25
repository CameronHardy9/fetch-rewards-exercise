import uniqid from 'uniqid';
import { useNavigate } from 'react-router';
import {useState} from 'react';
import apiHandler from '../utils/apiHandler';

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
        c.target.style.border = ''
        setFormData({...formData,
        [c.target.name]: c.target.value});
    }

    const handlePassword = (c) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        const validate = c.target.value.match(regex);
        if(validate) {
            c.target.style.border = ''
            setValidate(true);
        } else {
            c.target.style.border = '0.2rem solid red'
            setValidate(false);
            setFormData({...formData,
                password: undefined});
        }
    };

    const handleValidation = (c) => {
        const password = document.querySelector('#password');
        if(password.value === c.target.value && validate) {
            c.target.style.border = ''
            setFormData({...formData,
                password: password.value});
        } else {
            c.target.style.border = '0.2rem solid red'
            setFormData({...formData,
                password: undefined});
        }
    };

    const handleSubmit = () => {
        let formCompleted = true;
        for (const item in formData) {
            if (!formData[item]) {
                document.querySelector(`#${item}`).style.border = '0.2rem solid red';
                formCompleted = false;
            }
        }
        if (formCompleted) {
            //(async () => {
            //    const response = await apiHandler("POST", formData);
            //    console.log(response);
            //})()

            props.handleFormComplete();
            navigate('/success');
        }
    }

    return(
        <>
            <div className='container'>
                <h1 className='heading'>Create New User</h1>
                <form className='form'>
                        <input className='field' type="text" name="name" id="name" placeholder='Full Name' autoFocus required onBlur={(c) => handleInput(c)} />
                        <input className='field' type="email" name="email" id="email" placeholder='Email' required onBlur={(c) => handleInput(c)} />
                        <input className='field' type="password" name="password" id="password" placeholder='Password' required onBlur={(c) => {
                            handlePassword(c);
                        }} />
                        <input className='field' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' required onBlur={(c) => {
                            handleValidation(c);
                        }} />
                        <select className='field' name="occupation" id="occupation" defaultValue='' required onBlur={(c) => handleInput(c)} >
                            <option value='' disabled>Select an occupation</option>
                            {
                                props.occupations.map((item) => {
                                    return(
                                        <option key={uniqid()} value={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='field' name="state" id="state" defaultValue='' required onBlur={(c) => handleInput(c)} >
                            <option value='' disabled>Select your state</option>
                            {
                                props.states.map((item) => {
                                    return(
                                        <option key={uniqid()} value={item.name}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    <button className='submitButton' type='button' formNoValidate onClick={() => handleSubmit()}>Submit</button>
                </form>
            </div>
        </>
    )
};

export default Form;