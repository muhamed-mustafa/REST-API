import { customAlphabet } from 'nanoid';

export const alphaNumeric = (length: number) => {
  return customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWQYZ0123456789', length)();
};
