const router = require( 'express' ).Router();
const Tag = require( '../models/Tag' );

/**
 * Lists the tags available to the user
 */
router.get( '/list', async ( req, res ) => {
    try {
        const tags = await Tag.find( {} );
        if( tags && tags.length > 0 ) {
            return res.status( 200 ).json( { message: 'Success', data: tags } );
        }else{
            throw new Error( 'There are no tags available in the system.' );
        }
    } catch ( err ) {
        return res.status( 500 ).json( { message: 'Error', data: err.toString() } );
    }
    
} );

module.exports = router;