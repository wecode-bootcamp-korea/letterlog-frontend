import { atom } from 'recoil';

export const letterBoxState = atom({
  key: 'letterBoxState',
  default: [],
});

export const selectedFilesState = atom({
  key: 'selectedFilesState',
  default: null,
  dangerouslyAllowMutability: true,
});
