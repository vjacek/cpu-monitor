import wretch from 'wretch';

export const getLoadAverage = () => {
  return new Promise((resolve, reject) => {
    wretch('/cpu-average').get().json((result) => { resolve(result) });
  });
};