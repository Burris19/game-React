import React, { Component } from 'react';
import LayoutMonopoli from '../presentation/monopoli'
import ImagePlayer from '../presentation/imagePlayer'
import ModalQuestions from '../../modal/modalQuestion'
import ModalShowRankingTable from '../../modal/showRankingTable';
import RenderModalRandomNumber from '../../modal/modalRandomNumber'
import { QuestionFile } from '../../../config/questions'
import { Way } from '../../../config/way'

class Monopoli extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSolution: 0,
            selectedAnswer: '',
            questions: QuestionFile,
            currentQuestion: '',
            currentAnswers: [],
            showModalRandomNumber: false,
            showModalRankingTable: false,
            showModalQuestion: false,
            currentPossition: 1,
            totalPossition: 31,
            randomNumber: 0,
            possitionLeft: 0,
            possitionTop: 0,
            way: Way,
            endGame: false
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

    _handlerChange = (e) => {
        const { id, value } = e.target;
        this.setState({
            [id]: parseInt(value)
        });
    }

    _closeModalQuestion = () => {
        this.setState({ showModalQuestion: false });
    }

    _validateQuestion = () => {
        const {
            currentSolution,
            selectedAnswer,
        } = this.state

        if (currentSolution === selectedAnswer) {
            this.props.incrementCorrectQuestion();
        } else {
            this.props.incrementIncorrectQuestion();
        }

        this._closeModalQuestion()
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

        let calcuteNextPossition = currentPossition + randomNumber

        if (calcuteNextPossition >= totalPossition) {
            const coordinates = this._getCoordinates('two-1')
            this.setState({
                endGame: true,
                ...coordinates
            })
            setTimeout(() => {
                this.setState({
                    showModalQuestion: true,
                })
            }, 1000)
        } else {
            this._getNewQuestion()
            const nexElement = way.find(({ number }) => parseInt(number) === calcuteNextPossition);
            setTimeout(() => {
                this._nextQuestion(nexElement.idElement, calcuteNextPossition)
            }, 1000)
        }

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

    _closeModalRankingTable = () => {
        this.setState({
            showModalRankingTable: false
        })
    }

    _openModalRankingTable = () => {
        this.setState({
            showModalRankingTable: true
        })
    }

    render() {
        return (
            <>
                {
                    this.state.showModalRandomNumber ?
                        <RenderModalRandomNumber
                            closeModalRandonNumber={this._closeModalRandonNumber}
                            {...this.state} /> :
                        null
                }
                <ModalShowRankingTable
                    _closeModalRankingTable={this._closeModalRankingTable}
                    {...this.props}
                    {...this.state}
                />
                <ModalQuestions
                    _exitOfTheGame={this.props.deleteUser}
                    _handlerChange={this._handlerChange}
                    _closeModalQuestion={this._closeModalQuestion}
                    _validateQuestion={this._validateQuestion}
                    {...this.state} />
                <ImagePlayer
                    {...this.state} />
                <LayoutMonopoli
                    {...this.props}
                    _exitOfTheGame={this.props.deleteUser}
                    _openModalRankingTable={this._openModalRankingTable}
                    _startGame={this._startGame}
                    {...this.state} />
            </>
        )
    }
}

export default Monopoli;
