export const retry = async (fn: () => Promise<any>, retries = 3) => {
  let delay = 300;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
};
