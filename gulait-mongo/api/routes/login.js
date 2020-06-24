require( 'dotenv/config' );
const router = require( 'express' ).Router();
const User = require( '../models/User' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const generateToken = require( '../../util/generateToken' );
const RefreshToken = require( '../models/RefreshToken' );
const joi = require( 'joi' );

//LOGIN A USER
router.post( '/', async ( req, res ) => {
    //Validate user input
    const validateSchema = joi.object().keys( {
        userName: joi.string().min( 1 ).required(),
        password: joi.string().min( 1 ).required()
    } );
    console.log( req.body );
    joi.validate( req.body, validateSchema, ( err, results ) => {
        if( err) res.json( { message: 'ERROR', data: err } );
    } );

    //if response has already been sent, 
    //dont process any further
    if( !res.headersSent ){
        try{
            //User Authentication
            //this is assigning the user variable to 
            //the first element in the returned array
            //using the destruction machanism, check freecodecamp es6 lessons
            const [ user ] = await User.find( { userName: req.body.userName } );
            if( user == null || user == undefined ){
                return res.json( { message: 'ERROR', data: 'Cannot find a user with this username' } );
            } else{

                    const existingRefreshToken = await RefreshToken.find( { userName: user.userName } );
                    if( existingRefreshToken && existingRefreshToken.length > 0 ) return res.json( { message: 'ERROR', data: 'User is already logged in' } );
                    //the bcrypt.compare function hashes the normal password to be compared
                    // and adds some more timin security features and compares both password
                    // correctly
                    //const { userName, password } = user;
                    console.log( req.body.password + " , " + user.userName );
                    if( await bcrypt.compare( req.body.password, user.password ) ){
                        
                        const accessToken = await generateToken( 'access token', user.userName );
                        const refreshToken = await generateToken( 'refresh token', user.userName ); 
                        res.status( 200 ).json( { message: 'successful login', accessToken: accessToken, refreshToken: refreshToken} );
                    } else{
                        console.log ('Wrong login password');
                        res.json( { message: 'Couldn\'t find a user with these log in details' } );
                    }
            }
        } catch (err) {
            console.log( err );
            res.json( { message: 'ERROR', data: err.toString() } );
        }
    }
    
} );

module.exports = router;