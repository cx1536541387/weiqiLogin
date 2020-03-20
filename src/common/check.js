export function createCode(len) {
  let seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += seed.substr(Math.floor(Math.random() * (seed.length)), 1);
  }
  return result;
}