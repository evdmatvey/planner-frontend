export const cleanDto = <T>(obj: T): Partial<T> => {
  const cleanedObj: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== '' && value !== null && value !== undefined) {
        if (Array.isArray(value) && value.length === 0) continue;

        cleanedObj[key] = value;
      }
    }
  }

  return cleanedObj;
};
