import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './App.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: '',
      currentAnswers: [],
      showModal: false,
      possitionLeft: 0,
      possitionTop: 0,
      way: [
        {
          idElement: 'one-5',
          question: 'Que es React',
          used: false,
          answers: [
            {
              id: 1,
              answer: 'one'
            },
            {
              id: 2,
              answer: 'two'
            },
            {
              id: 3,
              answer: 'three'
            }
          ]
        },
        {
          idElement: 'one-9',
          question: 'Que es HTLM',
          used: false,
          answers: [
            {
              id: 1,
              answer: 'one'
            },
            {
              id: 2,
              answer: 'two'
            },
            {
              id: 3,
              answer: 'three'
            }
          ]
        },
        {
          idElement: 'five-9',
          question: 'Que es JSX',
          used: false,
          answers: [
            {
              id: 1,
              answer: 'one'
            },
            {
              id: 2,
              answer: 'two'
            },
            {
              id: 3,
              answer: 'three'
            }
          ]
        },
        {
          idElement: 'nine-9',
          question: 'Que es CSS3',
          used: false,
          answers: [
            {
              id: 1,
              answer: 'one'
            },
            {
              id: 2,
              answer: 'two'
            },
            {
              id: 3,
              answer: 'three'
            }
          ]
        }
      ]
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

  _renderDivs = (alias, type) => {
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return elements.map((element, index) => {
      return (
        <div
          className={`col-1`}
          key={index}
          id={`${alias}-${element}`}
          style={{ 'background': 'red' }}>
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
            src="/images/way.jpg"
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
          {this._renderDivs(row, type)}
        </div>
      )
    })
  }

  _startGame = () => {
    this._nextQuestion()
  }

  _nextQuestion = () => {
    const { way } = this.state;
    const nexElement = way.find(({ used }) => used === false);

    if (nexElement) {
      const currentId = nexElement.idElement
      const question = nexElement.question
      const answers = nexElement.answers
      const coordinates = this._getCoordinates(currentId)
      const newWay = way.map(element => {
        if (element.idElement === currentId) {
          element.used = true
          return element
        }
        return element
      })
      this.setState({
        way: newWay,
        currentAnswers: answers,
        currentQuestion: question,
        ...coordinates
      })

      setTimeout(() => {
        this.setState({
          showModal: true,
        })
      }, 1000)
    }
  }

  _closeModal = () => {
    this.setState({ showModal: false });
  }

  _handlerSubmit = () => {

  }

  _handlerChange = () => {

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

  _renderModal = () => {
    const {
      showModal,
      currentQuestion,
      currentAnswers
    } = this.state
    return (

      <Modal show={showModal} onHide={this._closeModal}>
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
            <Button onClick={this._closeModal}>Validar</Button>
          </Modal.Footer>
        </form >
      </Modal >
    )
  }

  render() {
    const {
      possitionLeft,
      possitionTop,
    } = this.state
    return (
      <>
        {this._renderModal()}
        <img
          id="gamer"
          src="/images/man.jpg"
          alt=""
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
              <h1>Juego Monopolio <span className="badge badge-secondary">Mariano Galvez</span></h1>
              <button onClick={this._startGame} className="btn btn-primary">Jugar</button>
            </div>
            <div className="card-body">
              {this._renderMap()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App;
