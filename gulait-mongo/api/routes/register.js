const router = require( 'express' ).Router();
const User = require( '../models/User' );
const bcrypt = require( 'bcrypt' );
const joi = require( 'joi' );

//REGISTER A USER
router.post( '/', async ( req, res ) => {
    console.log( req.body );

    //Validate the user input
    const validationSchema = joi.object().keys( { 
        userName: joi.string().min( 5 ).max( 20 ).required(),
        password: joi.string().min( 6 ).max( 15 ).required()
     } );

    joi.validate( req.body, validationSchema, ( err, result ) => {
        if( err ) return res.json( { message:'ERROR', data: err } );
    } );

    //If a response has already been sent to the user,
    //dont do any more processing
     if ( ! res.headersSent ) {
        try {

            //second param is the salt rounds/ salt creator, the higher the num, 
            //the harder the salt is to guess and the longer it takes to create
            const hashedPassword = await bcrypt.hash( req.body.password, 10 ); 
            console.log( hashedPassword );

            const user = User( {
                userName: req.body.userName,
                password: hashedPassword
            } );

            const savedUser = await user.save()
            res.status( 200 ).json( { message: 'success', data: savedUser });
        } catch (err) {
            res.json( { message: 'ERROR', data: err } );
        }
    }
} );

module.exports = router;