import React, { useState } from 'react'
// import './Instrument.css'
import InfoModal from '../../modals/InfoModal'
import EditGlue from './EditGlue'
import {
    IsProcessDoneIcon,
    InfoIcon,
    OrderNumber,
    EditIcon,
    DoneIcon,
} from '../../../Icons'

const GlueLine = ({ data, setInstruments }) => {
    const [editModal, setEditModal] = useState(false)
    const [infoModal, setInfoModal] = useState(false)

    const readyToFlex = gluedAt => {
        let glueDate = new Date(gluedAt)
        let today = new Date()

        glueDate = new Date(
            glueDate.getFullYear(),
            glueDate.getMonth(),
            glueDate.getDate()
        )
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

        let millisecondsPerDay = 1000 * 60 * 60 * 24
        let millisBetween = today.getTime() - glueDate.getTime()
        let days = millisBetween / millisecondsPerDay
        console.log(days)
        let isDry = days >= 7
        console.log(isDry)
        return isDry
    }

    readyToFlex('1995-12-17T03:24:00')

    const getReadyDate = gluedAt => {
        return readyToFlex(gluedAt) ? (
            <>
                {new Date(
                    new Date(gluedAt).getTime() + 7 * 1000 * 60 * 60 * 24
                ).toLocaleDateString('hu-HU')}
                <DoneIcon />
            </>
        ) : (
            <>
                {new Date(
                    new Date(gluedAt).getTime() + 7 * 1000 * 60 * 60 * 24
                ).toLocaleDateString('hu-HU')}
            </>
        )
    }

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
                    <IsProcessDoneIcon process={data.process.whole.glue} />
                </td>
                <td>{data.instrument.instrumentId}</td>
                <td>
                    {data.process.whole.glue.status
                        ? getReadyDate(data.process.whole.glue.at)
                        : ''}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.whole.flex} />
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.whole.finetune} />
                </td>

                <td>
                    <IsProcessDoneIcon process={data.process.whole.nano} />
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.whole.finish} />
                </td>
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
            <EditGlue
                readyToFlex={readyToFlex}
                show={editModal}
                setEditModal={setEditModal}
                setInstruments={setInstruments}
                data={data}
            />
        </>
    )
}

export default GlueLine
