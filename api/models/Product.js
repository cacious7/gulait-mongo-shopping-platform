const mongoose = require( 'mongoose' );
const crypto = require( 'crypto' );

/**
 * Product document model to store Product details
 */
const ProductSchema = mongoose.Schema( {
    sku: {
        type: String,
        required: true,
        default: crypto.randomBytes( 10 ).toString( 'hex' ),
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    categories: [ Object ],
    tags: [ {
        _id: mongoose.ObjectId,
        name: String
    } ],
    imgUrl: {
        type: String
    },
    price: {
        type: Number
    },
    minPrice: {
        type: Number,
    },
    maxPrice: {
        type: Number
    },
    // variations: [
    //     {
    //         _id: {
    //             type: mongoose.ObjectId 
    //         },
    //         sku: {
    //             type: String,
    //             default: crypto.randomBytes( 10 ).toString( 'hex' ),
    //             unique: true
    //         },
    //         price: {
    //             type: Number
    //         },
    //         discountType: {
    //             type: String,
    //         },
    //         discount: {
    //             type: Number
    //         },
    //         discountMinOrder: {
    //             type: Number
    //         },
    //         discountStartDate: {
    //             type: Date
    //         },
    //         discountEndDate: {
    //             type: Date
    //         },
    //         inStock: {
    //             type: Boolean
    //         },
    //         enableStockManagement: {
    //             type: Boolean
    //         },
    //         stockQty: {
    //             type: Number
    //         },
    //         attributes: [
    //             {
    //                 attributeId: {
    //                     type: mongoose.ObjectId,
    //                 },
    //                 attributeType: {
    //                     type: String
    //                 },
    //                 attributeValue: {
    //                     type: String
    //                 }
    //             }
    //         ]
    //     }
    // ],
    discountType: {
        type: String
    },
    discount: {
        type: Number
    },
    discountMinOrder: {
        type: Number
    },
    discountStartDate: {
        type: Date
    },
    discountEndDate: {
        type: Date
    },
    inStock: {
        type: Boolean,
        default: false,
        required: true
    },
    enableStockManagement: {
        type: Boolean,
        default: false,
        required: true
    },
    stockQty: {
        type: Number
    },
    shippingClassId: {
        type: mongoose.ObjectId
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    upSells: [
        {
            productId: mongoose.ObjectId
        }
    ],
    crossSells: [
        {
            productId: mongoose.ObjectId
        }
    ],
    status: {
        type: String,
        required: true,
        default: 'offline'
    },
    visibility: {
        platformVisibility: String,
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
    location: {
        longitude: Number,
        latitude: Number
    },
    storeId: {
        type: mongoose.ObjectId,
        required: true
    }
} );

module.exports = mongoose.model( 'Product', ProductSchema );