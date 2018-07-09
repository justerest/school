/**
 * Returns all files from directory by extantion.
 * @example
 * export default getFilesList(require.context('./', true, /\.svg$/), 'svg');
 */
export function getFilesList(r: any, type = 'ts') {
  const regexp = new RegExp('\\.\\/(.*)\\.' + type);
  return r.keys().reduce((container: { [P in string]: any }, path: string) => {
    const key = path.replace(regexp, '$1');
    const value = r(path).default;
    container[key] = value;
    return container;
  }, {});
}
