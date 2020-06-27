const mongoose = require( 'mongoose' );

/**
 * RefreshToken document model to store JWT refresh tokens
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