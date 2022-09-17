const { Unauthorized } = require("../errors");

// ************************** checks permission for the access of resource ************************//
const checkPermission = (reqUser, resourceUser) => { 
    if (reqUser.userId === resourceUser.toString()) {
        return;
    }

    throw new Unauthorized(`Not authorized to access this resource`);
}
module.exports = checkPermission