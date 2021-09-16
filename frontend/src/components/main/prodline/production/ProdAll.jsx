import React, { useState } from 'react'

import { Table } from 'react-bootstrap'
import ProdAllLine from './ProdAllLine'

const ProdAll = ({ instruments }) => {
    const [showDone, setShowDone] = useState(false)

    return (
        <div>
            <div className='subtitle'>
                <h4>Production</h4>
                <div className='filter'>
                    <label htmlFor='showdone'>Show done: </label>
                    <input
                        id='showdone'
                        checked={showDone}
                        onChange={e => setShowDone(e.target.checked)}
                        type='checkbox'
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
                        <th>Deadline</th>
                        <th>Drawed T/B</th>
                        <th>Dimpled T/B</th>
                        <th>Shaped T/B</th>
                        <th>Tuned T/B</th>
                        <th>Glued</th>
                        <th>Flexed</th>
                        <th>Fine-tuned</th>
                        <th>Nanoed</th>
                        <th>100%</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instruments &&
                        instruments
                            .filter(instr =>
                                !showDone ? !instr.process.whole.finish.status : true
                            )
                            .map(instr => (
                                <ProdAllLine
                                    key={instr._id}
                                    data={instr}
                                />
                            ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ProdAll
