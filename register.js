// const { error } = require('console')
//Importing Node modules

const fs = require('fs')
const {promisify} = require('util')

const readFileDb = promisify(fs.readFile)
const writeFileDb = promisify(fs.writeFile)

let registrationInfo = async (username, password) =>{
    fs.readFileDb('database.txt', (username, password, 'utf8'))

    .then((result) => {
        const users = result.split()
        if (users.includes(username)) {
            throw new Error ('Username exist already')
        }
        users.push(username, password)
        return fs.writeFileDb('js_lab_4/database.txt', username.toString(), password.toString())

    }).then(() =>
    {
        console.log('User added succefully')
    })
    .catch((err) => {
        console.log('An error occured, ', err.message)
    });
}

registrationInfo('jovica','123456789')
.then(() => {
    console.log('Everything went well')
})
.catch(() => {
    console.log('Banana')
})