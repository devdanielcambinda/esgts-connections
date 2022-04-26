import styles from './Login.module.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

const LoginPage = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const emailChangeHandler = (event) =>{
        setEmail(event.target.value)
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const submitHandler = async (event) =>{
        event.preventDefault()

        const loginInformation = { //short-hand object definition
            email,
            password
        }

        //db get req for auth token cookie

        setEmail('')
        setPassword('')
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='form-outline mb-4'>
                <label for='email' className='form-label'>E-mail:</label>
                <input type='email'  id='email' className='form-control' value={email} onChange={emailChangeHandler} required/>
            </div>
            <div className='for-outline mb-4 align-text-center'>
                <label className='form-label' for="password">Password:</label>
                <input type='password' id='password' className='form-control' value={password} onChange={passwordChangeHandler} required/>
            </div>
            
            <div className='d-grid'> 
                <button type='submit' className='btn btn-dark btn-block mb-4'>Login</button>
            </div>
            
        </form>
    )
    
    
};

export default LoginPage
