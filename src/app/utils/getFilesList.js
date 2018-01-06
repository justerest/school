export function getFilesList(r, type = 'js') {
  const regexp = new RegExp('\\.\\/(.*)\\.' + type);
  return r.keys().reduce((container, path) => {
    const key = path.replace(regexp, '$1');
    const value = r(path).default;
    container[key] = value;
    return container;
  }, {});
}
