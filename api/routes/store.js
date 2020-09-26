const router = require( 'express' ).Router();
const authenticateAccessToken = require( '../../util/auth/authenticateAccessToken' );
const grantSellerAccessToStore = require( '../../util/auth/grantSellerAccessToStore' );
const joi = require( 'joi' );
const Store = require( '../models/Store' );

/**
 * update a store
 * need authorization
 */
router.patch( '/update', authenticateAccessToken, grantSellerAccessToStore, async ( req, res ) => {
    try {
        const validationSchema = joi.object().keys( {
            email: joi.string().email(),
            storeId: joi.string().required(),
            addresses: joi.array(),
            visibility: joi.object(),
            categories: joi.array(),
            phone: joi.object(),
            logoUrl: joi.string(),
            shippingZones: joi.object(),
            barnerUrl: joi.string(),
            userName: joi.string().required(),
            roles: joi.array().required(),
            employingStores: joi.array().required()
        } );
        joi.validate( req.body, validationSchema, ( err, results) => {
            if( err ) return res.status( 401 ).json( { mesage: 'Error', data: err } );
        } );
    
        //if no error was sent back
        if( !res.headersSent ){
            //fetch
            const store = await Store.findById( req.body.storeId );
            //edit
            if( req.body.email ) store.email = req.body.email;
            if( req.body.addresses ) store.addresses = req.body.addresses;
            if( req.body.visibility ) store.visibility = req.body.addresses;
            if( req.body.phone ) store.phone = req.body.phone;
            if( req.body.logoUrl ) store.logoUrl = req.body.logoUrl;
            if( req.body.shippingZones ) store.shippingZones = req.body.shippingZones;
            if( req.body.barnerUrl ) store.barnerUrl = req.body.barnerUrl;
            if( req.body.categories ) store.categories = req.body.categories;
            //update
            const updatedStore = await store.save();
    
            if( updatedStore ){
                return res.status( 200 ).json( { message: 'Success', data: updatedStore } );
            }else{
                throw new Error( 'Store was not saved correctly. There was a problem while updating the store data. Please check you submitted data again.' );
            }
        }
    } catch ( err ) {
        return res.status( 500 ).json( { message: 'Error', data: err.toString() } );
    }
} );

/**
 * Return a list of stores that matches an id or a name
 * @param { String } req.body.id the id of the store 
 * @param { String } req.body.name the name of store to be found
 * @return { JSON } returns the list stores found and an message
 */
router.post( '/search', async ( req, res ) => {
    try{
        //if both id and name are not provided, then return an error message
        if( !req.body.id && !req.body.name ) return res.status( 400 ).json( { 
            message: 'Error', 
            data: 'Please provide either a store name or id' 
        } );
        //if both id and name are provided, return an error saying only  one can be provided
        if( req.body.id && req.body.name ) return res.status( 400 ).json( { 
            message: 'Error', 
            data: 'You cannot provide both id and name. Only one is required' 
        } ); 
        const validationSchema = joi.object().keys( {
            id: joi.string(),
            name: joi.string()
        } );
        joi.validate( req.body, validationSchema, ( err, results ) => {
            if( err ) res.status( 400 ).json( { message: 'Error', data: err } );
        } );

        let store = null;
        if( req.body.id ){
            store = await Store.findById( req.body.id );
        }else if( req.body.name ){
            store = await Store.find( req.body.name );
        }
        
        console.log( 'store', store );
        return res.status( 200 ).json( { message: 'Success', data: store } );
    }catch( err ){
        if( err ) return res.json( { message: 'Error', data: err.toString() } );
    }
}  );

/**
 * Delete a store
 */
//router.delete();

module.exports = router;