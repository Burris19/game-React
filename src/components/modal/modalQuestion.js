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
                    <Modal.Title>Responde la siguiente pregunta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>{props.currentQuestion}?</h3>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            {
                                _renderAnswers(props.currentAnswers)
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props._validateQuestion}>Validar</Button>
                </Modal.Footer>
            </form >
        </Modal >
    )
}

export default ModalQuestions