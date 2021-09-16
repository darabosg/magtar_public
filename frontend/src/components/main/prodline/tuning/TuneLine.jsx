import React, { useState } from 'react'
// import './Instrument.css'
import InfoModal from '../../modals/InfoModal'
import EditTune from './EditTune'
import {
    IsProcessDoneIcon,
    InfoIcon,
    OrderNumber,
    EditIcon,
} from '../../../Icons'

const TuneLine = ({ data, setInstruments }) => {
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
                <td>{data.process.tuner}</td>
                <td>
                    <IsProcessDoneIcon process={data.process.top.tune} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon process={data.process.bottom.tune} />
                    )}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.whole.glue} />
                </td>
                <td>{data.instrument.instrumentId}</td>
                <td>
                    <IsProcessDoneIcon process={data.process.whole.flex} />
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.whole.finetune} />
                </td>

                {/* <td>
                    <IsProcessDoneIcon process={data.process.whole.finish} />
                </td> */}
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
            <EditTune
                show={editModal}
                setEditModal={setEditModal}
                setInstruments={setInstruments}
                data={data}
            />
        </>
    )
}

export default TuneLine
