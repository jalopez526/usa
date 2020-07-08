const hasPermissions = (permissions, resource) => {
  return permissions.includes("ALL") || permissions.includes(resource);
};

export { hasPermissions };
