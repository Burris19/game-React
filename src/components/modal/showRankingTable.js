import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TableRankingUsers from '../game/presentation/tableRankingUsers'

const ModalShowRankingTable = (props) => {
    return (
        <Modal show={props.showModalRankingTable} onHide={props._closeModalRankingTable}>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>Tabla de Posiciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableRankingUsers
                        {...props} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props._closeModalRankingTable}>Cerrar</Button>
                </Modal.Footer>
            </form >
        </Modal >
    )
}

export default ModalShowRankingTable