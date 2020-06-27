const mongoose = require( 'mongoose' );

/**
 * Category document model to store platform Store and Product Categories
 */
const CategorySchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    childCategoryId: mongoose.ObjectId,
    parentCategoryId: mongoose.ObjectId
} );

module.exports = mongoose.model( 'Category', CategorySchema );