
var url = 'http://mylogger.io/log';     //url for sending an http request

function log(message){
    // Send an HTTP request
    console.log(message)
}

const people = ['Mohit', 'Akshay', 'Sid'];

module.exports.log = log;       //module has an object called exports, which helps in using the function in the main module 
//so we add a method called log and set it to the log function that we defined

//module.exports = people;
//module.exports.url = url      //Former url is the variable that will be used in the other modules and latter is the variable used in current module