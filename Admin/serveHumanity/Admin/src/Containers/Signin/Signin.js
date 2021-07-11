import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { signup } from '../../Actions/Admin'

export default function Signin() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()

        if (password === rePassword) {
            const formData = { email, password }
            dispatch(signup(formData,history))//dispatch
        }
    }


    const signIn = e => {
        e.preventDefault();
        history.replace('/login');
    }

    const register = e => {
        console.log('register')
    }

    return (
        <div className="login">
            <div className='login__container'>
                <h2>Create New Account</h2>

                <form onSubmit={handleSubmit}>
                    
                    <input type='text'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder='Your email'
                    />
                    <input type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                    <input type='password'
                        value={rePassword}
                        onChange={e => setRePassword(e.target.value)}
                        placeholder='Retype your Password'
                    />

                    <div className='login__btn__ctr'>
                        <button onClick={register} style={{ width: '500px', backgroundColor: '#6c63ff', height: '50px', borderRadius: '17px', color: 'white', fontWeight: '600', }} >
                            CONTINUE
                </button>

                    </div>
                    <p style={{ fontWeight: '600', color: 'rgb(150, 150, 150)' }} >Already have an Account? <span onClick={signIn} style={{ color: '#6c63ff', cursor: 'pointer' }} ><strong>Login</strong></span> </p>

                </form>
            </div>
            <div className='login__footer' >
                <span>Private policy </span>
                <div className='dot'  ></div>
                <span>Terms of use</span>
            </div>
        </div>
    )
}
