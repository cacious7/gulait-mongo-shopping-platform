require( 'dotenv/config' );
const router = require( 'express' ).Router();
const RefreshToken = require( '../models/RefreshToken' );
const jwt = require( 'jsonwebtoken' );
const generateToken = require( '../../util/generateToken' );
const joi = require( 'joi' );
const authenticateRefreshToken = require( '../../util/authenticateRefreshToken' );

router.post( '/', authenticateRefreshToken, async ( req, res ) => {
    const validationSchema = new joi.object().keys( {
        userName: joi.string().required()
    } );

    joi.validate( req.body, validationSchema, ( err, results ) => {
        if( err ) return res.status( 401 ).json( {
            message: 'Error',
            data: err.toString()
        } );
    } );

    const returnedRefreshToken = await RefreshToken.find( { userName: req.body.userName } );
    //check if token already exists
    if( returnedRefreshToken.length === 0 ) return res.status( 403 ).json( { message: 'ERROR', data: "Refresh token doesn't exist. Get a new one by signing in." } );
    //token exists and is not null
    const accessToken = await generateToken( 'access token', req.body.userName );
    res.status( 200 ).json( { message: 'SUCCESS', accessToken: accessToken } );
} );

module.exports = router;