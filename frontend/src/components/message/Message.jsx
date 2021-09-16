import React from 'react'
import Alert from 'react-bootstrap/Alert'
import './Message.css'

const Message = ({ alert, setAlert }) => {

    return (
        <div className='message'>
            <Alert show={alert.show} variant={alert.variant}>
                {alert.msg}
            </Alert>
        </div>
    )
}

export default Message
