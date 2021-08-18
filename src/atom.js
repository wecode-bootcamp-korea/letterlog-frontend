import { atom, selector } from 'recoil';

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
