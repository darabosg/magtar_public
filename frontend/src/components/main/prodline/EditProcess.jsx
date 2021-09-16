import React, { useContext } from 'react'
import ConfigContext from '../../../contexts/config'
import alpabetSort from '../../../utils/alphabetSort'

const EditProcess = ({ process, checkChange, inputChange, name, part, label }) => {
    const { feConfig } = useContext(ConfigContext)
    return (
        <div className='edit_single'>
            <label htmlFor={`${name}_status_${part}`}>{label}:</label>
            <input
                id={`${name}_status_${part}`}
                name={name}
                type='checkbox'
                checked={process.status}
                onChange={checkChange}
            />
            {process.status && (
                <div>
                    {/* <label htmlFor={`${name}_by_${part}`}>By:</label> */}
                    <select
                        required
                        name={name}
                        id={`${name}_by_${part}`}
                        value={process.by || ''}
                        onChange={inputChange}
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
                </div>
            )}
        </div>
    )
}

export default EditProcess
