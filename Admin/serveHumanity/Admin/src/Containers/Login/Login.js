import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Login.css'
import { login } from '../../Actions/Admin'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = { email, password }
        dispatch(login(formData, history))//dispatch
    }

    const register = e => {
        e.preventDefault();
        history.push('/signin');
    }
    return (
        <div className="login">
            <div className='login__container' style={{marginBottom:'100px'}}>
                <h2>Login to your account</h2>

                <form onSubmit={handleSubmit}>
                    {/* <label>E-mail</label> */}
                    <input type='text'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder='Your email'
                    />

                    {/* <label>Password </label> */}
                    <input type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                    <div className='login__btn__ctr'>
                        <button style={{ width: '500px', backgroundColor: '#6c63ff', height: '50px', borderRadius: '17px', color: 'white', fontWeight: '600', }} >
                            CONTINUE
                </button>

                    </div>
                    <p style={{ fontWeight: '600', color: 'rgb(150, 150, 150)' }} >Don’t have an Account? <span onClick={register} style={{ color: '#6c63ff', cursor: 'pointer' }} ><strong>Sign Up</strong></span> </p>

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

export default Login
