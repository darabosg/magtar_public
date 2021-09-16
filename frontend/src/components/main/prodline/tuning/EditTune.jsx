import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
// import './EditShape.css'
import useAxiosAuth from '../../../../hooks/useAxiosAuth'
import MessageContext from '../../../../contexts/message'
import ConfigContext from '../../../../contexts/config'
import alpabetSort from '../../../../utils/alphabetSort'
import produce from 'immer'
import EditProcess from '../EditProcess'

const EditTune = ({ show, setEditModal, setInstruments, data }) => {
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
    const setWholeCheck = e => {
        setInstrumentData(
            produce(draft => {
                draft.process.whole[e.target.name].status = e.target.checked
                if (e.target.checked) {
                    draft.process.whole[e.target.name].at =
                        new Date().toString()
                } else {
                    draft.process.whole[e.target.name].at = ''
                    draft.process.whole[e.target.name].by = ''
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
                <Modal.Title>Edit tuning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={saveEdited} id='shape_edit_form'>
                    <h4>Tuning</h4>
                    <div className='edit_part'>
                        {instrumentData.process.top.shape.status && (
                            <EditProcess
                                process={instrumentData.process.top.tune}
                                checkChange={setTopCheck}
                                inputChange={setTop}
                                name='tune'
                                part='top'
                                label='Top tuned'
                            />
                        )}

                        {data.instrument.hasBottom &&
                            instrumentData.process.bottom.shape.status && (
                                <EditProcess
                                    process={instrumentData.process.bottom.tune}
                                    checkChange={setBotCheck}
                                    inputChange={setBot}
                                    name='tune'
                                    part='bot'
                                    label='Bottom tuned'
                                />
                            )}

                        {instrumentData.process.whole.flex.status && (
                            <EditProcess
                                process={instrumentData.process.whole.finetune}
                                checkChange={setWholeCheck}
                                inputChange={setWhole}
                                name='finetune'
                                part='whole'
                                label='Finetuned'
                            />
                        )}
                    </div>

                    <div className='edit_part'>
                        <div className='edit_single'>
                            <h4>Tuner</h4>
                                <select
                                    value={instrumentData.process.tuner || ''}
                                    onChange={e =>
                                        setInstrumentData(
                                            produce(draft => {
                                                draft.process.tuner =
                                                    e.target.value
                                            })
                                        )
                                    }
                                >
                                    <option value='' disabled hidden>
                                        Please select
                                    </option>
                                    {feConfig &&
                                        alpabetSort(feConfig.makers).map(
                                            maker => (
                                                <option
                                                    key={maker}
                                                    value={maker}
                                                >
                                                    {maker}
                                                </option>
                                            )
                                        )}
                                </select>
                                </div>
                            <div className='edit_single'>
                                <h4>Location</h4>
                                    <select
                                        value={
                                            instrumentData.instrument
                                                .location || ''
                                        }
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

export default EditTune
