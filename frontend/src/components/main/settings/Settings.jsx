import React, { useState, useContext, useEffect } from 'react'
import ConfigContext from '../../../contexts/config'
import './Settings.css'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import { Button } from 'react-bootstrap'
import SettingsList from './SettingsList'
import MessageContext from '../../../contexts/message'

const Settings = () => {
    const message = useContext(MessageContext)
    const { feConfig, setFeConfig } = useContext(ConfigContext)
    const [tempConfig, setTempConfig] = useState(null)

    const [fetchData, response, error] = useAxiosAuth({
        method: 'post',
        url: '/api/config',
        body: tempConfig,
    })

    useEffect(() => {
        if (response !== null) {
            setFeConfig(tempConfig)
            message(response.msg, 'success')
        }
        if (error) {
            message(error.msg, 'danger')
        }
    }, [error, response])

    const saveConfig = () => {
        fetchData()
    }

    const discard = () => {
        setTempConfig(feConfig)
        message('Changes discarded!', 'success')
    }

    useEffect(() => {
        setTempConfig(feConfig)
    }, [feConfig])

    return (
        <>
            <Button className='subnav_button' onClick={saveConfig}>
                Save
            </Button>
            <Button
                className='subnav_button'
                variant='danger'
                onClick={discard}
            >
                Discard changes
            </Button>
            <div className='cards'>
                {feConfig &&
                    tempConfig &&
                    Object.keys(tempConfig)
                        .sort((a, b) =>
                            b === 'scales' ? 1 : b === 'makers' ? 1 : -1
                        )
                        .map(
                            (list, i) =>
                                list !== '_id' && (
                                    <SettingsList
                                        key={i}
                                        list={list}
                                        tempConfig={tempConfig}
                                        setTempConfig={setTempConfig}
                                    />
                                )
                        )}
            </div>
        </>
    )
}

export default Settings
