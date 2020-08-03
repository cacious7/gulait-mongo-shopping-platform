const router = require( 'express' ).Router();
const RefreshToken = require( '../models/RefreshToken' );
const authenticateRefreshToken = require( '../../util/auth/authenticateRefreshToken' );
const joi = require( 'joi' );

/**
 * takes a token, verifies/authenticates it and
 *  deletes the refresh token belonging to the derived user
 * @param {JWT} token
 */
router.delete( '/', authenticateRefreshToken, async ( req, res ) => {
    const validationSchema = new joi.object().keys( {
        userName: joi.string().required(),
        roles: joi.array()
    } );

    joi.validate( req.body, validationSchema, ( err, results ) => {
        if( err ) return res.status( 401 ).json( {
            message: 'Error',
            data: err.toString()
        } );
    } );

    //if response has already been sent, 
    //dont process any further
    if( !res.headersSent ){
        try {
            const returnedRefreshToken = await RefreshToken.find( { userName: req.body.userName } );
            console.log( `logout here userName = ${ req.body.userName }, returned RefreshToken = ${ returnedRefreshToken }` );
            if( returnedRefreshToken.length === 0 ) return res.status( 403 ).json( { message: 'ERROR', data: "Refresh token doesn't exist" } );
            const removedRefreshToken = await RefreshToken.deleteOne( { userName: req.body.userName } );

            res.status( 200 ).json( { message: 'SUCCESS', data: `Successfully logged out ${ req.body.userName }` } );
        } catch (err) {
            console.log( err );
            res.status( 500 ).json( { message: 'ERROR', data: err.toString() } );
        }
    }
} )

module.exports = router;