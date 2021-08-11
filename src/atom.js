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

export const boxIdState = atom({
  key: 'boxId',
  default: '',
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});
