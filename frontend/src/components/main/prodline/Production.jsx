import React, { useState, useEffect, useContext } from 'react'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import { Switch, NavLink, Route, useRouteMatch } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import ProdAll from './production/ProdAll'
import Shaping from './shaping/Shaping'
import Tuning from './tuning/Tuning'
import Gluing from './gluing/Gluing'
import './Production.css'
import MessageContext from '../../../contexts/message'

const ProdLine = () => {
    const message = useContext(MessageContext)
    const [instruments, setInstruments] = useState(null)
    let { path, url } = useRouteMatch()

    const [fetchData, response, error] = useAxiosAuth({
        method: 'get',
        url: '/api/instrument',
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (response !== null) {
            setInstruments(response)
        }
        if (error) {
            message(error.msg, 'danger')
        }
    }, [error, response])

    return (
        <div>
            <div>
                <NavLink to={`${url}`}>
                    <Button className='subnav_button'>Production</Button>
                </NavLink>

                <NavLink to={`${url}/shaping`}>
                    <Button className='subnav_button'>Shaping</Button>
                </NavLink>

                <NavLink to={`${url}/tuning`}>
                    <Button className='subnav_button'>Tuning</Button>
                </NavLink>

                <NavLink to={`${url}/gluing`}>
                    <Button className='subnav_button'>Glue/Flex/Nano</Button>
                </NavLink>
            </div>

            <Switch>
                <Route exact path={`${path}`}>
                    <ProdAll instruments={instruments} />
                </Route>
                <Route path={`${path}/shaping`}>
                    <Shaping
                        instruments={instruments}
                        setInstruments={setInstruments}
                    />
                </Route>
                <Route path={`${path}/tuning`}>
                    <Tuning
                        instruments={instruments}
                        setInstruments={setInstruments}
                    />
                </Route>
                <Route path={`${path}/gluing`}>
                    <Gluing
                        instruments={instruments}
                        setInstruments={setInstruments}
                    />
                </Route>
            </Switch>
        </div>
    )
}

export default ProdLine
