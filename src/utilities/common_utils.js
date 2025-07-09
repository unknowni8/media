export const pause = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};