import React, { useState } from 'react'
// import './Instrument.css'
import InfoModal from '../../modals/InfoModal'

import {
    IsProcessDoneIcon,

    InfoIcon,
    OrderNumber,
} from '../../../Icons'

const ProdAllLine = ({ data }) => {
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
                <td>
                    <IsProcessDoneIcon process={data.process.top.draw} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon process={data.process.bottom.draw} />
                    )}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.top.dimple} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon
                            process={data.process.bottom.dimple}
                        />
                    )}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.top.shape} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon
                            process={data.process.bottom.shape}
                        />
                    )}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.top.tune} />
                    {data.instrument.hasBottom && (
                        <IsProcessDoneIcon process={data.process.bottom.tune} />
                    )}
                </td>
                <td>
                    <IsProcessDoneIcon process={data.process.whole.glue} />
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
                <td>{data.instrument.location}</td>
                <td>
                    <InfoIcon onClick={() => setInfoModal(true)} />
                </td>
            </tr>
            <InfoModal
                show={infoModal}
                setInfoModal={setInfoModal}
                data={data}
            />
        </>
    )
}

export default ProdAllLine
