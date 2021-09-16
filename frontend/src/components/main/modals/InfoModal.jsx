import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './InfoModal.css'
import { DoneIcon, NotDoneIcon } from '../../Icons'
import { IsProcessDoneIcon } from '../../Icons'

const InfoModal = ({ show, setInfoModal, data }) => {
    return (
        <Modal
            size='xl'
            show={show}
            backdrop='static'
            onHide={() => setInfoModal(false)}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='info_body'>
                    <div className='info_part'>
                        <h4>Instrument</h4>
                        <p>Scale: {data.instrument.scale}</p>
                        <p>Material: {data.instrument.material}</p>
                        {data.instrument.isMutant && <p>Mutant</p>}
                        {data.instrument.hasBottom && <p>Bottom</p>}
                        {data.instrument.customisation && (
                            <p>
                                Customisation: {data.instrument.customisation}
                            </p>
                        )}
                        {data.instrument.instrumentId && (
                            <p>
                                Instrument No.: {data.instrument.instrumentId}
                            </p>
                        )}
                        <p>Location: {data.instrument.location}</p>
                        <p>By: {data.instrument.createdBy}</p>
                        <p>
                            At:{' '}
                            {new Date(
                                data.instrument.createdAt
                            ).toLocaleString()}
                        </p>
                        {data.process.tuner && (
                            <p>Tuner: {data.process.tuner}</p>
                        )}
                        <p>
                            Finished:{' '}
                            <IsProcessDoneIcon
                                process={data.process.whole.finish}
                            />
                        </p>
                    </div>
                    {data.isOrder && (
                        <div className='info_part'>
                            <h4>Order</h4>
                            <p>Name: {data.order.name}</p>
                            {data.order.contact && (
                                <p>Contact: {data.order.contact}</p>
                            )}
                            <p>
                                Deadline:{' '}
                                {new Date(
                                    data.order.deadline
                                ).toLocaleDateString()}
                            </p>
                            {data.order.ETA && <p>ETA: {data.order.ETA}</p>}
                            <p>Package: {data.order.package}</p>
                            {data.order.case && <p>Case: {data.order.case}</p>}
                            <p>
                                Delivered:{' '}
                                {data.order.delivered ? (
                                    <DoneIcon />
                                ) : (
                                    <NotDoneIcon />
                                )}
                            </p>
                        </div>
                    )}

                    <div className='info_part'>
                        <h4>Top</h4>
                        <p>
                            Drawed:
                            <IsProcessDoneIcon
                                process={data.process.top.draw}
                            />
                        </p>
                        <p>
                            Dimpled:
                            <IsProcessDoneIcon
                                process={data.process.top.dimple}
                            />
                        </p>
                        <p>
                            Shaped:
                            <IsProcessDoneIcon
                                process={data.process.top.shape}
                            />
                        </p>
                        <p>
                            Tuned:
                            <IsProcessDoneIcon
                                process={data.process.top.tune}
                            />
                        </p>
                    </div>
                    {data.instrument.hasBottom && (
                        <div className='info_part'>
                            <h4>Bottom</h4>
                            <p>
                                Drawed:
                                <IsProcessDoneIcon
                                    process={data.process.bottom.draw}
                                />
                            </p>
                            <p>
                                Dimpled:
                                <IsProcessDoneIcon
                                    process={data.process.bottom.dimple}
                                />
                            </p>
                            <p>
                                Shaped:
                                <IsProcessDoneIcon
                                    process={data.process.bottom.shape}
                                />
                            </p>
                            <p>
                                Tuned:
                                <IsProcessDoneIcon
                                    process={data.process.bottom.tune}
                                />
                            </p>
                        </div>
                    )}
                        <div className='info_part'>
                            <h4>Whole</h4>
                            <p>
                                Glued:
                                <IsProcessDoneIcon
                                    process={data.process.whole.glue}
                                />
                            </p>
                            <p>
                                Flexed:
                                <IsProcessDoneIcon
                                    process={data.process.whole.flex}
                                />
                            </p>
                            <p>
                                Finetuned:
                                <IsProcessDoneIcon
                                    process={data.process.whole.finetune}
                                />
                            </p>
                            <p>
                                Nanoed:
                                <IsProcessDoneIcon
                                    process={data.process.whole.nano}
                                />
                            </p>
                        </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={() => setInfoModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InfoModal
