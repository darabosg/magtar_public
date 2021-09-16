import React, { useState, useEffect, useContext } from 'react'
import './Summary.css'
import { Table } from 'react-bootstrap'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import SummaryLine from './SummaryLine'
import MessageContext from '../../../contexts/message'

const Summary = () => {
    const message = useContext(MessageContext)
    const [summary, setSummary] = useState(null)
           const [fetchData, response, error] = useAxiosAuth({
               method: 'get',
               url: '/api/instrument/summary',
           })

           useEffect(() => {
               if (response !== null) {
                    setSummary(response)
               }
               if (error) {
                   message(error.msg, 'danger')
               }
           }, [error, response])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='summary_table'>
            <Table striped bordered hover size='sm' variant='dark'>
                <thead className='instruments_thead'>
                    <tr>
                        <th rowSpan='2'>Scale</th>
                        <th rowSpan='2'>All</th>
                        <th rowSpan='2'>Stock</th>
                        <th rowSpan='2'>Order</th>
                        <th colSpan='2'>BP</th>
                        <th colSpan='2'>Győr</th>
                    </tr>
                    <tr>
                        <th>Stock</th>
                        <th>Order</th>
                        <th>Stock</th>
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    {summary &&
                        [...summary]
                            .sort((a, b) =>
                                a._id === 'CUSTOM'
                                    ? -1
                                    : b._ === 'CUSTOM'
                                    ? 1
                                    : a._id.localeCompare(b._id)
                            )
                            .map(instr => (
                                <SummaryLine key={instr._id} data={instr} />
                            ))}
                </tbody>
            </Table>
            {summary && <p>
                Sum:{' '}
                {summary.reduce(
                    (acc, i) =>
                        acc + i.stockBp + i.orderBp + i.stockGyor + i.orderGyor, 0
                )}
            </p>}
        </div>
    )
}

export default Summary
