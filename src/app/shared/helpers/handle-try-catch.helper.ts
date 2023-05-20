export const handledAsyncFunction = async (asyncFunc: any) => {
  try {
    const res = await asyncFunc;
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
