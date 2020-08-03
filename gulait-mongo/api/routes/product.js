const router = require( 'express' ).Router();
const mongoose = require( 'mongoose' );
const joi = require( 'joi' );
const Product = require( '../models/Product' );
const crypto = require( 'crypto' );
const authenticateAccessToken = require( '../../util/auth/authenticateAccessToken' );
const grantSellerAccessToProduct = require( '../../util/auth/grantSellerAccessToProduct' );
const grantSellerAccessToStore = require( '../../util/auth/grantSellerAccessToStore' );
const ProductCategory = require( '../models/ProductCategory' );
const validateCategories = require( '../../util/auth/validateCategories' );

/**
 * Creates a product
 * The simplest version of a product only has a 'name' and 'productType' as required input from the user
 */
router.post( '/create', authenticateAccessToken, grantSellerAccessToStore, async ( req, res ) => {
   
    const validationSchema = joi.object().keys( {
        sku: joi.string(),
        name: joi.string().required(),
        productType: joi.string().required(),
        categories: joi.array().required(),
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
        storeId: joi.string(),
        userName: joi.string().required(),
        roles: joi.array().required(),
        employingStores: joi.array() 
    } );

    //Validate user input
    joi.validate( req.body, validationSchema, ( err, result ) => {
        if( err ) return res.status( 401 ).json( { message: 'Error', Data: err } );
    } );

    if( !res.headersSent ) {
        try {
            product = new Product( {
                sku: req.body.sku ? req.body.sku : crypto.randomBytes( 5 ).toString( 'hex' ) ,
                name: req.body.name,
                productType: req.body.productType,
                categories: req.body.categories,
                imgUrl: req.body.imgUrl,
                price: req.body.price,
                minPrice: req.body.minPrice,
                maxPrice: req.body.maxPrice,
                variations: req.body.variations ? req.body.variations : [],
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

            const savedProduct = await product.save();
           
            return res.json( { 
                message: 'Success', 
                data: savedProduct 
            } ); 
        } catch ( err ) {
            return res.json( { message: 'Error', data: err.toString() } );
        }
        
    }
} );

/**
 * searches for a list of publicly visible products
 * by id or by name
 * @param { String } id the id of the product to be searched
 * @param { String } name the name of the product to be searched
 * @return { JSON } the list of product found ranging from one to many
 */
router.get( '/search', async ( req, res ) => {
    //If both id and name are provided, an error should be return
    if( req.body.id && req.body.name ) return res.status( 401 ).json( {
        message: 'Error',
        data: 'You can only search a product by one value (criteria). Either by [id] or [name], not both.'
    } );

    //validate user input
    const validationSchema = joi.object().keys( {
        id: joi.string().min( 5 ).max( 30 ),
        name: joi.string().allow('')
    } );

    joi.validate( req.body, validationSchema, ( err, result ) => {
        if( err ) return res.status( 401 ).json( { message: 'Error', data: err } );
    } );

    if( !res.headersSent ) {
        try {
            //get a product by ID
            if( req.body.id ){
                const product = await Product.findById( req.body.id );
                return res.status( 200 ).json( { message: 'Success', data: product } );
            } 
            //search for products by name
            else if( req.body.name || req.body.name.length === 0 ){
                const regex = `.*${ req.body.name }.*`;
                const products = await Product.find( { name: { $regex: regex, $options: "i" } } );
                return res.status( 200 ).json( { message: 'Success', data: products } );
            }
        } catch ( err ) {
            return res.json( { message: 'Error', data: err.toString() } );
        }
    }
});

 /**
  * Deletes a product
  * The list ranges from 1 to many
  * Needs authorization
  * @param { String } req.body.id the id of the product to be deleted
  * @param { Object } req the request from the user client
  * @param { Object } res the response to be sent to the user client
  */
 router.delete( '/delete', authenticateAccessToken, grantSellerAccessToProduct, async ( req, res ) => {
    const validationSchema = joi.object().keys( {
        id: joi.string().required(),
        userName: joi.string().required(),
        roles: joi.array().required(),
        employingStores: joi.array(),
        product: joi.object()
    } );

    joi.validate( req.body, validationSchema, ( err, result ) => {
        if( err ) return res.status( 401 ).json( { message: 'Error', data: err } );
    } );

    if( !res.headersSent ){
        try {
            //Delete the product
            Product.deleteOne( { _id: mongoose.Types.ObjectId( req.body.product._id ) } )
            .then( deletedProductResults => {
                //Delete product category
                ProductCategory.deleteOne( { productId: mongoose.Types.ObjectId( req.body.product._id ) } )
                .then( deletedProductCategoryResults => res.status( 200 ).json( { 
                    message: 'Success', 
                    data:  {
                        deletedProductResults: deletedProductResults,
                        deletedProductCategoryResults: deletedProductCategoryResults
                    }
                } ) );
            } );
        } catch ( err ) {
            if( err ) return res.json( { message: 'Error', data: err.toString() } );
        }
    }

 } );

 /**
  * Updates a product
  * Needs authprization
  * @param { String } req.body.id the id of the product to be update
  * @param { Object } req.body.product the product to be updated
  * @param { Object } req the request from the user client
  * @param { Object } res the response to be sent to the user client
  */
 router.patch( '/update', authenticateAccessToken, grantSellerAccessToProduct, async ( req, res) => {
     //validate user input
     const validationSchema = joi.object().keys( {
        id: joi.string().required(),
        sku: joi.string(),
        name: joi.string(),
        productType: joi.string(),
        categories: joi.array(),
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
        userName: joi.string().required(),
        roles: joi.array().required(),
        employingStores: joi.array(),
        product: joi.object().required() 
    } );
    joi.validate( req.body, validationSchema, ( err, result ) => {
        if( err ) return res.status( 401 ).json( { message: 'Error', data: err } );
    } );

    try {
        if( !res.headersSent ){
            //fetch, update and save the product 
            //this is used in order to take advantage
            //of mongoose validation and middleware capabilities
            const product = req.body.product;
            const catValidationResults = await validateCategories( req.body.categories ); 
            if( product && catValidationResults.message.toLowerCase() == 'success' ){
                //update
                if( req.body.sku ) product.sku = req.body.sku;
                if( req.body.name ) product.name = req.body.name;
                if( req.body.productType ) product.productType = req.body.productType;
                if( req.body.categories && req.body.categories.length > 0 ) product.categories = req.body.categories;
                if( req.body.imgUrl ) product.imgUrl = req.body.imgUrl;
                if( req.body.price ) product.price = req.body.price;
                if( req.body.minPrice ) product.minPrice = req.body.minPrice;
                if( req.body.maxPrice ) product.maxPrice = req.body.maxPrice;
                if( req.body.variations && req.body.variations.length > 0 ) product.variations = req.body.variations;
                if( req.body.discountType ) product.discountType = req.body.discountType;
                if( req.body.discount ) product.discount = req.body.discount;
                if( req.body.discountMinOrder ) product.discountMinOrder = req.body.discountMinOrder;
                if( req.body.discountStartDate ) product.discountStartDate = req.body.discountStartDate;
                if( req.body.discountEndDate ) product.discountEndDate = req.body.discountEndDate;
                if( req.body.inStock ) product.inStock = req.body.inStock;
                if( req.body.enableStockManagement ) product.enableStockManagement = req.body.enableStockManagement;
                if( req.body.stockQty ) product.stockQty = req.body.stockQty;
                if( req.body.shippingClassId ) product.shippingClassId = req.body.shippingClassId;
                if( req.body.shortDescription ) product.shortDescription = req.body.shortDescription;
                if( req.body.longDescription ) product.longDescription = req.body.longDescription;
                if( req.body.upSells ) product.upSells = req.body.upSells;
                if( req.body.crossSells ) product.crossSells = req.body.crossSells;
                if( req.body.status ) product.status = req.body.status;
                if( req.body.visibility ) product.visibility = req.body.visibility;
                //save
                const updatedProduct = await product.save();
                if( updatedProduct ){
                    return res.status( 200 ).json( { 
                        message: 'Success', 
                        data: updatedProduct 
                    } );
                }else{
                    throw new Error( 'Something went wrong while saving the updated product' );
                }
            }else {
                throw new Error( catValidationResults.data );
            }
        }
    } catch ( err ) {
        return res.status( 500 ).json( { 
            message: 'Error', 
            data: err.toString()
        } );
    }

 } );

 module.exports = router;