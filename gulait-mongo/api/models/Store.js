const mongoose = require( "mongoose" );

/**
 * Store document model to save platform Store details
 */
const StoreSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    storeUrl: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    categories: [ Object ],
    tag: [ {
        _id: mongoose.ObjectId,
        name: String
    } ],
    addresses: [
        {
            name: String,
            status: Boolean,
            address1: String,
            address2: String,
            city: String,
            province: String,
            country: String,
            postcode: String,
            longitude: Number,
            latitude: Number,
            active: Boolean
        }
    ],
    visibility: {
        city: [
            {
                id: mongoose.ObjectId,
                name: String,
                visible: Boolean
            }
        ],
        province: [
            {
                id: mongoose.ObjectId,
                name: String,
                visible: Boolean
            }
        ],
        country: [
            {
                id: mongoose.ObjectId,
                name: String,
                visible: Boolean
            }
        ]
    },
    phone: {
        countryCode: String,
        number: String
    },
    logoUrl: String,
    shippingZones: [
        {
            name: String,
            shippingMethods: [
                {
                    name: String,
                    description: String,
                    taxable: {
                        type: Boolean,
                        default: false
                    },
                    enable: {
                        type: Boolean,
                        default: false
                    },
                    flexibleRules: [
                        {
                            basis: String,
                            enable: {
                                type: Boolean,
                                default: true
                            },
                            startDate: Date,
                            endDate: Date,
                            basisMin: Number,
                            basisMax: Number,
                            costPerProduct: Number
                        }
                    ],
                    freeShippingRules: [],
                    type: String
                }
            ],
            visibility: {
                city: [
                    {
                        id: mongoose.ObjectId,
                        name: String,
                        visible: Boolean
                    }
                ],
                province: [
                    {
                        id: mongoose.ObjectId,
                        name: String,
                        visible: Boolean
                    }
                ],
                country: [
                    {
                        id: mongoose.ObjectId,
                        name: String,
                        visible: Boolean
                    }
                ]
            }
        }
    ],
    barnerUrl: String

} );

module.exports = mongoose.model( 'Store', StoreSchema );