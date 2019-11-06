const uuidv4 = require('uuid/v4');

const createUser = (userName = '') => ({
    id: uuidv4(),
    userName,
    goodQuestions: 0,
    badQuestions: 0
})

module.exports = {
    createUser
}