import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import MessageContext from '../../../contexts/message'

const DeleteModal = ({ show, setDeleteModal, setInstruments, data }) => {
    const message = useContext(MessageContext)

    const [fetchData, response, error] = useAxiosAuth({
        method: 'delete',
        url: '/api/instrument',
        body: { data: { _id: data._id } },
    })

    useEffect(() => {
        if (response !== null) {
            setDeleteModal(false)
            message(response.msg, 'success')
            setInstruments(prev => prev.filter(instr => instr._id !== data._id))
        }
        if (error) {
            message(error.msg, 'danger')
        }
    }, [response, error])

    const instrumentDelete = _id => {
        fetchData()
    }

    return (
        <Modal
            show={show}
            backdrop='static'
            onHide={() => setDeleteModal(false)}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Please confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this instrument?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='danger'
                    onClick={() => instrumentDelete(data._id)}
                >
                    Delete
                </Button>
                <Button variant='primary' onClick={() => setDeleteModal(false)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
