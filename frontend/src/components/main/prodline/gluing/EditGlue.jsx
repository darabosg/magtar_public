import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
// import './EditShape.css'
import useAxiosAuth from '../../../../hooks/useAxiosAuth'
import MessageContext from '../../../../contexts/message'
import produce from 'immer'
import EditProcess from '../EditProcess'

const EditGlue = ({
    show,
    setEditModal,
    setInstruments,
    data,
    readyToFlex,
}) => {
    const [instrumentData, setInstrumentData] = useState(data)

    const message = useContext(MessageContext)

          const [fetchData, response, error] = useAxiosAuth({
              method: 'put',
              url: '/api/instrument',
              body: instrumentData
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

    const setWholeCheck = e => {
        setInstrumentData(
            produce(draft => {
                draft.process.whole[e.target.name].status = e.target.checked
                if (e.target.checked) {
                    draft.process.whole[e.target.name].at =
                        new Date().toString()
                    if (e.target.name === 'glue') {
                        draft.order.ETA = new Date(
                            new Date().getTime() + 20 * 1000 * 60 * 60 * 24
                        ).toString()
                    }
                } else {
                    draft.process.whole[e.target.name].at = ''
                    draft.process.whole[e.target.name].by = ''
                    if (e.target.name === 'glue') {
                        draft.order.ETA = ''
                    }
                }
            })
        )
    }

    const setWhole = e => {
        setInstrumentData(
            produce(draft => {
                draft.process.whole[e.target.name].by = e.target.value
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
                <Modal.Title>Edit gluing, flexing, nonoing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={saveEdited} id='shape_edit_form'>
                    <div className='edit_part'>
                        <div className='edit_process'>
                            {(instrumentData.instrument.hasBottom
                                ? instrumentData.process.top.tune.status &&
                                  instrumentData.process.bottom.tune.status
                                : instrumentData.process.top.tune.status) && (
                                <>
                                    <h4>Glueing</h4>
                                    <EditProcess
                                        process={
                                            instrumentData.process.whole.glue
                                        }
                                        checkChange={setWholeCheck}
                                        inputChange={setWhole}
                                        name='glue'
                                        part='whole'
                                        label='Glued'
                                    />
                                </>
                            )}
                        </div>
                        <div className='edit_process'>
                            {
                                readyToFlex(
                                    instrumentData.process.whole.glue.at
                                )
                                &&
                                <>
                                    <h4>Flexing</h4>
                                    <EditProcess
                                        process={
                                            instrumentData.process.whole.flex
                                        }
                                        checkChange={setWholeCheck}
                                        inputChange={setWhole}
                                        name='flex'
                                        part='whole'
                                        label='Flexed'
                                    />
                                </>
                            }
                        </div>
                        <div className='edit_process'>
                            {instrumentData.process.whole.finetune.status && (
                                <>
                                    <h4>Fine-tuning</h4>
                                    <EditProcess
                                        process={
                                            instrumentData.process.whole.nano
                                        }
                                        checkChange={setWholeCheck}
                                        inputChange={setWhole}
                                        name='nano'
                                        part='whole'
                                        label='Nanoed'
                                    />
                                </>
                            )}
                        </div>{' '}
                        <div className='edit_process'>
                            {instrumentData.process.whole.finetune.status && (
                                <>
                                    <h4>Finished</h4>
                                    <EditProcess
                                        process={
                                            instrumentData.process.whole.finish
                                        }
                                        checkChange={setWholeCheck}
                                        inputChange={setWhole}
                                        name='finish'
                                        part='whole'
                                        label='100%'
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <div className='edit_part'>
                        {instrumentData.process.whole.glue.status && (
                            <div className='edit_single'>
                                <h4>Instument No.</h4>
                                <input
                                    type='text'
                                    id='instrumentId'
                                    value={
                                        instrumentData.instrument
                                            .instrumentId || ''
                                    }
                                    onChange={e =>
                                        setInstrumentData(
                                            produce(draft => {
                                                draft.instrument.instrumentId =
                                                    e.target.value
                                            })
                                        )
                                    }
                                />
                            </div>
                        )}
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

export default EditGlue
