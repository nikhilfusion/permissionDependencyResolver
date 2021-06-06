var sortObjects = require("./sort");

class PermissionDependencyResolver {
  constructor(dependencies) {
    this.dependencies = dependencies;
  }

  checkPermission(userPermissionList, permission) {
    const depPermissionArray = this.dependencies[permission];
    const hasPermission = depPermissionArray.every(item => userPermissionList.indexOf(item) > -1);
    return hasPermission;
  }

  checkBasePermission(basePermList) {
    const hasBasePermission = basePermList.every(permission => this.checkPermission(basePermList, permission));
    return hasBasePermission;
  }

  canGrant(existing, permToBeGranted) {
    // checking existing permissions are valid
    if (this.checkBasePermission(existing)) {
      // checking permToBeGranted is valid
      const grandAccess = this.checkPermission(existing, permToBeGranted)
      return grandAccess;
    }
    throw "Invalid Base Permissions";
  }

  canDeny(existing, permToBeDenied) {
    // checking permToBeDenied is in existingh permission 
    const isExisting = existing.find(item => item === permToBeDenied);
    if (isExisting) {
      // deleting the permToBeDenied from the existing list
      const permissionsAfterDelete = existing.filter(item => item !== permToBeDenied)
      // checking new permission array is valid
      const hasBasePermission = this.checkBasePermission(permissionsAfterDelete);
      return hasBasePermission;
    }
    throw "Invalid Base Permissions";
  }

  sort(permissions) {
    //sorting dependency object in to array
    const sortedDepPermission = sortObjects(this.dependencies)
    // sorting the permission based on the order of sortedDepPermission
    permissions.sort((a, b) => sortedDepPermission.indexOf(a) - sortedDepPermission.indexOf(b))
    return permissions;
  }
}

// you'll need to throw this in canGrant and canDeny when the existing permissions are invalid
class InvalidBasePermissionsError extends Error {
  constructor(_message) {
    super("Invalid Base Permissions");
    this.name = "InvalidBasePermissionsError";
  }
}

module.exports = PermissionDependencyResolver;
