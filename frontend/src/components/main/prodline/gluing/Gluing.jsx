import React, { useState } from 'react'
// import './Shaping.css'
import { Table } from 'react-bootstrap'
import GlueLine from './GlueLine'

const Gluing = ({ instruments, setInstruments }) => {
    const [showDone, setShowDone] = useState(false)
    const [showNotReady, setShowNotReady] = useState(false)

    return (
        <div>
            <div className='subtitle'>
                <h4>Gule/Flex/Nano</h4>
                <div className='filter'>
                    <label htmlFor='showdone'>Done: </label>
                    <input
                        id='showdone'
                        checked={showDone}
                        onChange={e => setShowDone(e.target.checked)}
                        type='checkbox'
                    />
                </div>
                <div className='filter'>
                    <label htmlFor='shownotready'>Not ready for gluing: </label>
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
                        <th>Glued</th>
                        <th>No.</th>
                        <th>Ready to flex</th>
                        <th>Flexed</th>
                        <th>Finetuned</th>
                        <th>Nanoed</th>
                        <th>100%</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instruments &&
                        instruments
                            .filter(instr =>
                                showNotReady
                                    ? true
                                    : instr.instrument.hasBottom
                                    ? instr.process.top.tune.status &&
                                      instr.process.bottom.tune.status
                                    : instr.process.top.tune.status
                            )
                            .filter(instr =>
                                showDone
                                    ? true
                                    : !instr.process.whole.finish.status
                            )
                            .map(instr => (
                                <GlueLine
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

export default Gluing
