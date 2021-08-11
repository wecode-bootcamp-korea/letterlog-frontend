import { atom } from 'recoil';

export const createModalState = atom({
  key: 'createModalState',
  default: false,
});

export const emailListState = atom({
  key: 'emailListState',
  default: { receivers: [] },
});

export const emailTextState = atom({
  key: 'emailTextState',
  default: '',
});

export const createFormDataState = atom({
  key: 'createFormDataState',
  default: {
    name: '',
    password: '',
    is_public: '',
    send_at: '',
  },
});
