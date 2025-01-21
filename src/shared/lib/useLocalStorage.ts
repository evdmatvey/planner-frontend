export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const getValue = () => {
    const value = window.localStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : defaultValue;
  };

  const setValue = (value: T) => {
    const jsonValue = JSON.stringify(value);
    window.localStorage.setItem(key, jsonValue);
  };

  return { getValue, setValue };
};
