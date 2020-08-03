const Product = require( "../../api/models/Product" );
const grantAccessToStore = require( "./grantAccessToStore" );
const validateRole = require( "./validateRole" );

/**
 * Grants a user access to a specific product
 * @param { Array } req.body.roles contains the roles of the user
 * @param { Array } req.body.employingStores contains the stores the user is employed by
 * @param { Object } req the request from the user client
 * @param { Object } res the response to be sent to the user client
 * @param { Function } next the function that passes control to the next middleware function
 */
async function grantSellerAccessToProduct( req, res, next ){
    //verify that the user is a seller

    if( !validateRole( req.body.roles, 'seller' ) ) return res.status( 401 ).json( { message: 'Error', data: 'The user must be a seller to create a product' } );
    
    try {
        let storeId = null;
        let product = null;
        //fetch the id of the store to be edited from the product id provided
        await Product.findById( req.body.id )
        .then( retrievedProduct => {
            if( retrievedProduct ) {
                product = retrievedProduct;
                storeId = product.storeId;
            }else{
                return res.status( 401 ).json( { message: 'Error', data: 'A product with this id does not exist. Please check the provided id and try again.' } );
            }
        } );

        if( !res.headersSent){
            const status = grantAccessToStore( req.body.employingStores, storeId );

            switch( status ){
                case 'denied':
                    return res.status( 401 ).json( { 
                        message: 'Error', 
                        data: `This user has no access rights to modify this product` 
                    } );
                case 'granted':
                    //pass the product to prevent running 
                    //a query to retrieve it again
                    req.body.product = product; 
                    next();
                    break;
            }

        }
    } catch ( err ) {
        return res.status( 500 ).json( { message: 'Error', data: err.toString() } );
    }
}

module.exports = grantSellerAccessToProduct;
 
