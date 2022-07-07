import axios from 'axios';
import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { useNavigate } from 'react-router-dom';
import { loginURL } from '../consts/consts';

const Auth: React.FC = () => {

    const [error, setError] = useState<Boolean>(false); 
    const navigate = useNavigate();

    const onSubmit = (
        values: {
            email: string;
            password: string;
        }) => {
        setError(false);
        axios
            .post(loginURL, {                
                login: values.email,
                password: values.password
            })
            .then((response) => {                                   
                localStorage.setItem('auth_key', response.data.data.auth_key);
                localStorage.setItem('username', response.data.data.username);
                navigate('/messages');
            })
            .catch((e) => {
                setError(true);
            })
    }

    return (
        <div className='auth'>
            <div className='auth-form'>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>

                            <div className='form-content'>

                                <div className='form-header'>
                                    <span className='form-title'>Pockets</span>
                                    <p className='welcome-text'>Welcome to Pockets! 👋🏻</p>
                                    <p className='sign-in-text'>Please sign-in to your account and start the adventure</p>
                                </div>

                                <div className='form-body'>

                                    <div className='email-area'>
                                        <label>Email</label>
                                        <Field
                                            name='email'
                                            component='input'
                                            placeholder='johndoe@gmail.com'>
                                        </Field>
                                    </div>

                                    <div className='password-area'>
                                        <div className='password-labels'>
                                            <label>Password</label>
                                            <label className='forgot-password'>
                                                Forgot Password?
                                            </label>
                                        </div>

                                        <Field
                                            name='password'
                                            type='password'
                                            component='input'
                                            placeholder='⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉'>
                                        </Field>

                                    </div>

                                    {error && <p>Ошибка! Неверный пароль</p>}

                                    <button type='submit'>Login</button>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        </div>
    )
}

export default Auth;
