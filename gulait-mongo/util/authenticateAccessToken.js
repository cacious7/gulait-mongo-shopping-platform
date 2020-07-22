const jwt = require( 'jsonwebtoken' );
const authenticateToken = require( './authenticateToken' );
const getBearerToken = require( './getBearerToken' );
require( 'dotenv/config' );

/**Authenticate a jwt access token */
function authenticateAccessToken( req, res, next ){
    const token = getBearerToken( req );
    const result = authenticateToken( token, 'ACCESS TOKEN' );
    
    switch( result.message.toLowerCase() ){
        case 'error':
            res.status( 401 ).json( { message: result.message, data: result.data } );
            break;
        case 'success':
            req.body.userName = result.data.userName;
            req.body.roles = result.data.roles;
            if( result.data.employingStores ) {
                req.body.employingStores = result.data.employingStores
            }
            next(); //go to the next function in the middleware
            break;
        default: 
            res.status( 401 ).json( { 
                message: 'Error', 
                data: 'Something went wrong while authenticating token. Please ensure your token is valid and if so, contact the system admin' 
            } );
    }
    
}

module.exports = authenticateAccessToken;