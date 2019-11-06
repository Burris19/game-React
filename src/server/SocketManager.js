const io = require('./index').io

const { USER_CONNECTED, GET_ALL_USERS, UPDATE_USER, USER_DISCONNETED } = require('../Events')

let connectedUsers = []

module.exports = function (socket) {
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user
        io.emit(GET_ALL_USERS, connectedUsers)
    })

    socket.on(UPDATE_USER, (user) => {
        connectedUsers = updateUser(connectedUsers, user)
        socket.user = user
        io.emit(GET_ALL_USERS, connectedUsers)
    })

    socket.on(USER_DISCONNETED, (user) => {
        connectedUsers = deleteUser(connectedUsers, user)
        socket.user = user
        io.emit(GET_ALL_USERS, connectedUsers)
    })

    io.emit('GET_ALL_USERS', connectedUsers);
}

function addUser(userList, user) {
    const index = userList.findIndex(({ userName }) => userName === user.userName);
    if (index === -1) {
        userList.push(user)
    }
    return userList
}

function updateUser(userList, user) {
    const index = userList.findIndex(({ id }) => id === user.id);
    userList[index] = user
    return userList;
}

function deleteUser(userList, user) {
    userList = userList.filter(({ id }) => id !== user.id);
    return userList;
}