const router = require( 'express' ).Router();
const User = require( '../models/User' );
const bcrypt = require( 'bcrypt' );
const joi = require( 'joi' );

/**
 * REGISTERS A USER
 * @param {JSON} req contains request data fromthe user
 * @param {JSON} res constains response data sent to the user
 * @return {JSON} the res object is sent back to user
 */
router.post( '/buyer', async ( req, res ) => {
    console.log( req.body );

    //Validate the user input
    const validationSchema = joi.object().keys( { 
        userName: joi.string().min( 3 ).max( 20 ).required(),
        fistName: joi.string().max( 30 ).required(),
        lastName: joi.string().max( 30 ).required(),
        email: joi.string().email().required(),
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
                firstName: req.body.fistName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                roles: [ { name: "buyer" } ]
            } );

            const savedUser = await user.save()
            res.status( 200 ).json( { message: 'success', data: savedUser });
        } catch (err) {
            res.json( { message: 'ERROR', data: err } );
        }
    }
} );

module.exports = router;