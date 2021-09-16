import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MdCheckBox, MdClose } from 'react-icons/md'
import { BsInfoCircle } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { FaTrashAlt ,FaUserPlus } from 'react-icons/fa'
import { BiAddToQueue } from 'react-icons/bi'
import './Icons.css'

export const IsProcessDoneIcon = ({ process }) => {
    return (
        <>
            {process.status ? (
                <OverlayTrigger
                    overlay={
                        <Tooltip className='tooltip_text'>
                            by: {process.by}
                            <br />
                            at: {new Date(process.at).toLocaleString('hu-HU')}
                        </Tooltip>
                    }
                >
                    <MdCheckBox className='icon_green' />
                </OverlayTrigger>
            ) : (
                <MdClose className='icon_red' />
            )}
        </>
    )
}

export const DoneIcon = () => <MdCheckBox className='icon_green' />

export const NotDoneIcon = () => <MdClose className='icon_red' />

export const AddSettingsIcon = () => <BiAddToQueue />
export const AddUserIcon = () => <FaUserPlus />



export const InfoIcon = ({onClick}) => {
    return (
        <OverlayTrigger
            overlay={<Tooltip className='tooltip_text'>Info</Tooltip>}
        >
            <Button onClick={onClick} className='icon_button'>
                <BsInfoCircle />
            </Button>
        </OverlayTrigger>
    )
}

export const EditIcon = ({onClick}) => {
    return (
        <OverlayTrigger
            overlay={<Tooltip className='tooltip_text'>Edit</Tooltip>}
        >
            <Button variant='success' onClick={onClick} className='icon_button'>
                <AiFillEdit />
            </Button>
        </OverlayTrigger>
    )
}

export const DeleteIcon = ({onClick}) => {
    return (
        <OverlayTrigger
            overlay={<Tooltip className='tooltip_text'>Delete</Tooltip>}
        >
            <Button
                variant='danger'
                onClick={onClick}
                className='icon_button'
            >
                <FaTrashAlt />
            </Button>
        </OverlayTrigger>
    )
}

export const OrderNumber = ({ by,at,id }) => {
    return (
        <OverlayTrigger
            overlay={
                <Tooltip className='tooltip_text'>
                    by: {by}
                    <br />
                    at:{' '}
                    {new Date(at).toLocaleString(
                        'hu-HU'
                    )}
                </Tooltip>
            }
        >
            <td>{id}</td>
        </OverlayTrigger>
    )
}



