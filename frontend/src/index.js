import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import UserContext from './contexts/user'
import MessageContext from './contexts/message'
import ProtectedRoute from './components/ProtectedRoute'
import axios from 'axios'
import Message from './components/message/Message'
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

const Index = () => {
    const [alert, setAlert] = useState({
        show: false,
        msg: '',
        variant: '',
    })
    const [user, setUser] = useState(null)

    const message = (msg, variant) => {
        setAlert(prevState => {
            return { show: true, msg: msg, variant: variant }
        })
        setTimeout(() => {
            setAlert(prevState => {
                return { ...prevState, show: false }
            })
        }, 2000)
    }

    const setLoggedIn = () => {
        let jwt = localStorage.getItem('token')
        if (jwt) {
            setUser(jwtDecode(jwt))
        }
    }

    useEffect(() => {
        setLoggedIn()
    }, [])

    return (
        <>
            {/* <React.StrictMode> */}
            <MessageContext.Provider value={message}>
                <Router>
                    <Switch>
                        <Route path='/login'>
                            <Login setLoggedIn={setLoggedIn} />
                        </Route>
                        <ProtectedRoute path='/'>
                            <UserContext.Provider value={{ user, setUser }}>
                                <App setLoggedIn={setLoggedIn} />
                            </UserContext.Provider>
                        </ProtectedRoute>
                    </Switch>
                </Router>
                <Message alert={alert} setAlert={setAlert} />
            </MessageContext.Provider>
            {/* </React.StrictMode> */}
        </>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))
