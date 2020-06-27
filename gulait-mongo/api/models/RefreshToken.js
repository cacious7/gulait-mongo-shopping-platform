const mongoose = require( 'mongoose' );

/**
 * RefreshToken document model
 */
const RefreshTokenSchema = mongoose.Schema( {
    userName: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
} );

module.exports = mongoose.model( 'RefreshToken', RefreshTokenSchema );