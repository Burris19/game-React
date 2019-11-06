import React, { Component } from 'react';
import LayoutWelcome from '../presentation/layout'

export class Welcome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            userName: ''
        }
    }

    _handlerChange = (e) => {
        const { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    _handlerSubmit = (e) => {
        e.preventDefault()
        this.setState({
            submitted: true
        })

        const { userName } = this.state;

        if (userName) {
            this.props.history.push(`/game/${userName}`)
        }
    }

    render() {
        return <LayoutWelcome
            handlChange={this._handlerChange}
            handlerSubmit={this._handlerSubmit}
            {...this.state} />
    }
}

export default Welcome