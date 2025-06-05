export const isObject = (value: any): value is Recordable => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const trim = (value: any): typeof value => {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.map(trim);
  if (isObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, trim(v)]));
  }
  return value;
};
