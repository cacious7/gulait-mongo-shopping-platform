let getLocationTries = 0;

/**
 * Get the user's coordinates
 */
const getCoords = ( callback ) => {
    getLocationTries++;
    if( navigator.geolocation && getLocationTries < 3 ){
        navigator.geolocation.getCurrentPosition( callback, getCoordsErrorHandling, { enableHighAccuracy: true } );
    }
}

/**
 * handle Errors when we try to get coords
 */
const getCoordsErrorHandling = ( error ) => {
    switch( error.code ){
        case error.PERMISSION_DENIED:
            alert( `We wont be able to show you the store's location if you dont allow us to get your location. Please allow.` );
            getCoords();
            break;
        case error.POSITION_UNAVAILABLE:
            alert( `Your position is unavailable. This will prevent the map from showing.` );
            break;
        case error.TIMEOUT:
            alert( `The request to get your location Timed out. We will try again.` );
            getCoords();
            break;
        case error.UNKNOWN_ERROR:
            alert( `Something went wrong when getting your location. Please contact support.` );
            break;
    }
}


module.exports = getCoords;