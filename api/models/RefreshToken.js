const mongoose = require( 'mongoose' );

/**
 * RefreshToken document model to store JWT refresh tokens
 */
const RefreshTokenSchema = mongoose.Schema( {
    userName: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
} );

module.exports = mongoose.model( 'RefreshToken', RefreshTokenSchema );