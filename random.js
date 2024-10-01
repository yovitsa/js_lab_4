
// let promise = new Promise(function(resolve, reject){
//     reject('Promise Rejected')
// })

// return promise .then(function(successMessage){
//     console.log(successMessage)
// })
//  .catch(function(errorMessage){
//     console.log(errorMessage)
//  })

const fs = require('node:fs')
const {promisify} = require('node:util')

const rediFileP = promisify(fs.readFile)  

readFilePromis('fule1.txt').then(fileTwo => readFilePromis(fileTwo)) 