const mongoose = require( 'mongoose' );

/**
 * User document model to store platform user details
 */
const UserSchema = new mongoose.Schema( {
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        countryCode: String,
        number: String
    },
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
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    wishlists: [
        {
            name: String,
            products: [
                {
                    productId: mongoose.ObjectId,
                    variationId: mongoose.ObjectId
                }
            ]
        }
    ],
    cart: {
        products: [
            {
                productId: mongoose.ObjectId,
                variationId: mongoose.ObjectId
            }
        ]
    },
    roles: [
        {
            name: {
                type: String,
                required: true
            },
            privileges: [
                {
                    privilegeId: mongoose.ObjectId,
                    privilegeName: String 
                }
            ]
        }
    ],
    employingStores: [
        {
            storeId: mongoose.ObjectId,
            storeName: String
        }
    ],
    addresses: [
        {
            name: String,
            status: Boolean,
            address1: String,
            address2: String,
            city: String,
            province: String,
            country: String,
            postcode: String
        }
    ]

} );

module.exports = mongoose.model( 'User', UserSchema );