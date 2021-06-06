var PermissionDependencyResolver = require("../lib/permissionDependencyResolver");
var simplePermissionDependencies = {
    view: [],
    edit: ["view"],
    alter_tags: ["edit"],
    create: ["view"],
    delete: ["edit"],
  };

  var complexPermissionDependencies = Object.assign(
    {
      audit: ["create", "delete"],
      batch_update: ["edit", "create"],
    },
    simplePermissionDependencies
  );

  pdr = new PermissionDependencyResolver(simplePermissionDependencies);

  pdr.sort(["edit", "delete", "view"])

  pdr.sort(["create", "alter_tags", "view", "edit"])

  pdr2 = new PermissionDependencyResolver(complexPermissionDependencies)

  pdr2.sort(["audit", "create", "delete", "view", "edit"])