
const logger = require('./logger');    //require function is used to load other modules. "./" is used to indicate that logger is in same folder as of app.js
logger.log('Message');
//console.log(logger);

const path = require('path')        //As path is a pre defined module in node, hence "./" is not required.

var pathObj = path.parse(__filename);       //parse is the method defined in the module path. __filename stands name of the current file
console.log(pathObj);       //Hence to work with paths, it is easier to use path module

 
var x = 7;
console.log("The answer is: " + x);
//or 
console.log(`Total Memory: ${x}`);


const fs = require('fs');
//const files = fs.readdirSync('./');     //Synchronous form of reading directories (Notes)
//console.log(files);

//Below Asynchronous form:
fs.readdir('./', function(err, files){      //All asynchronous operations take a function as their last parameter, Node calls this function when asyn operations completes
//This function is called callback. It contains 2 parameters- error and result which here is 'files. Only one of these has a value and thus we check it with an if and else.
    if  (err) console.log('Error', err);
    else console.log('Result', files);

});

//An event is basically a signal that something has happened. Now our job is to respond to that event by reading it and returning a respond 
const EventEmitter = require('events');     //EventEmitter is a class the event module
const emitter = new EventEmitter();         //In order to use this EventEmitter, we Create instance of this class. "emitter" is an object

//Register  a listener. Listener is a function which is called when an event is raised
emitter.on('messageLogged', function(){     //emitter.on is a method in the class EventEmitter which is a listerner
//It takes 2 arguments, first is the event, Second is callback function.
    console.log('Listener called');
});

//To Raise an Event
emitter.emit('messageLogged');     //signalling that an event has happened. We here pass an argument that is the name of the event
//Now everytime we log a message, we are going to raise this event.

//Note: Always define listeners before emitting. emitter calls listeners synchronously


const http = require('http');
//Various routes are handled here for our backend
const server = http.createServer((req, res) => {        //storing http method into server (object) which is an event emitter.
//Also creating a callback function through arrow function which takes 2 parameters, request and response

console.log(req.url, req.method);
res.setHeader('Content-Type', 'text/html');

let path = './.vscode/views/';
switch(req.url)  {
    case '/':
        path += 'index.html';
        break;
    case '/about':
        path += 'about.html';
        break;
    default:
        path += '404.html';
        break;
}
    
    fs.readFile(path, (err, data) =>{
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
 /*   if (req.url === '/'){
        res.write('Hello World');
        res.end();      //Ending response 
    }

    if(req.url === '/api/coursess'){     //To return a list of courses from the databases
        res.write(JSON.stringify([1,2,3]));     //Returning an array of numbers by converting it into string using JSON
        res.end();
    }
    */
}); 

//Low level connection below:
//server.on("connection", (socket) => {    //Name of the event is 'connection'
  //  console.log('New Connection...');
//});    
server.listen(3000);
console.log('Listening on port 3000...');
