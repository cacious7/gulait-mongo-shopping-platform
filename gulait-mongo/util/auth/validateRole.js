/**
 * Checks an Array of user role objects to ditermine if a particular role exists
 * @param { Array } roles a list of user roles to check from
 * @param { String } roleName the name of the role to be found
 * @return { Boolean } true if a value was found and false if not
 */
function validateRole( roles, roleName ){
    //if values provided are null return false
    //to indicate that a role was not found
    if( !roles && !roleName ) return false;
    const matchedRole = roles.filter( role => role.name == roleName );
    const isRoleFound = matchedRole.length > 0 ? true : false;
    return isRoleFound;
}

module.exports = validateRole;