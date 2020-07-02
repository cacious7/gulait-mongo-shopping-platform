const router = require( 'express' ).Router();
const RefreshToken = require( '../models/RefreshToken' );
const authenticateRefreshToken = require( '../../util/authenticateRefreshToken' );

/**
 * takes a token, verifies/authenticates it and
 *  deletes the refresh token belonging to the derived user
 * @param {JWT} token
 */
router.delete( '/', authenticateRefreshToken, async ( req, res ) => {
    try {
        const returnedRefreshToken = await RefreshToken.find( { userName: req.body.userName } );
        console.log( `logout here userName = ${ req.body.userName }` );
        if( returnedRefreshToken.length === 0 ) return res.status( 403 ).json( { message: 'ERROR', data: "Refresh token doesn't exist" } );
        const removedRefreshToken = await RefreshToken.deleteOne( { userName: req.body.userName } );

        res.status( 200 ).json( { message: 'SUCCESS', data: `Successfully logged out ${ req.body.userName }` } );
    } catch (err) {
        console.log( err );
        res.status( 500 ).json( { message: 'ERROR', data: err.toString() } );
    }
        
} )

module.exports = router;