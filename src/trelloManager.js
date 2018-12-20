import axios from 'axios';

const baseUrl = 'https://trello.com/1/';
const tokenCookieName = 'trellotoken';
const apiKeyCookieName = 'trelloapikey';

function readCookie(name) {
  const cookie = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);

  return cookie ? cookie.pop() : '';
}

function writeCookie(name, value) {
  document.cookie = `${name}=${value}`;
}

function getToken() {
  return readCookie(tokenCookieName);
}

function getApiKey() {
  return readCookie(apiKeyCookieName);
}

function isAuthorized() {
  return !(getToken() === '');
}

function redirectAuthorization(apiKey) {
  const returnUrl = window.location.origin;
  const scope = 'read';
  const expiration = 'never';
  const name = 'Trello Statistics';
  const responseType = 'fragment';

  const url = `${baseUrl}authorize?key=${apiKey}&return_url=${returnUrl}&name=${name}&scope=${scope}&expiration=${expiration}&response_type=${responseType}`;

  window.location.assign(url);
}

function authorize(apiKey) {
  if (window.location.hash) {
    writeCookie(tokenCookieName, window.location.hash.replace('#token=', ''));
    writeCookie(apiKeyCookieName, apiKey);
    window.location.href = window.location.href.replace(location.hash, '');
  }
  if (isAuthorized()) {
    return;
  }
  redirectAuthorization(apiKey);
}

function request(url, onSuccess, onError) {
  axios.get(`${baseUrl}${url}?key=${getApiKey()}&token=${getToken()}`)
    .then(onSuccess)
    .catch(onError);
}

export {
  authorize,
  isAuthorized,
  request,
};
