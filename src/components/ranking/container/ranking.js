import React, { Component } from 'react'
import io from 'socket.io-client'

import TableRankingUsers from '../../game/presentation/tableRankingUsers'
const socketUrl = "http://34.216.159.130:3231/"

class Ranking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: io(socketUrl),
            allUsers: []
        }
    }

    componentDidMount() {
        const { socket } = this.state;
        socket.on('connect', () => {
            this.getAllUsers()
        })
    }

    getAllUsers = () => {
        const { socket } = this.state;
        socket.on('GET_ALL_USERS', (users) => {
            this.setState({
                allUsers: users
            })
        })
    }

    render() {
        return (
            <div className="container">
                <TableRankingUsers
                    {...this.state} />
            </div>
        )
    }

}

export default Ranking