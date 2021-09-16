import React, { useState } from 'react'
// import './Shaping.css'
import { Table } from 'react-bootstrap'
import TuneLine from './TuneLine'

const Tuning = ({ instruments, setInstruments }) => {
    const [showDone, setShowDone] = useState(false)
    const [showNotReady, setShowNotReady] = useState(false)

    return (
        <div>
            <div className='subtitle'>
                <h4>Tuning</h4>
                <div className='filter'>
                    <label htmlFor='showdone'>Done: </label>
                    <input
                        id='showdone'
                        checked={showDone}
                        onChange={e => setShowDone(e.target.checked)}
                        type='checkbox'
                    /></div>
                    <div className="filter"> <label htmlFor='shownotready'>Not ready for tuneing: </label>
                    <input
                        id='shownotready'
                        checked={showNotReady}
                        onChange={e => setShowNotReady(e.target.checked)}
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
                        <th>Tuner</th>
                        <th>Tuned T/B</th>
                        <th>Glued</th>
                        <th>No.</th>
                        <th>Flexed</th>
                        <th>Finetuned</th>
                        {/* <th>100%</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instruments &&
                        instruments
                            .filter(
                                instr =>
                                    showNotReady
                                        ? true
                                        : instr.instrument.hasBottom
                                        ? instr.process.top.shape.status ||
                                          instr.process.bottom.shape.status
                                        : instr.process.top.shape.status
                            )
                            .filter(instr =>
                                showDone
                                    ? true
                                    : !instr.process.whole.finetune.status
                            )
                            .map(instr => (
                                <TuneLine
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

export default Tuning
