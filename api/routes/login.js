require( 'dotenv/config' );
const router = require( 'express' ).Router();
const User = require( '../models/User' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const generateToken = require( '../../util/auth/generateToken' );
const authenticateToken = require( '../../util/auth/authenticateToken' );
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
            const [ user ] = await User.find( { $or: [ { userName: req.body.userName }, { email: req.body.userName } ] } );
            if( user == null || user == undefined ){
                return res.json( { message: 'ERROR', data: 'Cannot find a user with this username' } );
            } else{

                    const existingRefreshToken = await RefreshToken.find( { userName: user.userName } );
                    
                    //if refresh token is valid, tell the user he is already logged in
                    //, otherwise, delete the exisiting refresh token and log the user in
                    //this action prevents storing refresh tokens for users that didnt explicity log out 
                    if( existingRefreshToken && existingRefreshToken.length > 0 ){
                        console.log( `existing refresh token = ${ existingRefreshToken[0].token }` );
                        const result = authenticateToken( existingRefreshToken[0].token, "REFRESH TOKEN" );

                        switch( result.message.toLowerCase() ){
                            case 'error':
                                const expiredRefreshToken = await RefreshToken.deleteOne( { userName: req.body.userName } );
                                break;
                            case 'success':
                                return res.json( { message: 'ERROR', data: 'User is already logged in' } );
                            default: 
                                res.status( 401 ).json( { 
                                    message: 'Error', 
                                    data: 'Something went wrong while authenticating token. Please ensure your token is valid and if so, contact the system admin' 
                                } );
                        }
                    } 
                    //the bcrypt.compare function hashes the normal password to be compared
                    // and adds some more timin security features and compares both password
                    // correctly
                    //const { userName, password } = user;
                    console.log( req.body.password + " , " + user.userName );
                    if( await bcrypt.compare( req.body.password, user.password ) ){
                        let tokenPayload = null;
                        if( user.roles[0].name.toLowerCase() === 'buyer' ){
                            tokenPayload = { 
                                userName: user.userName,
                                roles: user.roles
                            };
                        } else if( user.roles[0].name.toLowerCase() === 'seller' ){
                            tokenPayload = { 
                                userName: user.userName,
                                roles: user.roles,
                                employingStores: user.employingStores
                            };
                        }
                        
                        const accessToken = await generateToken( 'access token', tokenPayload );
                        const refreshToken = await generateToken( 'refresh token', tokenPayload ); 
                        res.status( 200 ).json( { message: 'successful login', accessToken: accessToken, refreshToken: refreshToken, role: user.roles[0].name } );
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