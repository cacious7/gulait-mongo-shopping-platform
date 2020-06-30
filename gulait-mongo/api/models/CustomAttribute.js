// const mongoose = require( 'mongoose' );

// /**
//  * CustomAttribute document model stores details about attributes only available to that store
//  */
// const CustomAttributeSchema = mongoose.Schema( {
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     values: [
//         {
//             value: {
//                 type: String
//             },
//             imgUrl: {
//                 type: String
//             },
//             color: {
//                 type: String
//             }
//         }
//     ],
//     storeId: {
//         type: mongoose.ObjectId,
//         required: true
//     },
//     productIds: [ mongoose.ObjectId ]
// } );

// module.exports = mongoose.model( 'CustomAttribute', CustomAttributeSchema );