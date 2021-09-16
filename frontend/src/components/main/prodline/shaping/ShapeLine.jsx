import React, { useState } from 'react'
// import './Instrument.css'
import InfoModal from '../../modals/InfoModal'
import EditShape from './EditShape'
import {
    IsProcessDoneIcon,
    InfoIcon,
    OrderNumber,
    EditIcon
} from '../../../Icons'

const ShapeLine = ({ data, setInstruments }) => {
    const [editModal, setEditModal] = useState(false)
    const [infoModal, setInfoModal] = useState(false)

    return (
        <>
            <tr className='instrument_line'>
                <OrderNumber
                    by={data.instrument.createdBy}
                    at={data.instrument.createdAt}
                    id={data.id}
                />
                <td>
                    {data.order.deadline &&
                        new Date(data.order.deadline).toLocaleDateString()}
                </td>
                <td>{data.instrument.scale}</td>
                <td>{data.instrument.customisation}</td>

                <td>
                    <IsProcessDoneIcon process={data.process.top.draw} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon process={data.process.bottom.draw} />
                    )}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.top.dimple} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon process={data.process.bottom.dimple} />
                    )}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.top.shape} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon process={data.process.bottom.shape} />
                    )}
                </td>
                <td>{data.process.tuner}</td>
                <td>
                    <InfoIcon onClick={() => setInfoModal(true)} />
                    <EditIcon onClick={() => setEditModal(true)} />
                </td>
            </tr>
            <InfoModal
                show={infoModal}
                setInfoModal={setInfoModal}
                data={data}
            />
            <EditShape
                show={editModal}
                setEditModal={setEditModal}
                setInstruments={setInstruments}
                data={data}
            />
        </>
    )
}

export default ShapeLine
