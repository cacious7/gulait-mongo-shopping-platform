const grantAccessToStore = require( "./grantAccessToStore" );
const validateRole = require( "./validateRole" );

/**
 * Grants a user access to a specific product
 * @param { Array } req.body.roles contains the roles of the user
 * @param { Array } req.body.employingStores contains the stores the user is employed by
 * @param { String } req.body.storeId An id of the store to be accessed
 * @param { Object } req the request from the user client
 * @param { Object } res the response to be sent to the user client
 * @param { Function } next the function that passes control to the next middleware function
 */
function grantSellerAccessToStore( req, res, next ){
     //verify that the user is a seller
     if( !validateRole( req.body.roles, 'seller' ) ) return res.status( 401 ).json( { message: 'Error', data: 'The user must be a seller to create a product' } );
    try {
        console.log( `req.body`, req.body );
        const status = grantAccessToStore( req.body.employingStores, req.body.storeId );

        switch( status ){
            case 'denied':
                return res.status( 401 ).json( { 
                    message: 'Error', 
                    data: `This user has no access rights to this store` 
                } );
            case 'granted':
                next();
                break;
        }
    } catch (err) {
        return res.status( 500 ).json( { message: 'Error', data: err.toString() } );
    }
}

module.exports = grantSellerAccessToStore;