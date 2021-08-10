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

export const modalOpenState = atom({
  key: 'modalOpenState',
  default: false,
});

export const nameInputState = atom({
  key: 'nameInputState',
  default: '',
});

export const textInputState = atom({
  key: 'textInputState',
  default: '',
});
