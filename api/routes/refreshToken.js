require( 'dotenv/config' );
const router = require( 'express' ).Router();
const RefreshToken = require( '../models/RefreshToken' );
const generateToken = require( '../../util/auth/generateToken' );
const joi = require( 'joi' );
const authenticateRefreshToken = require( '../../util/auth/authenticateRefreshToken' );

router.post( '/', authenticateRefreshToken, async ( req, res ) => {
    const validationSchema = new joi.object().keys( {
        userName: joi.string().required(),
        roles: joi.array(),
        employingStores: joi.array()
    } );

    joi.validate( req.body, validationSchema, ( err, results ) => {
        if( err ) return res.status( 401 ).json( {
            message: 'Error',
            data: err.toString()
        } );
    } );

    //only process if no headers have been sent already
    if( !res.headersSent ) {
        const returnedRefreshToken = await RefreshToken.find( { userName: req.body.userName } );
        //check if token already exists
        if( returnedRefreshToken.length === 0 ) return res.status( 403 ).json( { message: 'ERROR', data: "Refresh token doesn't exist. Get a new one by signing in." } );
        //token exists and is not null

        let tokenPayload = null;
        if( req.body.roles[0].name.toLowerCase() === 'buyer' ){
            tokenPayload = { 
                userName: req.body.userName,
                roles: req.body.roles
            };
        } else if( req.body.roles[0].name.toLowerCase() === 'seller' ){
            tokenPayload = { 
                userName: req.body.userName,
                roles: req.body.roles,
                employingStores: req.body.employingStores
            };
        }

        const accessToken = await generateToken( 'access token', tokenPayload );
        res.status( 200 ).json( { message: 'SUCCESS', accessToken: accessToken } );
    }
} );

module.exports = router;