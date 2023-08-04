export function getCookie(key) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(key, value, props = {}) {
  props = {
    path: '/',
    ...props
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const time = new Date();
    time.setTime(time.getTime() + exp * 1800);
    exp = props.expires = time;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = key + '=' + value;
  for (const key in props) {
    updatedCookie += '; ' + key;
    const propValue = props[key];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(key) {
  setCookie(key, null, { expires: -1 });
}