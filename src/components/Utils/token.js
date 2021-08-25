const TOKEN_KEY = 'access_token';

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return {
      headers: {
        Authorization: token,
      },
    };
  }
};

const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const tokenUtils = {
  getToken,
  setToken,
  removeToken,
};
