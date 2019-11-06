import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, UPDATE_USER, USER_DISCONNETED } from '../../../Events';
import Monopoli from './monopoli.js'
import { createUser } from '../../../Factories'
const socketUrl = "http://34.216.159.130:3231"

export class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: io(socketUrl),
            user: {
                id: '',
                userName: '',
                goodQuestions: 0,
                badQuestions: 0
            },
            allUsers: [],
            userName: this.props.match.params.userName || 'User'
        }
    }

    componentDidMount() {
        const { socket } = this.state;
        socket.on('connect', () => {
            this.setUser();
            this.getAllUsers()
        })

        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            this.disconectedUser()
        });
    }

    componentWillUnmount() {
        this.deleteUser()
    }

    getAllUsers = () => {
        const { socket } = this.state;
        socket.on('GET_ALL_USERS', (users) => {
            this.setState({
                allUsers: users
            })
        })
    }

    deleteUser = () => {
        const { socket, user } = this.state
        socket.emit(USER_DISCONNETED, user)
    }

    setUser = () => {
        const { socket } = this.state
        const { userName } = this.state
        const newUser = createUser(userName)
        socket.emit(USER_CONNECTED, newUser)
        this.setState({ user: newUser })
    }

    updateUser = (user) => {
        const { socket } = this.state
        socket.emit(UPDATE_USER, user)
        this.setState({ user: user })
    }

    _incrementCorrectQuestion = () => {
        const { user } = this.state
        let newUser = Object.assign({}, user);
        newUser.goodQuestions = parseInt(newUser.goodQuestions) + 1
        this.updateUser(newUser)
    }

    _incrementIncorrectQuestion = () => {
        const { user } = this.state
        let newUser = Object.assign({}, user);
        newUser.badQuestions = parseInt(newUser.badQuestions) + 1
        this.updateUser(newUser)
    }

    disconectedUser = () => {
        this.deleteUser()
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="container">
                <Monopoli
                    deleteUser={this.disconectedUser}
                    incrementCorrectQuestion={this._incrementCorrectQuestion}
                    incrementIncorrectQuestion={this._incrementIncorrectQuestion}
                    {...this.state} />
            </div>
        )
    }
}

export default Game