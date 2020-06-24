const router = require( 'express' ).Router();
const RefreshToken = require( '../models/RefreshToken' );

router.delete( '/', async ( req, res ) => {
    

    const refreshToken = req.body.token;
    try {
        if( refreshToken === null ) return res.status( 401 ).json( { message: 'ERROR', data: 'Provide a refresh token' } );
        const returnedRefreshToken = await RefreshToken.find( { token: refreshToken } );

        if( returnedRefreshToken.length === 0 ) return res.status( 403 ).json( { message: 'ERROR', data: "Refresh token doesn't exist" } );
        const removedRefreshToken = await RefreshToken.deleteOne( { token: refreshToken } );

        res.status( 200 ).json( { message: 'SUCCESS', data: 'Successfully logged out' } );
    } catch (err) {
        res.status( 500 ).json( { message: 'ERROR', data: err } );
    }
        
} )

module.exports = router;