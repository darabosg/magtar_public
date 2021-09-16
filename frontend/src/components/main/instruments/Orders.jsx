import React, { useState, useEffect, useContext } from 'react'
import './Instruments.css'
import { Table } from 'react-bootstrap'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import MessageContext from '../../../contexts/message'
import OrderLine from './OrderLine'

const Orders = () => {
    const message = useContext(MessageContext)
    const [instruments, setInstruments] = useState(null)
    const [showDelivered, setShowDlivered] = useState(false)
    const [fetchData, response, error] = useAxiosAuth({
        method: 'get',
        url: '/api/instrument?order=true',
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
        <>
            <div className='subtitle'>
                <div className='filter'>
                    <label htmlFor='delivered'>Delivered:</label>
                    <input
                        type='checkbox'
                        id='delivered'
                        checked={showDelivered}
                        onChange={e => setShowDlivered(e.target.checked)}
                    />
                </div>
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
                            instruments
                                .filter(instr =>
                                    showDelivered
                                        ? true
                                        : !instr.order.delivered
                                )
                                .map(instr => (
                                    <OrderLine
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

export default Orders
