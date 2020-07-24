/**
 * @param { Array } req.body.roles contains the roles of the user
 * @param { Array } req.body.employingStores contains the stores the user is employed by
 * @param { String } req.body.storeId the id of the store on which access is to be granted
 * @param { Object } req the request from the user client
 * @param { Object } res the response to be sent to the user client
 * @param { Function } next the function that passes control to the next middleware function
 */
function grantStoreAccess( req, res, next ){
    //verify that the user is a seller
    if( req.body.roles[0].name != 'seller' ) return res.status( 401 ).json( { message: 'Error', data: 'The user must be a seller to create a product' } );
        
    //verify that the seller has access to a specific store
    const result = req.body.employingStores.filter( store => store.storeId === req.body.storeId  );
    if( !result ) return res.status( 401 ).json( { 
        message: 'Error', 
        data: `This user has no access rights to this store [ store name = ${ result[0].storeName } ]` 
    } );

    next();
}

module.exports = grantStoreAccess;
 
