import uniqid from 'uniqid';
import {useNavigate} from 'react-router';
import {useState} from 'react';
import apiHandler from '../utils/apiHandler';
import BlankFieldAlert from './BlankFieldAlert';
import EmailAlert from './EmailAlert';
import PasswordAlert from './PasswordAlert';

function Form(props) {
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        occupation: false,
        state: false
    })

    const [formData, setFormData] = useState({
        name: undefined,
        email: undefined,
        password: undefined,
        occupation: undefined,
        state: undefined
    })

    const [validate, setValidate] = useState(false);

    const handleInput = (c) => {
        c.target.style.border = '';
        setFormData({...formData,
        [c.target.name]: c.target.value});
    }

    const handleEmail = (c) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const validate = c.target.value.match(regex);
        if(validate) {
            c.target.style.border = '';
            setFormData({...formData,
                email: c.target.value});
            setShowAlert({...showAlert,
                email: false
            });
        } else {
            c.target.style.border = '0.2rem solid red'
            setFormData({...formData,
                email: undefined});
            setShowAlert({...showAlert,
                email: true
            });
        }
    }

    const handlePassword = (c) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        const validate = c.target.value.match(regex);
        if(validate) {
            c.target.style.border = '';
            setShowAlert({...showAlert,
                password: false
            });
            setValidate(true);
        } else {
            c.target.style.border = '0.2rem solid red';
            setShowAlert({...showAlert,
                password: true
            });
            setValidate(false);
            setFormData({...formData,
                password: undefined});
        }
    };

    const handleConfirmPassword = (c) => {
        const password = document.querySelector('#password');
        if(password.value === c.target.value && validate) {
            c.target.style.border = '';
            setShowAlert({...showAlert,
                confirmPassword: false
            });
            setFormData({...formData,
                password: password.value});
        } else {
            c.target.style.border = '0.2rem solid red';
            setShowAlert({...showAlert,
                confirmPassword: true
            });
            setFormData({...formData,
                password: undefined});
        }
    };

    const handleSubmit = () => {
        let formCompleted = true;
        let newState = {...showAlert};
        for (const item in formData) {
            if (!formData[item]) {
                document.querySelector(`#${item}`).style.border = '0.2rem solid red';
                
                newState = {...newState,
                [item]: true};

                formCompleted = false;
            }
        }
        setShowAlert(newState);
        
        if (formCompleted) {
            (async () => {
                const response = await apiHandler("POST", formData);
                if (response.status === 200) {
                    props.handleFormComplete();
                    navigate('/success');
                } else {
                    navigate('/error');
                }
            })()
        }
    }

    return(
        <>
            <div className='container'>
                <h1 className='heading'>Create New User</h1>
                <form className='form'>
                        <input className='field' type="text" name="name" id="name" placeholder='Full Name' autoFocus required onBlur={(c) => handleInput(c)} />
                        {showAlert.name && <BlankFieldAlert />}
                        <input className='field' type="email" name="email" id="email" placeholder='Email' required onBlur={(c) => handleEmail(c)} />
                        {showAlert.email && <EmailAlert />}
                        <input className='field' type="password" name="password" id="password" placeholder='Password' required onBlur={(c) => {
                            handlePassword(c);
                        }} />
                        {showAlert.password && <PasswordAlert field={"password"} />}
                        <input className='field' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' required onBlur={(c) => {
                            handleConfirmPassword(c);
                        }} />
                        {showAlert.confirmPassword && <PasswordAlert field={"confirmPassword"} />}
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
                        {showAlert.occupation && <BlankFieldAlert />}
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
                        {showAlert.state && <BlankFieldAlert />}
                    <button className='submitButton' type='button' formNoValidate onClick={() => handleSubmit()}>Submit</button>
                </form>
            </div>
        </>
    )
};

export default Form;