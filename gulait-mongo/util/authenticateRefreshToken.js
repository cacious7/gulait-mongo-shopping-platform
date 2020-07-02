const jwt = require( 'jsonwebtoken' );
require( 'dotenv/config' );
const authenticateToken = require( './authenticateToken' );

/**Authenticate a jwt Refresh Token */
function authenticateRefreshToken( req, res, next ){
    //the token is stored in the request header's bearer attribute
    //the attribute is seperated from its value(token) by a space in the form 
    // Bearer token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //this code returns authHeader.split(' ')[1] if authHeader returns true
    
    const result = authenticateToken( token, 'REFRESH TOKEN' );
    console.log( `result = ${ result } ` );

    switch( result[0].toLowerCase() ){
        case 'error':
            res.status( 401 ).json( { message: result[0], data: result[1] } );
            break;
        case 'success':
            req.body.userName = result[1];
            next(); //go to the next function in the middleware
            break;
        default: 
            res.status( 401 ).json( { 
                message: 'Error', 
                data: 'Something went wrong while authenticating token. Please ensure your token is valid and if so, contact the system admin' 
            } );
    }
}

module.exports = authenticateRefreshToken;