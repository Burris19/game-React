import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class RenderModalRandomNumber extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showNumber: false
        }
    }

    componentDidMount() {
        this._showNumber()
    }

    _showNumber = () => {
        setTimeout(() => {
            this.setState({
                showNumber: true,
            })
        }, 2000)
    }

    render() {
        const {
            showModalRandomNumber = false,
            randomNumber,
            closeModalRandonNumber
        } = this.props
        const {
            showNumber
        } = this.state
        return (
            <Modal show={showModalRandomNumber} onHide={closeModalRandonNumber}>
                <form >
                    <Modal.Header closeButton>
                        <Modal.Title>TEN BUENA SUERTE!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            showNumber ?
                                <div className="text-center">
                                    <h1 className="display-4">Tu numero es <strong>{randomNumber}</strong></h1>
                                </div> :
                                <div className="text-center">
                                    <img
                                        src="/images/dado.gif"
                                        alt="Jugador"
                                    />
                                </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            showNumber ?
                                <Button onClick={closeModalRandonNumber}>Avanza Casillas</Button> :
                                null
                        }
                    </Modal.Footer>
                </form >
            </Modal >
        )
    }
}

export default RenderModalRandomNumber