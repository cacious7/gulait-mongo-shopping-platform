const mongoose = require( 'mongoose' );

const LikesAndDislikesSchema = mongoose.Schema( {
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.ObjectId,
        required: true
    },
    sentiment: {
        type: Boolean,
        required: true
    }
} );

module.export = mongoose.model( 'LikesAndDislikes', LikesAndDislikesSchema );