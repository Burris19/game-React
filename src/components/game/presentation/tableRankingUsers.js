import React from 'react'

const TableRankingUsers = ({ allUsers = [] }) => {

    const _renderBody = () => {
        return allUsers.sort((a, b) => {
            if (a.goodQuestions > b.goodQuestions) {
                return 1
            }

            if (a.goodQuestions < b.goodQuestions) {
                return -1
            }

            return 0;
        }).reverse().map((user, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.userName}</td>
                    <td>{user.goodQuestions}</td>
                    <td>{user.badQuestions}</td>
                </tr>
            )
        })
    }

    return (
        <div className="card">
            <div className="card-header">
                <strong>Tabla de Posiciones</strong>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre de Usuario</th>
                            <th scope="col">Preguntas Correctas</th>
                            <th scope="col"> Preguntas Incorrectas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _renderBody()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableRankingUsers