const jwt = require( 'jsonwebtoken' );
require( 'dotenv/config' );
const authenticateToken = require( './authenticateToken' );
const getBearerToken = require( './getBearerToken' );

/**Authenticate a jwt Refresh Token */
function authenticateRefreshToken( req, res, next ){
    const token = getBearerToken( req );
    
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