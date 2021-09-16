import React, { useState, useContext, useEffect } from 'react'
import './Create.css'
import ConfigContext from '../../../contexts/config'
import alpabetSort from '../../../utils/alphabetSort'
import { Button } from 'react-bootstrap'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import { useHistory } from 'react-router-dom'
import MessageContext from '../../../contexts/message'
import produce from 'immer'

const Create = () => {
    const history = useHistory()
    const { feConfig } = useContext(ConfigContext)
    const message = useContext(MessageContext)

    const [instrumentData, setInstrumentData] = useState({
        instrument: {
            scale: 'CUSTOM',
            material: 'DC04',
            customisation: '',
            hasBottom: false,
            isMutant: false,
            createdBy: '',
            comment: '',
            location: 'Győr',
        },
        order: {
            name: '',
            contact: '',
            deadline: new Date(
                new Date().setMonth(new Date().getMonth() + 1)
            ).toLocaleDateString('en-CA'),
            package: 'Paper box',
            case: '',
            delivered: false,
        },
        isOrder: false,
    })

    const [fetchData, response, error] = useAxiosAuth({
        method: 'post',
        url: '/api/instrument',
        body: instrumentData,
    })

    useEffect(() => {
        if (response !== null) {
            message(response.msg, 'success')
            history.push('/instruments')
        }
        if (error) {
            message(error.msg, 'danger')
        }
    }, [response, error])

    const postInstrument = e => {
        e.preventDefault()
        fetchData()
    }

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

    const cancelCreate = () => {
        history.push('/')
    }

    return (
        <div>
            <form onSubmit={postInstrument}>
                <div className='create_inputs'>
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
                                alpabetSort(feConfig.scales).map(scale => (
                                    <option key={scale} value={scale}>
                                        {scale}
                                    </option>
                                ))}
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
                                    <option key={material} value={material}>
                                        {material}
                                    </option>
                                ))}
                        </select>

                        <div>
                            <label htmlFor='hasBottom'>Bottom:</label>
                            <input
                                type='checkbox'
                                id='hasBottom'
                                checked={instrumentData.instrument.hasBottom}
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
                                checked={instrumentData.instrument.isMutant}
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

                        <label htmlFor='customisation'>Customisation:</label>
                        <input
                            type='text'
                            id='customisation'
                            name='customisation'
                            onChange={createInstrument}
                            value={instrumentData.instrument.customisation}
                        />
                        <label htmlFor='createdBy'>Created by:</label>
                        <select
                            required
                            name='createdBy'
                            id='createdBy'
                            value={instrumentData.instrument.createdBy}
                            onChange={createInstrument}
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
                        {/* <label htmlFor='location'>Location:</label>
                        <select
                            name='location'
                            id='location'
                            value={instrumentData.instrument.location}
                            onChange={createInstrument}
                        >
                            <option value='Győr'>Győr</option>
                            <option value='BP'>BP</option>
                        </select> */}

                        <div>
                            <label htmlFor='isOrder'>Order:</label>
                            <input
                                type='checkbox'
                                id='isOrder'
                                checked={instrumentData.isOrder}
                                onChange={e =>
                                    setInstrumentData(
                                        produce(draft => {
                                            draft.isOrder = e.target.checked
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
                                    value={instrumentData.order.name}
                                    onChange={createOrder}
                                />
                                <label htmlFor='contact'>Contact:</label>
                                <input
                                    type='text'
                                    id='contact'
                                    name='contact'
                                    value={instrumentData.order.contact}
                                    onChange={createOrder}
                                />
                                <label htmlFor='deadline'>Deadline:</label>
                                <input
                                    required
                                    type='date'
                                    id='deadline'
                                    name='deadline'
                                    value={instrumentData.order.deadline}
                                    onChange={createOrder}
                                />
                                <label htmlFor='package'>Package:</label>
                                <select
                                    required
                                    name='package'
                                    id='package'
                                    value={instrumentData.order.package}
                                    onChange={createOrder}
                                >
                                    {feConfig &&
                                        alpabetSort(feConfig.packages).map(
                                            pack => (
                                                <option key={pack} value={pack}>
                                                    {pack}
                                                </option>
                                            )
                                        )}
                                </select>
                                {instrumentData.order.package !==
                                    'Paper box' && (
                                    <>
                                        <label htmlFor='case'>Case:</label>
                                        <input
                                            value={instrumentData.order.case}
                                            type='text'
                                            id='case'
                                            name='case'
                                            onChange={createOrder}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <Button
                    className='create_button'
                    variant='success'
                    type='submit'
                >
                    Save
                </Button>
                <Button
                    className='create_button'
                    variant='danger'
                    onClick={cancelCreate}
                >
                    Cancel
                </Button>
            </form>
        </div>
    )
}

export default Create
