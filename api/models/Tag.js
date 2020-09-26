const mongoose = require( 'mongoose' );

/**
 * Tag document model stores platform tags
 */
const TagSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    views: {
    	type: Number,
    	default: 0
    }
} );

module.exports = mongoose.model( 'Tag', TagSchema );