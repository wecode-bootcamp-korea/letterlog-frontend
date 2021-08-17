const TOKEN_KEY = 'access_token';

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return token;
  } else {
    alert('비밀번호를 입력하세요.');
    return null;
  }
};

const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const tokenUtils = {
  getToken,
  setToken,
};
