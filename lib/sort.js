const sortObjects = (dependencyObj) => {
  // inherit all dependencies for a given permission
  const inherited = permission => {
    return dependencyObj[permission].reduce((mem, i) => {
      return [...mem, i, ...inherited(i)];
    }, []);
  }
  
  const ordered = Object.entries(dependencyObj).sort((a, b) => !!~inherited(b[0]).indexOf(a[0]) ? -1 : 1)
  const sorted = ordered.map((item) => item[0]);
  return sorted;
}

module.exports = sortObjects;
