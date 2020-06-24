const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema( {
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
    },
    dateOfBirth: {
        type: Date
    },
    wishlists: [
        {
            name: String,
            products: [
                {
                    productId: ObjectId,
                    variationId: ObjectId
                }
            ]
        }
    ],
    cart: [
        {

            products: [
                {
                    productId: ObjectId,
                    variationId: ObjectId
                }
            ]
        }
    ]


} );

module.exports = mongoose.model( 'User', UserSchema );