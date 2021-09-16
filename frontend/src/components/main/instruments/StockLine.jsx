import React, { useState } from 'react'
// import './InstrLine.css'
import InfoModal from '../modals/InfoModal'
import EditInstrument from '../modals/EditInstrument'
import { DeleteIcon, InfoIcon, OrderNumber, EditIcon } from '../../Icons'
import DeleteModal from '../modals/DeleteModal'
import getWholeStatus from '../../../utils/getStatus'

const StockLine = ({ data, setInstruments }) => {
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [infoModal, setInfoModal] = useState(false)

    return (
        <>
            <tr className='instrument_line'>
                <OrderNumber
                    by={data.instrument.createdBy}
                    at={data.instrument.createdAt}
                    id={data.id}
                />
                <td>{data.instrument.scale}</td>
                <td>
                    {data.instrument.hasBottom ? 'B ' : '- '}/
                    {data.instrument.isMutant ? ' M' : ' -'}
                </td>
                <td>{data.instrument.customisation}</td>
                <td>{data.instrument.material}</td>
                <td>{data.instrument.location}</td>
                <td>{getWholeStatus(data)}</td>
                <td>
                    {data.order.ETA &&
                        new Date(data.order.ETA).toLocaleDateString('hu-HU')}
                </td>
                <td>{data.instrument.instrumentId}</td>
                <td>
                    <div className='actions'>
                        <InfoIcon onClick={() => setInfoModal(true)} />
                        <EditIcon onClick={() => setEditModal(true)} />
                        <DeleteIcon onClick={() => setDeleteModal(true)} />
                    </div>
                </td>
            </tr>
            <DeleteModal
                show={deleteModal}
                setDeleteModal={setDeleteModal}
                setInstruments={setInstruments}
                data={data}
            />
            <InfoModal
                show={infoModal}
                setInfoModal={setInfoModal}
                data={data}
            />
            <EditInstrument
                show={editModal}
                setEditModal={setEditModal}
                setInstruments={setInstruments}
                data={data}
            />
        </>
    )
}

export default StockLine
