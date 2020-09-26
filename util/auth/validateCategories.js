const generateCategoryQuery = require( './generateCategoryQuery' );
const Category = require( '../../api/models/Category' );

/**
 * An async function that verifies if a list of categories exists in the platform's categories collection 
 * and if it is allowed for use
 * @param { Array } categories A list of categories to be verified
 * @return { Object } returns an object containing the message and data returned
 */
async function validateCategories( categories ){
    try {
         //update product categories
        if( Array.isArray( categories ) && categories.length > 0 ){
            //add 1 for each category that is found in the categories collection
            let counter = 0;
            //verify categories
            for( let category of categories ){
                const categoryQuery = generateCategoryQuery( category );
                if( categoryQuery.message.toLowerCase() == 'success' ){
                    const dbCategories = await Category.findOne( { [ categoryQuery.data ]: true } );
                    if( dbCategories ) counter++;
                }
                else if( categoryQuery.message.toLowerCase() == 'error' ){
                    return categoryQuery;
                }
                else{
                    throw new Error( 'Something went wrong when generating a category' );
                }
            }
            //if verification was successfull, return success
            if( categories.length == counter ){
                return { message: 'Success', data: 'verification successfull' }
            }else{
                throw new Error( 'Something went wrong when validating the category list. Make sure all the categories are valid' );
            }
        }else {
            throw new Error( 'the categories list must be a nun empty array' );
        }
    } catch ( err ) {
        return { message: 'Error', data: err.toString().replace( /Error:/gi, '' ).trim() }
    }
}

module.exports = validateCategories;

