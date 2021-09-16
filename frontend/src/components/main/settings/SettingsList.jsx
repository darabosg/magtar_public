import React, { useState, useContext } from 'react'
import './SettingsList.css'
import produce from 'immer'
import alpabetSort from '../../../utils/alphabetSort'
import { Button } from 'react-bootstrap'
import MessageContext from '../../../contexts/message'
import { DeleteIcon, AddSettingsIcon } from '../../Icons'

const SettingsList = ({ list, tempConfig, setTempConfig }) => {
    const message = useContext(MessageContext)
    const [addInput, setAddInput] = useState('')

    const deleteElement = (list, attr) => {
        setTempConfig(
            produce(draft => {
                const fromList = draft[list]
                const index = fromList.findIndex(item => item === attr)
                fromList.splice(index, 1)
            })
        )
    }

    const addElement = (e, list) => {
        e.preventDefault()
        if (addInput === '') {
            message('Input is empty!', 'danger')
            return
        }
        setTempConfig(
            produce(draft => {
                const toList = draft[list]
                toList.push(addInput)
            })
        )
        setAddInput('')
    }
    return (
        <div className='setting'>
            <h4>{list.charAt(0).toUpperCase() + list.slice(1)}</h4>

            <form
                onSubmit={e => addElement(e, list)}
                className='add_list_element settings_list_element'
            >
                <input
                className='add_input'
                    type='text'
                    value={addInput}
                    onChange={e => setAddInput(e.target.value)}
                />
                <Button 
                className='add_button'
                type='submit'>
                    <AddSettingsIcon />
                    Add
                </Button>
            </form>
            <ul className='settings_list'>
                {alpabetSort(tempConfig[list]).map((attr, index) => (
                    <li key={attr + index}>
                        <div className='settings_list_element'>
                            <p className='settings_list_element_title'>
                                {attr}
                            </p>
                            <div>
                                <DeleteIcon
                                    onClick={() => deleteElement(list, attr)}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SettingsList
