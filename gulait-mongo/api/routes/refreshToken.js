require( 'dotenv/config' );
const router = require( 'express' ).Router();
const RefreshToken = require( '../models/RefreshToken' );
const jwt = require( 'jsonwebtoken' );
const generateToken = require('../../util/generateToken');

router.post( '/', async ( req, res ) => {
    const refreshToken = req.body.token;
    //check if token isn't set
    if( refreshToken === null ) return res.status( 401 ).json( { message: 'ERROR', data: 'Provide a refresh token' } );
    const returnedRefreshToken = await RefreshToken.find( { token: refreshToken } );
    //check if token already exists
    if( returnedRefreshToken.length === 0 ) return res.status( 403 ).json( { message: 'ERROR', data: "Refresh token doesn't exist. Get a new one by signing in." } );
    //token exists and is not null
    jwt.verify( refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, async ( err, userData ) => {
        if( err ) return res.status( 403 ).json( { message: 'ERROR', data: err } );
        const accessToken = await generateToken( 'access token', userData.userData );
        res.status( 200 ).json( { message: 'SUCCESS', accessToken: accessToken } );
    } );
} );

module.exports = router;