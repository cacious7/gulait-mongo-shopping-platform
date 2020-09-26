//first import the Http protocol
const http = require( 'http' );

//require the express 
//aplication with its middleware
const app = require( './app.js' );

//then set the port. most hosting providers offer 
//an environment variable that contains 
//a port number you can use, if not 
//create a default 
const port = process.env.PORT || 3000;

//create a server running on http
//++a function can be passed to this 
//function to handle incoming requests
const server = http.createServer( app );

//now we make the server listen to the
//right port number for http requests
server.listen( port, () => {
    console.log( `Web server listening on port ${ port }.` );
} );

