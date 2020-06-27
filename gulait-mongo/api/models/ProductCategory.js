const mongoose = require( 'mongoose' );

/**
 * ProductCategory document model to store a list of platform Product Categories
 */
const ProductCategorySchema = mongoose.Schema( {
    productId: mongoose.ObjectId,
    CategoryIds: [ mongoose.ObjectId ]
} );

module.exports = mongoose.model( 'ProductCategory', ProductCategorySchema );