const jwt = require( 'jsonwebtoken' );
const RefreshToken = require( '../../api/models/RefreshToken' );

/**
 * Creates a JWT token
 * userData should always be an object otherwise expiresIn option is ignored and gives an error
 */
async function generateToken( type, userData ){
    
    if( type === 'access token' ){ 
        return jwt.sign( { userData: userData }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "1h" } )
    } else if( type === 'refresh token' ){
        //normally a refresh token should never expire but should be deleted from
        //the database when a user logs out
        //but I prefer that they still expire after a longer period of time than access token
        //to ensure that there are no tokens that can access our system forever
        const refreshToken = jwt.sign( { userData: userData }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "1D" } );
        const refreshTokenModel = new RefreshToken( {
            userName: userData.userName,
            token: refreshToken
        } );
        
        try {
            const savedRefreshToken = await refreshTokenModel.save();
            return  savedRefreshToken.token;
        } catch ( err ) {
            return err.toString();
        }
        
    }
}

module.exports = generateToken;
