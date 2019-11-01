import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './App.css';
import { QuestionFile } from './config/questions'
import { Way } from './config/way'
import RenderModalRandomNumber from './components/modal/modal-random-number'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSolution: 0,
      selectedAnswer: '',
      goodAnswers: 0,
      badAnswers: 0,
      questions: QuestionFile,
      currentQuestion: '',
      currentAnswers: [],
      showModalRandomNumber: false,
      showModalQuestion: false,
      currentPossition: 1,
      totalPossition: 32,
      randomNumber: 0,
      possitionLeft: 0,
      possitionTop: 0,
      way: Way
    }
  }

  componentDidMount() {
    const coordinates = this._getCoordinates('one-1')
    this.setState({ ...coordinates })
  }

  _getCoordinates = (idElement) => {
    const firstElement = document.getElementById(idElement);
    var element = firstElement.getBoundingClientRect();
    return {
      possitionLeft: element.left,
      possitionTop: element.top
    }
  }

  _renderColums = (alias, type) => {
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return elements.map((element, index) => {
      return (
        <div
          className={`col-1`}
          key={index}
          id={`${alias}-${element}`}>
          {this._renderImage(type, index)}
        </div>
      )
    })
  }

  _renderImage = (type, index) => {
    if (type === 'row') {
      return (
        <img
          src="/images/way.jpg"
          alt="Smiley face"
          width="100"
          height="75" />
      )
    } else {
      const allowIndex = [0, 8]
      if (allowIndex.includes(index)) {
        return (
          <img
            src="/images/cam.jpg"
            alt="Smiley face"
            width="100"
            height="75" />
        )
      }
    }
  }

  _renderMap = () => {
    const rows = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    return rows.map((row, index) => {
      const type = row === 'one' || row === 'nine' ? 'row' : 'colum'
      return (
        <div key={index} className="row justify-content-center">
          {this._renderColums(row, type)}
        </div>
      )
    })
  }

  _startGame = () => {
    this.randomNumer()
  }

  randomNumer = () => {
    const number = Math.floor((Math.random() * 6) + 1);
    this.setState({
      showModalRandomNumber: true,
      randomNumber: number
    })
  }

  _nextQuestion = (idElement, nextPossition) => {
    const coordinates = this._getCoordinates(idElement)
    this.setState({
      ...coordinates
    })
    setTimeout(() => {
      this.setState({
        currentPossition: nextPossition,
        selectedAnswer: 0,
        showModalQuestion: true,
      })
    }, 1000)
  }

  _closeModalQuestion = () => {
    this.setState({ showModalQuestion: false });
  }

  _handlerChange = (e) => {
    const { id, value } = e.target;

    this.setState({
      [id]: parseInt(value)
    });

  }

  _renderAnswers = (currentAnswers) => {
    return currentAnswers.map((answer, index) => {
      return (
        <div className="form-check" key={index}>
          <input
            onChange={this._handlerChange}
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

  _getNewQuestion = () => {
    const { questions } = this.state;
    const abailableQuestions = questions.filter(({ used }) => used === false);
    const abailableLength = abailableQuestions.length;
    const nextQuestion = Math.floor((Math.random() * abailableLength) + 1);
    const index = nextQuestion - 1;
    const question = abailableQuestions[index]

    const newQuestions = questions.map(element => {
      if (element.question === question.question) {
        element.used = true
        return element
      }
      return element
    })


    this.setState({
      currentSolution: question.solution,
      currentQuestion: question.question,
      currentAnswers: question.answers,
      question: newQuestions
    })
  }

  _validateQuestion = () => {
    const {
      currentSolution,
      selectedAnswer,
      goodAnswers,
      badAnswers,
    } = this.state

    if (currentSolution === selectedAnswer) {
      const addGoodAnswer = goodAnswers + 1;
      this.setState({
        goodAnswers: addGoodAnswer
      })
    } else {
      const addBadAnswers = badAnswers + 1;
      this.setState({
        badAnswers: addBadAnswers
      })
    }

    this._closeModalQuestion()
  }

  _renderModalQuestion = () => {
    const {
      showModalQuestion,
      currentQuestion,
      currentAnswers
    } = this.state
    return (
      <Modal show={showModalQuestion} onHide={this._closeModalQuestion}>
        <form onSubmit={this._handlerSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Responde la siguiente pregunta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{currentQuestion}?</h3>
            <div className="form-row">
              <div className="form-group col-md-12">
                {
                  this._renderAnswers(currentAnswers)
                }
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._validateQuestion}>Validar</Button>
          </Modal.Footer>
        </form >
      </Modal >
    )
  }

  _closeModalRandonNumber = () => {
    this.setState({
      showModalRandomNumber: false
    })

    const {
      currentPossition,
      totalPossition,
      randomNumber,
      way
    } = this.state

    const calcuteNextPossition = currentPossition + randomNumber

    if (calcuteNextPossition >= totalPossition) {
      //fin del juego
    } else {
      this._getNewQuestion()
      const nexElement = way.find(({ number }) => parseInt(number) === calcuteNextPossition);
      setTimeout(() => {
        this._nextQuestion(nexElement.idElement, calcuteNextPossition)
      }, 1000)
    }

  }

  render() {
    const {
      possitionLeft,
      possitionTop,
      showModalRandomNumber
    } = this.state
    return (
      <>
        {
          showModalRandomNumber ?
            <RenderModalRandomNumber
              closeModalRandonNumber={this._closeModalRandonNumber}
              {...this.state} /> :
            null
        }
        {
          this._renderModalQuestion()
        }
        <img
          id="gamer"
          src="/images/gif.gif"
          alt="Jugador"
          width="100"
          height="75"
          style={{
            position: 'absolute',
            zIndex: 10,
            top: possitionTop,
            left: possitionLeft
          }} />

        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1>Juego Camino y Preguntas <span className="badge badge-secondary">Mariano Galvez</span></h1>
              <button onClick={this._startGame} className="btn btn-primary">Jugar</button>
            </div>
            <div className="card-body" style={{
              backgroundImage: 'url(/images/degradado.jpg)'
            }}>
              <div className="row">
                <div className="alert alert-success" role="alert">
                  Numero de Aciertos: <strong>{this.state.goodAnswers}</strong>
                </div>
                <div className="alert alert-danger" role="alert" style={{ marginLeft: '10px' }}>
                  Numero de Errores: <strong>{this.state.badAnswers}</strong>
                </div>
              </div>
              {this._renderMap()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App;
