const isObject = require( '../isObject' );

/**
 * Generates a suitable mongodb query from a gulait category
 * This query is usually used to query the db to check if it exists
 * @param { Object } category Object from which to generate a query for mongodb nested queries
 * @param { String } queryString the query string to form, optional
 * @return { String } the query string
 */
function generateCategoryQuery( category, queryString = [] ){
    //Concatenates an object key to its children's key recursively
    //untill a non object/array value or empty object is encountered

    //if category is provided and is an object
    if( isObject( category ) ){
        const key = Object.keys( category );
        //make sure category only has one element as a key, otherwise, TERMINATE WITH AN ERROR
        if( key.length > 1 ){
            return { message: 'Error', data: 'a category and its subcategories can have exactly one child element each' }
        }
        //TERMINATES SUCCESSEFULLY when there are no more object keys
        //this could mean that an empty object has been encountered
        else if( key.length == 0 ){
            return { message: 'Success', data: queryString.join( '.' ) }
        }
        //append key to the query
        queryString.push( key[ 0 ] );

        //perform operation recursively
        return generateCategoryQuery( category[ key[ 0 ] ], queryString );
    } 
    //if category is not an object and queryString is set, TERMINATE SUCCESSEFULLY
    //this could mean that  not object nd non array value has been encountered
    else {
        return { message: 'Success', data: queryString.join( '.' ) };
    }
}

module.exports = generateCategoryQuery;