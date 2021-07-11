import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './ShowRequest.css'
import CheckIcon from '@material-ui/icons/Check';
import ClearTwoToneIcon from '@material-ui/icons/Clear';
import { API } from '../../../../Api/Api';
import { updRequest } from '../../../../Actions/Request';
import { useDispatch } from 'react-redux'

const ShowRequest = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [request, setRequest] = useState([])

    useEffect(() => {

        async function fetchRequest() {
            const response = await API.get('/request')
            setRequest(response.data);

            return response;
        }

        fetchRequest();
    }, [])

    const handleDecison = (email, decision) => (e) => {
        e.preventDefault()
        const formData = { email, decision }
        dispatch(updRequest(formData, history))
    }

    return (
        <div className="page">
            <div className="head">
                <Link to='/dashboard'><span>HOME</span></Link>
            </div>
            <div className="down">
                {request.map(({ _id, username, email, phone, organization, createdAt, result }) => (
                    <div className="card" key={_id}>
                        <div>
                            <span>Name : {username} </span>
                            <span>Email : {email}</span>
                            <span>Mobile No : {phone} </span>
                            <span>Organization : {organization} </span>
                            <span>Data & Time : {(createdAt.slice(0, 10))} {(createdAt.slice(11, 16))}  </span>
                            {result ? (
                                (result === "accepted") ? (<span style={{ color: 'green', border: '3px solid green', fontSize: '16px', fontWeight: '700', borderRadius: '16px', textAlign: 'center', marginTop: '24px' }}>ACCEPTED</span>)
                                    :
                                    (<span style={{ color: 'red', border: '3px solid red', fontSize: '16px', fontWeight: '700', borderRadius: '16px', textAlign: 'center' }}>REJECTED</span>)
                            ) : (
                                <>
                                    <div className="perform">
                                        <span><button style={{ background: 'white', cursor: 'pointer' }} onClick={handleDecison(email, "accepted")} >
                                            <CheckIcon style={{ color: '#6C63FF', border: '2px solid #6C63FF', fontSize: '40' }} />
                                        </button></span>
                                        <span><button style={{ background: 'white', cursor: 'pointer' }} onClick={handleDecison(email, "rejected")}>
                                            <ClearTwoToneIcon style={{ color: 'red', border: '2px solid red', fontSize: '40' }} />
                                        </button></span>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                )
                )}

            </div>
        </div>
    )
}

export default ShowRequest