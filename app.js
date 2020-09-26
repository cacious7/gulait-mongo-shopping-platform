require( 'dotenv/config' );
const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );
const morgan_log = require( 'morgan' );

//IMPORT ROUTES
const homeRouter = require( './api/routes/home' );
const loginRouter = require( './api/routes/login' );
const registerRouter = require( './api/routes/register' );
const refreshToken = require( './api/routes/refreshToken' );
const logoutRouter = require( './api/routes/logout' );
const productRouter = require( './api/routes/product');
const categoryRouter = require( './api/routes/category' );
const storeRouter = require( './api/routes/store' );
const tagRouter = require( './api/routes/tag' );

//DATABASE CONNECTION
mongoose.connect(
    process.env.DBCONNECTION, //db connect url - only this is mandatory and is hidden in the .env file. Dont upload the .env file to github
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, //solve mongoose deprecation warnings
    () => console.log( 'connection status in app.js = ' + mongoose.connection.readyState ) //on success function
).catch( err => {
    console.log( err );
    app.use( ( req, res, next ) => {
        res.status( 500 ).json( { error: err } )
    });
});

//MIDDLEWARE
//these arespecific functions that are run when specific routes are requested
//NB: if no route is specified, then the function runs for all the routes created

app.use( morgan_log( 'dev' ) ); //for logging requests
app.use( bodyParser.json() ); //this makes sure that all the data that is sent to the requests is parsed to json first

//set up the HEADER INFORMATION  to handle things like CORS errors
app.use( ( req, res, next ) => {
    //you can also individually add what websites, you want to give access to
    //e.g. www.gulait.com, but ths allows all websites 
    res.header( 'Access-Control-Allow-Origin', '*' );

    //specify the HEADERS you want appended to the request url
    res.header( 'Access-Conrol-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );

    //Specify the METHODS the API supports since a browser always initially sends
    //an OPTIONS method request to check which method to use
    if( res.method == 'OPTIONS' ){
        res.header( 'Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE' );
        return res.status( 200 ).json( {} );
    }

    //proceed next in the middleWare
    next();
});


//ROUTING 
app.get( '/', ( req, res ) => { res.redirect( '/home' ) } );
app.use( '/home', homeRouter );
app.use( '/login', loginRouter );
app.use( '/register', registerRouter );
app.use( '/token', refreshToken );
app.use( '/logout', logoutRouter );
app.use( '/product', productRouter );
app.use( '/category', categoryRouter );
app.use( '/store', storeRouter );
app.use( '/tag', tagRouter );


//File handling - to serve static files such as css, img or js files
app.use( express.static( 'views' ) );
//serving more specific types of flies specific to the users of the platform
app.use( express.static( 'files' ) );

//ERROR HANDLING

//ERROR HANNDLING FOR ALL REQUEST THAT DONT HAVE HANDLERS/CONTROLERS
app.use( ( req, res, next ) => {
    const error = new Error('Sorry, the resource your are looking for was NOT FOUND!');
    error.status = 404;
    //pass the error on next in the middleware
    next( error );
});

//ERROR HANDLING FOR ANY OTHER ERRORS NOT CAUGHT THAT HAPPEN IN THE APPLICATION
//E.G. IF A DATABASE OPERATION GOES WRONG, WE WANT TO GIVE A CUSTOM ERROR MESSAGE
app.use( ( error, req, res, next ) => {

    //if the error status isnt already set, we shall set it to 500 as default
    //server error status code
    res.status( error.status || 500 );
    console.log( error );
    res.json( {
        error : {
            message : error.message,
            error_Status : res.status
        }
    } );
} );

module.exports = app;
