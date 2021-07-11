import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PeopleTrans.css'
export class PeopleTrans extends Component {

    render() {

        if ((this.props.load === false) && (this.props.camps.length > 0)) {
            return (
                <div>
                    <div className="track">
                        <Link to='/dashboard'><h3> HOME</h3></Link>
                    </div>
                    <div className="ctr" style={{ background: 'white' }}>
                        {this.props.transfers && this.props.transfers.map((transfer, index) => {
                            return (
                                <div className="each__pay" key={index}>
                                    <div className="pay_title" >
                                        <span className="pay__title_left" style={{ fontSize: '18px', fontWeight: '600' }} >{transfer.from}</span>
                                        <span className="pay__title_right" style={{ fontSize: '18px', fontWeight: '600' }} >Rs {transfer.amount}</span>
                                        <span className="pay__title_left">
                                            {this.props.camps[(transfer.campId) - 1]['campName']}
                                        </span>
                                    </div>
                                    <div className="pay_id" >
                                        <span className="pay__title_left" style={{ fontSize: '14px', fontWeight: '500', color: ' rgb(150, 150, 150)' }} >{transfer.to}</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>
            )
        } else {
            return (
                <div>Loading .....  Please wait for a while :')'</div>
            )
        }
    }
}

export default PeopleTrans
