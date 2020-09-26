/**
 * Retrieves a bearer token from a request object
 * 
 * The token is stored in a request 'Authorization' header's bearer attribute.
 * The attribute is seperated from its value(token) by a space in the form 
 * 'Bearer token'
 * @param { Request } req A request object from a user client
 * @return { String } A JWT token retrieved from the Bearer token 
 */
const getBearerToken = ( req ) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //this code returns authHeader.split(' ')[1] if authHeader returns true
    return token;
}

module.exports = getBearerToken;