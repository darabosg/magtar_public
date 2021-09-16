import React, { useState, useEffect } from 'react'
import './Instruments.css'
import { Table } from 'react-bootstrap'
import useAxiosAuth from '../../../hooks/useAxiosAuth'

import InstrLine from './InstrLine'

const Instruments = () => {
    const [instruments, setInstruments] = useState(null)
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
            console.log(error)
        }
    }, [error, response])

    return (
        <>
            <div className='subtitle'>
                <div className='filter'></div>
            </div>
            <div>
                <Table
                    className='instrument_table'
                    striped
                    bordered
                    hover
                    size='sm'
                    variant='dark'
                >
                    <thead className='instruments_thead'>
                        <tr>
                            <th>#</th>
                            <th>Purpose</th>
                            <th>Scale</th>
                            <th>B/M</th>
                            <th>Customisation</th>
                            <th>Material</th>
                            <th>Loc.</th>
                            <th>Status</th>
                            <th>No.</th>
                            <th>Deadline</th>
                            <th>ETA</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Package</th>
                            <th>Delivered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instruments &&
                            instruments.map(instr => (
                                <InstrLine
                                    setInstruments={setInstruments}
                                    key={instr._id}
                                    data={instr}
                                />
                            ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Instruments
