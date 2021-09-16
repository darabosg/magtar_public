import React, { useState, useEffect, useContext } from 'react'
import { Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import useAxiosAuth from './hooks/useAxiosAuth'
import Header from './components/Header'
import Nav from './components/Nav'
import Create from './components/main/create/Create'
import Home from './components/main/Home'
import ProdLine from './components/main/prodline/Production'
import Instruments from './components/main/instruments/Instruments'
import Orders from './components/main/instruments/Orders'
import Stock from './components/main/instruments/Stock'
import Users from './components/main/users/Users'
import Settings from './components/main/settings/Settings'
import ConfigContext from './contexts/config'
import MainContainer from './components/main/MainContainer'
import Summary from './components/main/summary/Summary'
import MessageContext from './contexts/message'

function App() {
    const message = useContext(MessageContext)
    const [feConfig, setFeConfig] = useState(null)
    const [fetchData, response, error] = useAxiosAuth({
        method: 'get',
        url: '/api/config',
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
       if (response !== null) {
           setFeConfig(response)
       }
       if (error) {
           message(error.msg, 'danger')
       }
    }, [error, response])

    return (
        <div className='App'>
            <Nav />
            <div className='content'>
                <Header />
                <ConfigContext.Provider value={{ feConfig, setFeConfig }}>
                    <Switch>
                        <MainContainer
                            header='Create instrument'
                            path='/create'
                        >
                            <Create />
                        </MainContainer>
                        <MainContainer header='Instruments' path='/instruments'>
                            <Instruments />
                        </MainContainer>
                        <MainContainer header='Orders' path='/orders'>
                            <Orders />
                        </MainContainer>
                        <MainContainer exact header='Stock' path='/stock'>
                            <Stock />
                        </MainContainer>
                        <MainContainer exact header='Summary' path='/summary'>
                            <Summary />
                        </MainContainer>
                        <MainContainer path='/prodline'>
                            <ProdLine />
                        </MainContainer>
                        <MainContainer header='Users' path='/users'>
                            <Users />
                        </MainContainer>
                        <MainContainer header='Settings' path='/settings'>
                            <Settings />
                        </MainContainer>
                        <Router exact path='/'>
                            <Home />
                        </Router>
                    </Switch>
                </ConfigContext.Provider>
            </div>
        </div>
    )
}

export default App
