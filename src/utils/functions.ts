export const isArrayEmpty = (arr: any[]) => {
  return arr.length === 0;
};

export const getIdFromUrl = (url: string) => {
  const splitted = url.split("/");
  const id = splitted[splitted.length - 1];
  return id;
};
