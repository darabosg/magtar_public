import React, { useState, useEffect, useContext } from 'react'
import './Instruments.css'
import { Table } from 'react-bootstrap'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import MessageContext from '../../../contexts/message'
import StockLine from './StockLine'

const Stock = () => {
    const message = useContext(MessageContext)
    const [showInProgress, setShowInProgress] = useState(false)
    const [scaleFilter, setScaleFilter] = useState('')
    const [instruments, setInstruments] = useState(null)
    const [fetchData, response, error] = useAxiosAuth({
        method: 'get',
        url: '/api/instrument?order=false',
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
            <div>
                <div className='subtitle'>
                    <div className='filter'>
                        <label htmlFor='inprogress'>In progress:</label>
                        <input
                            type='checkbox'
                            id='inprogress'
                            checked={showInProgress}
                            onChange={e => setShowInProgress(e.target.checked)}
                        />
                    </div>
                    <div className='filter'>
                        <label htmlFor='scalefilter'>Scale:</label>
                        <input
                        className='filter_input'
                            type='text'
                            id='scalefilter'
                            checked={scaleFilter}
                            onChange={e => setScaleFilter(e.target.value)}
                        />
                    </div>
                </div>
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
                            <th>ETA</th>
                            <th>No.</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instruments &&
                            instruments
                                .filter(instr =>
                                    showInProgress
                                        ? true
                                        : instr.process.whole.finish.status
                                )
                                .filter(instr =>
                                    instr.instrument.scale
                                        .toLowerCase()
                                        .includes(scaleFilter.toLowerCase())
                                )
                                .map(instr => (
                                    <StockLine
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

export default Stock
