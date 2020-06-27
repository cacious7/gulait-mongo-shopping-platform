const mongoose = require( 'mongoose' );

/**
 * StoreCategory document model to store a list of platform Store Categories
 */
const StoreCategorySchema = mongoose.Schema( {
    storeId: mongoose.ObjectId,
    CategoryIds: [ mongoose.ObjectId ]
} );

module.exports = mongoose.model( 'StoreCategory', StoreCategorySchema );