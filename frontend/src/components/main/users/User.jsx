import React, { useState, useContext, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import produce from 'immer'
import MessageContext from '../../../contexts/message'
import { DeleteIcon } from '../../Icons'

const User = ({ user, setUsers }) => {
    const message = useContext(MessageContext)
    const [deleteModalShow, setDeleteModalShow] = useState(false)

    const [fetchData, response, error] = useAxiosAuth({
        method: 'delete',
        url: '/api/user',
        body: { data: { _id: user._id } },
    })

    useEffect(() => {
        if (response !== null) {
            setUsers(
                produce(draft => {
                    const index = draft.findIndex(
                        email => email._id === user._id
                    )
                    draft.splice(index, 1)
                })
            )
            message(response.msg, 'success')
        }
        if (error) {
            message(error.msg, 'danger')
        }
    }, [error, response])

    const deleteUser = _id => {
        setDeleteModalShow(false)
        fetchData()
    }

    const showConfirmModal = () => {
        setDeleteModalShow(true)
    }

    return (
        <>
            <li className='user_element'>
                <p>{user.email}</p>
                <div>
                    <DeleteIcon onClick={showConfirmModal} />
                </div>
            </li>
            <Modal
                show={deleteModalShow}
                backdrop='static'
                onHide={() => setDeleteModalShow(false)}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Please confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this email:
                    {user.email}?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='danger'
                        onClick={() => deleteUser(user._id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => setDeleteModalShow(false)}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default User
