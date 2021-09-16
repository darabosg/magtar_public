import React from 'react'

const SummaryLine = ({data}) => {
console.log(data)
    return (
        <tr>
            <th>{data._id}</th>
            <td className='summary_all'>
                {data.orderBp + data.stockBp + data.orderGyor + data.stockGyor}
            </td>
            <td className='summary_all'>{data.stockBp + data.stockGyor}</td>
            <td className='summary_all'>{data.orderBp + data.orderGyor}</td>
            <td className='summary_bp'>{data.stockBp}</td>
            <td className='summary_bp'>{data.orderBp}</td>
            <td className='summary_gyor'>{data.stockGyor}</td>
            <td className='summary_gyor'>{data.orderGyor}</td>
        </tr>
    )
}

export default SummaryLine
