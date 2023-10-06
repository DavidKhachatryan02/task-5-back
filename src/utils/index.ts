export const generateMassages = (count: number) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    const key = i.toString();
    const value = Math.random().toString(36).substring(7);
    array.push({ key, value });
  }
  return array;
};
