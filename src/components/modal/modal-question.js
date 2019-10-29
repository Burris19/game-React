import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { QuestionFile } from '../../config/questions'

class ModalQuestion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentQuestion: '',
            currentAnswers: [],
            questions: QuestionFile
        }
    }

    _getNewQuestion = () => {
        const { questions } = this.state;
        const abailableQuestions = questions.filter(({ used }) => used === false);

        const abailableLength = abailableQuestions.length;
        const nextQuestion = Math.floor((Math.random() * abailableLength) + 1);
        const question = abailableQuestions[nextQuestion]

        this.setState({
            currentQuestion: question.question,
            currentAnswers: question.answers,
        })
    }

    _renderAnswers = (currentAnswers) => {
        return currentAnswers.map((answer, index) => {
            return (
                <div className="form-check" key={index}>
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                    <label className="form-check-label" htmlFor="exampleRadios1">
                        {answer.answer}
                    </label>
                </div>
            )
        })
    }

    _renderBody = (currentQuestion, currentAnswers) => {
        this._getNewQuestion()
        return (
            <>
                <h3>{currentQuestion}?</h3>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        {
                            this._renderAnswers(currentAnswers)
                        }
                    </div>
                </div>
            </>
        )
    }

    render() {
        const {
            closeModalQuestion,
            showModalQuestion
        } = this.props
        const {
            currentQuestion,
            currentAnswers = []
        } = this.state
        return (
            <Modal show={showModalQuestion} onHide={closeModalQuestion}>
                <form >
                    <Modal.Header closeButton>
                        <Modal.Title>Responde la siguiente pregunta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this._renderBody(currentQuestion, currentAnswers)
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeModalQuestion}>Validar</Button>
                    </Modal.Footer>
                </form >
            </Modal >
        )
    }
}

export default ModalQuestion