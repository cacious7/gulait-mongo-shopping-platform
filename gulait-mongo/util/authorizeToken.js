const jwt = require( 'jsonwebtoken' );
require( 'dotenv/config' );

/**Authenticate a jwt token */
function authorizeToken( req, res, next ){
    //the token is stored in the request header's bearer attribute
    //the attribute is seperated from its value(token) by a space in the form 
    // Bearer token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //this code returns authHeader.split(' ')[1] if authHeader returns true
    if ( token == null ){ 
        return res.status( 401 ).json( { message: 'ERROR', data: 'Please provide a token' } )
    } else{
        //this takes the token and the access token used to encode , 
        //decodes the token and returns the userdata that was provided 
        //in the token. If it fails, it returns and error 
        jwt.verify( token, process.env.JWT_ACCESS_TOKEN_SECRET, ( err, userData ) => {
            if( err ) return res.status( 403 ).json( { message: 'ERROR', data: 'Token is invalid' } );
            req.userName = userData.userData; //just to make sure we actually have the correct user/name passed forward
            next(); //go to the next function  after this middleware
        } );
    }
}

module.exports = authorizeToken;