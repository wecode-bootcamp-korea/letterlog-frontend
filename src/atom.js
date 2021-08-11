import { atom } from 'recoil';

export const createModalState = atom({
  key: 'createModalState',
  default: false,
});

export const emailListState = atom({
  key: 'emailListState',
  default: [],
});

export const emailTextState = atom({
  key: 'emailTextState',
  default: '',
});
