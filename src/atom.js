import { atom, selector, useSetRecoilState } from 'recoil';

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
  default: false,
});
