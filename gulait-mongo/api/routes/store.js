const router = require( 'express' ).Router();
const authenticateAccessToken = require( '../../util/auth/authenticateAccessToken' );
const grantSellerAccessToStore = require( '../../util/auth/grantSellerAccessToStore' );
const joi = require( 'joi' );
const Store = require( '../models/Store' );\
const generateCategoryQuery = require( '../../util/auth/generateCategoryQuery' );

/**
 * Get a list of stores
 */
router.get( async () => {
    conts validationSchema = joi.object().keys( {
        category: joi.string().allow( '' )
    } );

    joi.validate( req.body, validationSchema, ( err, results ) => {
        if( err ) res.status( 401 ).json( {
            message: 'Error', data: err  
        } );
    } );

    if( !headersSent ){
        const query = generateCategoryQuery( req.body.category );
        if( query ){
            const categories = Store.find( query == true );
            if( categories ){
                return
            }  
        }
        const store = await Store.find( {} );
    }
} );

/**
 * update a store
 * need authorization
 */
router.patch( '/update', authenticateAccessToken, grantSellerAccessToStore, async () => {
    try {
        const validationSchema = joi.object().keys( {
            email: joi.string().email(),
            id: joi.string().required(),
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
            const store = await Store.findById( req.body.id );
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
 * Delete a store
 */
router.delete();

module.exports = router;