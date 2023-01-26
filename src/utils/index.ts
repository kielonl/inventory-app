export const debounce = (func: any) => {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, 500);
  };
};

export const pluck = (array: any[], keys: string[]): any[] => {
  let cos = [] as any[];
  keys.forEach((key: string) => {
    cos = { ...cos, [`${key}`]: array.map((item) => item[key]) };
  });
  return cos;
};
