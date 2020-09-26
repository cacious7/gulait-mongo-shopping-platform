const express =  require( 'express' ); //import only works in es6 and u need laravel mix for that
const router = express.Router();
const Post = require( '../models/Post' );
const authToken = require( '../../util/auth/authorizeToken' );

//In this file, it shall always be concatenating the used route to the one provided to the middleware that calls it.
//so there is no need to say /posts again because that has already been specified by the middleware
// look at the /specific example

//GET ALL POSTS
router.get( '/', authToken, async ( req, res ) => {
    try {
        const posts = await Post.find();
        res.status( 200 ).json( posts );
    } catch ( err ) {
        res.json( { ERROR: err } );
    }
});

//GET SPECIFIC POST
router.get( '/specific/:postId', async( req, res ) => {
    try{
        const post = await Post.findById( req.params.postId );
        res.status( 200 ).json( post );
    }catch( err ){
        res.json( { ERROR: err } );
    }
});

//DELETE A SPECIFIC POST 
router.delete( '/specific/:postId', async ( req, res ) => {
    try{
        const removedPost = await Post.remove( { _id: req.params.postId } );
        res.status( 200 ).json( removedPost );
    }catch( err ){
        res.json( { ERROR: err } );
    }
});

//UPDATE A SPECIFIC POST 
router.patch( '/specific/:postId', async ( req, res ) => {
    try{
        const updatedPost = await Post.updateOne( { _id: req.params.postId }, { $set: { title: req.body.title } } );
        res.status( 200 ).json( updatedPost );
    }catch( err ){
        res.json( { ERROR: err } );
    }
});
//MAKE A POST
router.post( '/', async ( req, res ) => {
    console.log(req.body)
    //saving data to the mongoose db using a model
    const post = new Post( {
        title: req.body.title,
        description: req.body.description
    } );
    //the .save function on a model returns a promise
    //we can then capture the promise with the .then and .catch functions if we prefere 
    //however, due to the async option entered in at the top of this router,
    // we cany then use await instead to wait for the save and capture the value,
    //then use try and catch block to catch the success and error messages
    try{ 
        const savedPost = await post.save();
        res.status( 200 ).json( savedPost );
    } catch( err ){
        res.json( { ERROR: err } );
    }

});

module.exports = router;