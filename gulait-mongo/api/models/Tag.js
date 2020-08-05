const mongoose = require( 'mongoose' );

/**
 * Tag document model stores platform tags
 */
const TagSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    }
} );

module.exports = model( 'Tag', TagSchema );