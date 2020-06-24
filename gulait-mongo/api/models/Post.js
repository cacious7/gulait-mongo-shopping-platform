const mongoose = require( 'mongoose' );

//create a schema for your model
const PostSchema = mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
} );

//export the schema as a model for proper representation in the mongoose database
module.exports = mongoose.model( 'Posts', PostSchema );