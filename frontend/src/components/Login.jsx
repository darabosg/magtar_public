import React, { useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import MessageContext from '../contexts/message'
import './Login.css'
import logo from '../img/logo.png'

const Login = ({ setLoggedIn }) => {
    const message = useContext(MessageContext)
    let history = useHistory()
    const code = new URLSearchParams(useLocation().search).get('code')

    useEffect(() => {
        if (code) {
            axios
                .post('/api/user/login', { code })
                .then(res => {
                    localStorage.setItem('token', res.data.token)

                    message('Login successful', 'success')
                })
                .then(res => {
                    setLoggedIn()
                    history.push('/')
                })
                .catch(error => message(error.response.data.msg, 'danger'))
        }
    }, [])

    const googleLogin = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=openid%20profile email&redirect_uri=${process.env.REACT_APP_LOGIN_REDIRECT}`
    }

    return (
        <div className="login_container">
            <div className='login_box box'>
                <img className='login_logo' src={logo} alt='mag_logo' />
                <div
                    onClick={googleLogin}
                    id='customBtn'
                    className='customGPlusSignIn'
                >
                    <span className='icon'></span>
                    <span className='buttonText'>Google login</span>
                </div>
            </div>
        </div>
    )
}

export default Login
