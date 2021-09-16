import React, { useState } from 'react'
// import './Shaping.css'
import { Table } from 'react-bootstrap'
import ShapeLine from './ShapeLine'

const Shaping = ({ instruments, setInstruments }) => {
    const [showDone, setShowDone] = useState(false)

    return (
        <div>
            <div className='subtitle'>
                <h4>Shaping</h4>
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
                        <th>Scale</th>
                        <th>Customisation</th>
                        <th>Drawed T/B</th>
                        <th>Dimpled T/B</th>
                        <th>Shaped T/B</th>
                        <th>Tuner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instruments &&
                        instruments
                            .filter(instr =>
                                !showDone
                                    ? instr.instrument.hasBottom
                                        ? !instr.process.top.shape.status ||
                                          !instr.process.bottom.shape.status ||
                                          instr.process.tuner===''
                                        : !instr.process.top.shape.status ||
                                          instr.process.tuner===''
                                    : true
                            )
                            .map(instr => (
                                <ShapeLine
                                    setInstruments={setInstruments}
                                    key={instr._id}
                                    data={instr}
                                />
                            ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Shaping
