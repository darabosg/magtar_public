import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
// import './EditShape.css'
import useAxiosAuth from '../../../../hooks/useAxiosAuth'
import MessageContext from '../../../../contexts/message'
import ConfigContext from '../../../../contexts/config'
import alpabetSort from '../../../../utils/alphabetSort'
import produce from 'immer'
import EditProcess from '../EditProcess'

const EditShape = ({ show, setEditModal, setInstruments, data }) => {
    const [instrumentData, setInstrumentData] = useState(data)
    const { feConfig } = useContext(ConfigContext)
    const message = useContext(MessageContext)

           const [fetchData, response, error] = useAxiosAuth({
               method: 'put',
               url: '/api/instrument',
               body: instrumentData,
           })

           useEffect(() => {
               if (response !== null) {
                   setInstruments(
                       produce(draft => {
                           const idToUpdate = draft.findIndex(
                               instr => instr._id === instrumentData._id
                           )
                           draft[idToUpdate] = instrumentData
                       })
                   )
                   setEditModal(false)
                   message('Data saved!', 'success')
               }
               if (error) {
                   message(error.msg, 'danger')
               }
           }, [error, response])

    const saveEdited = e => {
        e.preventDefault()

      fetchData()
    }

    const setTopCheck = e => {
        setInstrumentData(
            produce(draft => {
                draft.process.top[e.target.name].status = e.target.checked
                if (e.target.checked) {
                    draft.process.top[e.target.name].at = new Date().toString()
                } else {
                    draft.process.top[e.target.name].at = ''
                    draft.process.top[e.target.name].by = ''
                }
            })
        )
    }

    const setBotCheck = e => {
        setInstrumentData(
            produce(draft => {
                draft.process.bottom[e.target.name].status = e.target.checked
                if (e.target.checked) {
                    draft.process.bottom[e.target.name].at =
                        new Date().toString()
                } else {
                    draft.process.bottom[e.target.name].at = ''
                    draft.process.bottom[e.target.name].by = ''
                }
            })
        )
    }
    const setTop = e => {
        setInstrumentData(
            produce(draft => {
                draft.process.top[e.target.name].by = e.target.value
            })
        )
    }

    const setBot = e => {
        setInstrumentData(
            produce(draft => {
                draft.process.bottom[e.target.name].by = e.target.value
            })
        )
    }

    return (
        <Modal
            size='xl'
            show={show}
            backdrop='static'
            onHide={() => setEditModal(false)}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Edit shaping</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={saveEdited} id='shape_edit_form'>
                    <h4>Top</h4>
                    <div className='edit_part'>
                        <EditProcess
                            process={instrumentData.process.top.draw}
                            checkChange={setTopCheck}
                            inputChange={setTop}
                            name='draw'
                            part='top'
                            label='Drawed'
                        />
                        {instrumentData.process.top.draw.status && (
                            <>
                                <EditProcess
                                    process={instrumentData.process.top.dimple}
                                    checkChange={setTopCheck}
                                    inputChange={setTop}
                                    name='dimple'
                                    part='top'
                                    label='Dimpled'
                                />

                                {instrumentData.process.top.dimple.status && (
                                    <EditProcess
                                        process={
                                            instrumentData.process.top.shape
                                        }
                                        checkChange={setTopCheck}
                                        inputChange={setTop}
                                        name='shape'
                                        part='top'
                                        label='Shaped'
                                    />
                                )}
                            </>
                        )}
                    </div>

                    {data.instrument.hasBottom && (
                        <>
                            <h4>Bottom</h4>
                            <div className='edit_part'>
                                <EditProcess
                                    process={instrumentData.process.bottom.draw}
                                    checkChange={setBotCheck}
                                    inputChange={setBot}
                                    name='draw'
                                    part='bottom'
                                    label='Drawed'
                                />
                                {instrumentData.process.bottom.draw.status && (
                                    <>
                                        <EditProcess
                                            process={
                                                instrumentData.process.bottom
                                                    .dimple
                                            }
                                            checkChange={setBotCheck}
                                            inputChange={setBot}
                                            name='dimple'
                                            part='bottom'
                                            label='Dimpled'
                                        />

                                        {instrumentData.process.bottom.dimple
                                            .status && (
                                            <EditProcess
                                                process={
                                                    instrumentData.process
                                                        .bottom.shape
                                                }
                                                checkChange={setBotCheck}
                                                inputChange={setBot}
                                                name='shape'
                                                part='bottom'
                                                label='Shaped'
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                    <div className='edit_part'>
                        <div className='edit_single'>
                            <>
                            <h4>Tuner</h4>
                            <select
                                value={instrumentData.process.tuner || ''}
                                onChange={e =>
                                    setInstrumentData(
                                        produce(draft => {
                                            draft.process.tuner = e.target.value
                                        })
                                    )
                                }
                            >
                                <option value='' disabled hidden>
                                    Please select
                                </option>
                                {feConfig &&
                                    alpabetSort(feConfig.makers).map(maker => (
                                        <option key={maker} value={maker}>
                                            {maker}
                                        </option>
                                    ))}
                            </select>
                            </>
                        </div>
                        <div className='edit_single'>
                            <h4>Location</h4>
                            <select
                                value={instrumentData.instrument.location || ''}
                                onChange={e =>
                                    setInstrumentData(
                                        produce(draft => {
                                            draft.instrument.location =
                                                e.target.value
                                        })
                                    )
                                }
                            >
                                <option value='Győr'>Győr</option>
                                <option value='BP'>BP</option>
                            </select>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' form='shape_edit_form' variant='success'>
                    Save
                </Button>
                <Button
                    variant='danger'
                    onClick={() => {
                        setEditModal(false)
                        setInstrumentData(data)
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditShape
