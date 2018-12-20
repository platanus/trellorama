import axios from 'axios';

const baseUrl = 'https://trello.com/1/';
const cookieName = 'trellotoken';

function readCookie(name) {
  const cookie = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);

  return cookie ? cookie.pop() : '';
}

function writeCookie(name, value) {
  document.cookie = `${name}=${value}`;
}

function getToken() {
  return readCookie(cookieName);
}

function isAuthorized() {
  const token = getToken();

  return !(token === '');
}

function redirectAuthorization(apiKey) {
  console.log('Holiii');
  const returnUrl = window.location.href;
  const scope = 'read';
  const expiration = 'never';
  const name = 'Trello Statistics';
  const responseType = 'fragment';
  const url = `${baseUrl}authorize?key=${apiKey}&return_url=${returnUrl}&name=${name}&scope=${scope}&expiration=${expiration}&response_type=${responseType}`;
  window.location.assign(url);
}

function authorize(apiKey) {
  if (isAuthorized()) {
    return;
  }
  if (window.location.hash) {
    const token = window.location.hash;
    writeCookie(cookieName, token);

    return;
  }
  redirectAuthorization(apiKey);
}

export {
  authorize,
  isAuthorized,
};
