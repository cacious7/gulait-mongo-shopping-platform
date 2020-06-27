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
    imgUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    minPrice: {
        type: Number,
    },
    maxPrice: {
        type: Number
    },
    variations: [
        {
            _id: {
                type: mongoose.ObjectId 
            },
            sku: {
                type: String,
                default: crypto.randomBytes( 10 ).toString( 'hex' ),
                unique: true
            },
            price: {
                type: Number
            },
            discountType: {
                type: String,
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
                type: Boolean
            },
            enableStockManagement: {
                type: Boolean
            },
            stockQty: {
                type: Number
            },
            customAttributes: [
                {
                    name: {
                        type: String
                    },
                    values
                }
            ]
        }
    ]
} );