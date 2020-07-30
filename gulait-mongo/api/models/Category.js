const mongoose = require( 'mongoose' );

/**
 * Category document model to store platform Store and Product Categories
 */
const CategorySchema = mongoose.Schema( {
    Products: {
        new: {
            type: Object
        },
        used: {
            type: Object
        },
        refurbished: {
            type: Object
        }
    },
    Services: {
        type: Array,
    }
} );

module.exports = mongoose.model( 'Category', CategorySchema );