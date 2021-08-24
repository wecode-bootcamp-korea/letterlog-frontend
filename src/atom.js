import { atom, selector } from 'recoil';

// 검색 페이지 상태 관리
export const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

export const searchInputSelector = selector({
  key: 'searchInput',
  get: ({ get }) => {
    const value = get(searchInputState);
    return value;
  },
});
//모달 상태
export const modalState = atom({
  key: 'modalState',
  default: { type: 'closed', status: false },
});

export const actions = {
  OPEN_PW: { type: 'checkPw', status: true },
  CLOSE_PW: { type: 'checkPw', status: false },

  OPEN_SEND: { type: 'sendMail', status: true },
  CLOSE_SEND: { type: 'sendMail', status: false },
};
