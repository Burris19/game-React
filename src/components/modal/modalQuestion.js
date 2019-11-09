import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ModalQuestions = (props) => {

    const _renderAnswers = (currentAnswers) => {
        return currentAnswers.map((answer, index) => {
            return (
                <div className="form-check" key={index}>
                    <input
                        onChange={props._handlerChange}
                        className="form-check-input"
                        type="radio"
                        name="selectedAnswer"
                        id="selectedAnswer"
                        value={answer.id} />
                    <label className="form-check-label" htmlFor="exampleRadios1">
                        {answer.answer}
                    </label>
                </div>
            )
        })
    }

    return (
        <Modal show={props.showModalQuestion} onHide={props._closeModalQuestion}>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>{props.endGame ? '' : 'Responde la siguiente pregunta'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {

                        props.endGame ?
                            <h1>Fin del Juego</h1> :
                            <>
                                <h3>{props.currentQuestion}?</h3>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        {
                                            _renderAnswers(props.currentAnswers)
                                        }
                                    </div>
                                </div>
                            </>

                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        props.endGame ?
                            <button
                                onClick={props._exitOfTheGame}
                                className="btn btn-danger"
                                style={{ marginLeft: '5px' }}>Salir</button> :
                            <Button onClick={props._validateQuestion}>Validar</Button>

                    }
                </Modal.Footer>
            </form >
        </Modal >
    )
}

export default ModalQuestions