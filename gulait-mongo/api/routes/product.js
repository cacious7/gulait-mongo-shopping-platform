const router = require( 'express' ).Router();
const mongoose = require( 'mongoose' );
const joi = require( 'joi' );
const Product = require( '../models/Product' );
const crypto = require( 'crypto' );
const authenticateAccessToken = require( '../../util/authenticateAccessToken' );

/**
 * Creates a product
 * The simplest version of a product only has a 'name' and 'productType' as required input from the user
 */
router.post( '/', authenticateAccessToken, ( req, res ) => {
    if( req.body.roles[0].name != 'seller' ) return res.status( 401 ).json( { message: 'Error', data: 'The user must be a seller to create a product' } );
    
    //verify that a seller has access to a specific store
    const result = req.body.employingStores.includes( { storeId: req.body.storeId } );
    return res.json( { message: 'Result', data: result } );
    const validationSchema = joi.object().keys( {
        sku: joi.string(),
        name: joi.string().required(),
        productType: joi.string().required(),
        imgUrl: joi.string(),
        price: joi.number(),
        minPrice: joi.number(),
        maxPrice: joi.number(),
        variations: joi.array(),
        discountType: joi.string(),
        discount: joi.number(),
        discountMinOrder: joi.number(),
        discountStartDate: joi.date(),
        discountEndDate: joi.date(),
        inStock: joi.boolean(),
        enableStockManagement: joi.boolean(),
        stockQty: joi.number(),
        shippingClassId: joi.string(),
        shortDescription: joi.string(),
        longDescription: joi.string(),
        upSells: joi.array(),
        crossSells: joi.array(),
        status: joi.string(),
        visibility: joi.object(),
        storeId: joi.string().required(),
        userName: joi.string().required(),
        roles: joi.array().required(),
        employingStores: joi.array() 
    } );

    //Validate user input
    joi.validate( req.body, validationSchema, (err, result) => {
        if( err ) return res.status( 401 ).json( { message: 'Error', Data: err } );
    } );

    if( !res.headersSent ) {
        product = new Product( {
            sku: req.body.sku ? req.body.sku : crypto.randomBytes(5).toString('hex') ,
            name: req.body.name,
            productType: req.body.productType,
            imgUrl: req.body.imgUrl,
            price: req.body.price,
            minPrice: req.body.minPrice,
            maxPrice: req.body.maxPrice,
            //variations: req.body.variations ? req.body.variations : [],
            discountType: req.body.discountType,
            discount: req.body.discount,
            discountMinOrder: req.body.discountMinOrder,
            discountStartDate: req.body.discountStartDate,
            discountEndDate: req.body.discountEndDate,
            inStock: req.body.inStock,
            enableStockManagement: req.body.enableStockManagement,
            stockQty: req.body.stockQty,
            shippingClassId: req.body.shippingClassId,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            upSells: req.body.upSells,
            crossSells: req.body.crossSells,
            status: req.body.status,
            visibility: req.body.visibility,
            storeId: mongoose.Types.ObjectId( req.body.storeId )
        } );

        product.save()
        .then( savedProduct => res.json( { message: 'Success', data: savedProduct } ) )
        .catch( err => res.json( { message: 'Error', data: err } ) );
    }
} );

/**
 * Gets a list of products
 */

 /**
  * Deletes a list of products
  */

 module.exports = router;