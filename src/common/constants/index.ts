export const isObj = (value: any): value is Recordable => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const trim = (value: any): typeof value => {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.map((v) => trim(v));
  if (isObj(value)) {
    Object.keys(value).forEach((k) => (value[k] = trim(value[k])));
    return value;
  }
  return value;
};
