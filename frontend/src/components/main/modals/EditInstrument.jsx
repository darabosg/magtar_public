import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './EditInstrument.css'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import MessageContext from '../../../contexts/message'
import ConfigContext from '../../../contexts/config'
import alpabetSort from '../../../utils/alphabetSort'
import produce from 'immer'

const EditInstrument = ({ show, setEditModal, setInstruments, data }) => {
   const { feConfig } = useContext(ConfigContext)
    const message = useContext(MessageContext)

    const [instrumentData, setInstrumentData] = useState(data)

    const createInstrument = e => {
        setInstrumentData(
            produce(draft => {
                draft.instrument[e.target.name] = e.target.value
            })
        )
    }

    const createOrder = e => {
        setInstrumentData(
            produce(draft => {
                draft.order[e.target.name] = e.target.value
            })
        )
    }

    const [fetchData, response, error] = useAxiosAuth({
        method: 'put',
        url: '/api/instrument',
        body: instrumentData,
    })

    useEffect(() => {
        if (response !== null) {
            setInstruments(
                produce(draft => {
                    const indexToUpdate = draft.findIndex(instr=>instr._id===response._id)
                    draft[indexToUpdate] = response
                })
            )
            setEditModal(false)
            message('Data saved!', 'success')
        }
        if (error) {
            message(error.msg, 'danger')
        }
    }, [response, error])

    const saveEdited = e => {
        e.preventDefault()
        fetchData()
    }

    return (
        <Modal
            size='lg'
            show={show}
            backdrop='static'
            onHide={() => setEditModal(false)}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='edit_body'>
                    <form id='full_edit_form' onSubmit={saveEdited}>
                        <div className='edit_inputs'>
                            <div className='instrument_inputs'>
                                <h3>Intrument</h3>
                                <label htmlFor='scale'>Scale</label>
                                <select
                                    name='scale'
                                    id='scale'
                                    value={instrumentData.instrument.scale}
                                    onChange={createInstrument}
                                >
                                    {feConfig &&
                                        alpabetSort(feConfig.scales).map(
                                            scale => (
                                                <option
                                                    key={scale}
                                                    value={scale}
                                                >
                                                    {scale}
                                                </option>
                                            )
                                        )}
                                </select>

                                <label htmlFor='material'>Material:</label>
                                <select
                                    name='material'
                                    id='material'
                                    value={instrumentData.instrument.material}
                                    onChange={createInstrument}
                                >
                                    {feConfig &&
                                        feConfig.materials.map(material => (
                                            <option
                                                key={material}
                                                value={material}
                                            >
                                                {material}
                                            </option>
                                        ))}
                                </select>

                                <div>
                                    <label htmlFor='hasBottom'>Bottom:</label>
                                    <input
                                        type='checkbox'
                                        id='hasBottom'
                                        checked={
                                            instrumentData.instrument.hasBottom
                                        }
                                        onChange={e =>
                                            setInstrumentData(
                                                produce(draft => {
                                                    draft.instrument.hasBottom =
                                                        e.target.checked
                                                })
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor='isMutant'>Mutant:</label>
                                    <input
                                        type='checkbox'
                                        id='isMutant'
                                        checked={
                                            instrumentData.instrument.isMutant
                                        }
                                        onChange={e =>
                                            setInstrumentData(
                                                produce(draft => {
                                                    draft.instrument.isMutant =
                                                        e.target.checked
                                                })
                                            )
                                        }
                                    />
                                </div>

                                <label htmlFor='customisation'>
                                    Customisation:
                                </label>
                                <input
                                    type='text'
                                    id='customisation'
                                    name='customisation'
                                    onChange={createInstrument}
                                    value={
                                        instrumentData.instrument
                                            .customisation || ''
                                    }
                                />
                                <label htmlFor='location'>Location:</label>
                                <select
                                    name='location'
                                    id='location'
                                    value={instrumentData.instrument.location}
                                    onChange={createInstrument}
                                >
                                    <option value='Győr'>Győr</option>
                                    <option value='BP'>BP</option>
                                </select>

                                <div>
                                    <label htmlFor='isOrder'>Add order:</label>
                                    <input
                                        type='checkbox'
                                        id='isOrder'
                                        checked={instrumentData.isOrder}
                                        onChange={e =>
                                            setInstrumentData(
                                                produce(draft => {
                                                    draft.isOrder =
                                                        e.target.checked
                                                })
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className='order_inputs'>
                                {instrumentData.isOrder && (
                                    <>
                                        <h3>Order</h3>

                                        <label htmlFor='name'>Name:</label>
                                        <input
                                            required
                                            type='text'
                                            id='name'
                                            name='name'
                                            value={
                                                instrumentData.order.name || ''
                                            }
                                            onChange={createOrder}
                                        />
                                        <label htmlFor='contact'>
                                            Contact:
                                        </label>
                                        <input
                                            type='text'
                                            id='contact'
                                            name='contact'
                                            value={
                                                instrumentData.order.contact ||
                                                ''
                                            }
                                            onChange={createOrder}
                                        />
                                        <label htmlFor='deadline'>
                                            Deadline:
                                        </label>
                                        <input
                                            type='date'
                                            id='deadline'
                                            name='deadline'
                                            value={
                                                instrumentData.order.deadline
                                            }
                                            onChange={createOrder}
                                        />
                                        <label htmlFor='package'>
                                            Package:
                                        </label>
                                        <select
                                            required
                                            name='package'
                                            id='package'
                                            value={instrumentData.order.package}
                                            onChange={createOrder}
                                        >
                                            {feConfig &&
                                                alpabetSort(
                                                    feConfig.packages
                                                ).map(pack => (
                                                    <option
                                                        key={pack}
                                                        value={pack}
                                                    >
                                                        {pack}
                                                    </option>
                                                ))}
                                        </select>
                                        {instrumentData.order.package !==
                                            'Paper box' && (
                                            <>
                                                <label htmlFor='case'>
                                                    Case:
                                                </label>
                                                <input
                                                    value={
                                                        instrumentData.order
                                                            .case || ''
                                                    }
                                                    type='text'
                                                    id='case'
                                                    name='case'
                                                    onChange={createOrder}
                                                />
                                            </>
                                        )}
                                        {instrumentData.process.whole.finish
                                            .status && (
                                            <div>
                                                <label htmlFor='delivered'>
                                                    Delivered:
                                                </label>
                                                <input
                                                    type='checkbox'
                                                    id='delivered'
                                                    checked={
                                                        instrumentData.order
                                                            .delivered
                                                    }
                                                    onChange={e =>
                                                        setInstrumentData(
                                                            produce(draft => {
                                                                draft.order.delivered =
                                                                    e.target.checked
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>{' '}
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' form='full_edit_form' variant='success'>
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

export default EditInstrument
