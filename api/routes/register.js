const router = require( 'express' ).Router();
const User = require( '../models/User' );
const Store = require( '../models/Store' );
const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const joi = require( 'joi' );

/**
 * Registers a guest user as a Buyer
 * @param {JSON} req contains request data fromthe user
 * @param {JSON} res constains response data sent to the user
 * @return {JSON} the res object is sent back to user
 */
router.post( '/buyer', async ( req, res ) => {
    //Validate the user input
    const validationSchema = joi.object().keys( { 
        userName: joi.string().min( 3 ).max( 20 ).required(),
        email: joi.string().email().required(),
        password: joi.string().min( 6 ).max( 15 ).required()
     } );

    joi.validate( req.body, validationSchema, ( err, result ) => {
        if( err ) return res.json( { message:'ERROR', data: err } );
    } );

    //If a response has already been sent to the user,
    //dont do any more processing
     if ( !res.headersSent ) {
        try {

            //second param is the salt rounds / salt creator, the higher the num, 
            //the harder the salt is to guess and the longer it takes to create
            const hashedPassword = await bcrypt.hash( req.body.password, 10 ); 

            const user = new User( {
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
                roles: [ { name: "buyer" } ]
            } );

            const savedUser = await user.save();
            res.status( 200 ).json( { 
                message: 'Registration successfull', 
                data: { user: savedUser.userName } 
            });
        } catch (err) {
            console.log( err );
            res.json( { message: 'Error', data: err.toString() } );
        }
    }
} );

/**
 * Registers a guest user as a Seller
 * @param {JSON} req contains request data fromthe user
 * @param {JSON} res constains response data sent to the user
 * @return {JSON} the res object is sent back to user
 */
router.post( '/seller', async ( req, res ) => {
   
    if ( !req.body.userEmail && !req.body.storeEmail ) 
    return res.json( { 
        message: 'Error', 
        Error: 'Both userEmail and storeEmail cannot be null. Atleast one is required' 
    } );
    
    const validationSchema = joi.object().keys( {
        userName: joi.string().trim().min( 3 ).max( 20 ).required(),
        // firstName: joi.string().trim().max( 30 ).required(),
        // lastName: joi.string().trim().max( 30 ).required(),
        userEmail: joi.string().trim().email(),
        storeEmail: joi.string().trim().email(),
        storeName: joi.string().trim().min( 2 ).max( 40 ),
        password: joi.string().min( 6 ).max( 15 ).required()
    } );

    joi.validate( req.body, validationSchema, ( err, result ) => {
        if( err ) return res.json( { message:'ERROR', data: err } );
    } );

    //universal email
    let email = null;

    //if both userEmail and storeEmail are unset return an error
    if( ( !req.body.userEmail && !req.body.storeEmail ) || ( req.body.userEmail == '' && req.body.storeEmail == '' ) ){ 
        return res.json( {
            message: 'Error', 
            Error: 'Atleast one of userEmail or storeEmail is required' 
        } );
    } 
    //if only one of them has a value then set email to the set email
    else if( ( !req.body.userEmail || !req.body.storeEmail ) || ( req.body.userEmail == '' || req.body.storeEmail == '' ) ){
        //if userEmail is set, set it equal to email
        if( ( req.body.userEmail && req.body.userEmail != '' ) && ( !req.body.storeEmail || req.body.storeEmail == '' ) ){
            email = req.body.userEmail;
        } 
        //if storeEmail is set, set it equal to email
        else if( ( req.body.storeEmail && req.body.storeEmail != '' ) && ( !req.body.userEmail || req.body.userEmail == '' ) ){
            email = req.body.storeEmail;
        }
    }// if none of these conditions are true, then both variables are set

    //if email = null, then both emails have been set
    //make sure no response has been sent back before proceeding
    if( !res.headersSent ){
        try {
            const hashedPassword = await bcrypt.hash( req.body.password, 10 );

            const store = new Store( {
                name: req.body.storeName,
                email: email != null ? email : req.body.storeEmail,
                storeUrl: req.body.storeName.toLowerCase()
            } );

            let savedStore = null;
            let savedUser = null;
            //let the multiple models save synchronously
            await store.save()
            .then( async ( storeDoc ) => {
                savedStore = storeDoc;
                const user = new User( {
                    userName: req.body.userName,
                    // firstName: req.body.firstName,
                    // lastName: req.body.lastName,
                    email: email != null ? email : req.body.userEmail,
                    password: hashedPassword,
                    roles: [ { name: "seller" }, { name: "buyer" } ],
                    employingStores: [ { 
                        storeId: savedStore._id,
                        storeName: savedStore.name
                     } ]
                } );
    
                await user.save()
                .then( userDoc => {
                    savedUser = userDoc;
                } )
            });
            
            //wait for the asynchronous model saving
            res.status( 200 ).json( { 
                message: 'Success', 
                data: { 
                    user: savedUser, 
                    store: savedStore 
                } 
            } );

        } catch (err) {
            return res.json( {
                message: 'Error', data: err.toString()
            } );
        }
    }


} );

module.exports = router;