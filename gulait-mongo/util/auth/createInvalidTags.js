const Tag = require( '../../api/models/Tag' );

/**
 *	Check a list of tag names and create those that don't already exist in the database
 *	@param { Array } tags An array of strings that represent tag names
 * 	@return { Object } a response object containing a message and the data returned
 */
async function createInvalidTags( tags ){
	try{
		if( Array.isArray( tags ) && tags.length > 0 ){
			//counts the number of tags that have been verified
			let counter = 0;
			for( const tagName of tags ){
				if( typeof tagName == 'string' ) throw new Error( 'tags should be an array of string tag names' ); 
				//check if a tag is valid
				const validTag = await Tag.findOne( { name: tagName } );
				console.log( 'valid tag' );
				console.log( validTag );
				//if no result is returned then create the tag and  add it
				//to the tags collection
				if( !validTag ){
					const tag = new Tag( {
						name: tagName
					} );
					//create and save tag
					const createdTag = await tag.save();
					if( !createdTag ) 
						throw new Error( `Failed to create a new tag named: ${ tag.name }. Please try again.` );
				}
				//if a tag is valid or a tag has been created, increment counter
				counter++;
				console.log( `counter: ${ counter }` );
			}
			//if a tag is or it has been created, then return a success message
			if( counter = tags.length ){
				return { message: 'Success', data: 'Tags have been created successfully' };
			}else{
				throw new Error( 'Something went wrong creating new tags. Please check your input or try again' );
			}
		}		
	}catch( err ){
		return { message: 'Error', data: err.toString().replace( /Error:/gi, '' ).trim() };
	}	
}

module.exports = createInvalidTags;