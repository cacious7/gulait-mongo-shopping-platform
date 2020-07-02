const jwt = require( 'jsonwebtoken' );
require( 'dotenv/config' );

/**Authenticate a jwt token
 * @param { Request } req A request from a user client
 * @param { String } tokenType The type of the token passes, can either be an ACCESS token or a REFRESH token
 * @returns { Array } An array containing a status message and data in the format [ status, data ]
 */
function authenticateToken( token, tokenType ){
    console.log( ` token ${ token } ` );
    if ( token == null ){ 
        return [ 'ERROR', 'Please provide a token' ];
    } else{
        //this takes the token and the secret used to encode , 
        //decodes the token and returns the userdata that was provided 
        //in the token. If it fails, it returns an error 
        let result = null;
        console.log( tokenType );
        switch( tokenType.toLowerCase() ){
            case 'access token':
                jwt.verify( token, process.env.JWT_ACCESS_TOKEN_SECRET, ( err, payload ) => {
                    if( err ){
                        result = [ 'ERROR', 'Token is invalid' ];
                    }else{
                        result = [ 'Success', err.toString() ]; 
                    }
                    
                } );
                break;
            case 'refresh token':
                jwt.verify( token, process.env.JWT_REFRESH_TOKEN_SECRET, ( err, payload ) => {
                    if( err ){
                        result = [ 'ERROR', err.toString() ];
                    }else {
                        result = [ 'Success', payload.userData ];
                    } 
                    
                } );
                break;
            default:
                result = [ 'Error', 'Please provide a token type' ]
        }

        return result;
    }
}

module.exports = authenticateToken;