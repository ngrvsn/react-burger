export const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = async (res) => {
  if (res.ok) {
    return await res.json();
  }
  throw new Error(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`Ответ не получен: ${res}`);
};

export const generalRequest = async (endpoint, options) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await checkResponse(response);
  return checkSuccess(data);
};
