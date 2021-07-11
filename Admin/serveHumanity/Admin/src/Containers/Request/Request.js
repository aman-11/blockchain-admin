import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { request } from '../../Actions/Request'
export default function Signin() {
    const history = useHistory();
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [organization, setOrganization] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = { username, email, phone, organization }
        dispatch(request(formData,history))
    }


    return (
        <div className="login">
            <div className='login__container'>
                <h2>Submit Request for Donation</h2>

                <form onSubmit={handleSubmit}>
                    <input type='text'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        placeholder='Your name'
                    />
                    <input type='text'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder='Your email'
                    />

                    <input type='text'
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                        placeholder='Mobile No'
                    />

                    <input type='text'
                        value={organization}
                        onChange={event => setOrganization(event.target.value)}
                        placeholder='Your Organisation'
                    />

                    <div className='login__btn__ctr'>
                        <button style={{ width: '500px', backgroundColor: '#007bff', height: '50px', borderRadius: '17px', color: 'white', fontWeight: '600', }} >
                            SUBMIT REQUEST
                </button>

                    </div>

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
