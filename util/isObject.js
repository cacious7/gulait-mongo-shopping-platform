/**
 * Tests a variable to check if it is an object.
 * @param { Object } object the object to be tested
 * @returns { Boolean } true if the variable is an object and false otherwise
 */
function isObject( object ) {
    if( Array.isArray( object ) ){
        return false;
    } else if( object instanceof Object ){
        return true;
    } else{
        return false;
    }
}

module.exports = isObject;