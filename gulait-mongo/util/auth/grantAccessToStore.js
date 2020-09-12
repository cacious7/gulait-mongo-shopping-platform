/**
 * Grants a user access to a store
 * @param { Array } employingStores An array of stores that the user has access to 
 * @param { String } storeId An id of a store to grant access to
 * @returns { string } 'denied' if access is denied and 'granted' if it has been granted
 */
function grantAccessToStore( employingStores, storeId ){
    //verify that the seller has access to a specific store
    const result = employingStores.filter( store => { 
        console.log( `employingStore - ${ store.storeId } === storeId - ${ storeId } ` );
        return store.storeId == storeId;
    }  );

    let status = null;
    if( result.length === 0 ){
        status = 'denied';
    } else {
        status = 'granted'
    }

    return status;
}

module.exports = grantAccessToStore;