const mongoose = require( 'mongoose' );

/**
 * Tag document model stores platform tags
 */
const TagSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.ObjectId,
        required: true
    }
} );

module.exports = model( 'Tag', TagSchema );