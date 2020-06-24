const router = require( 'express' ).Router();

//Return the home page
router.get( '/', ( req, res) => {
    res.status( 200 ).send( 'You\'ve reached the home page.' );
} );

module.exports = router;