export function setCookie(key: string, value: string | null, props: {[key: string]: string | number | Date | boolean} = {}): void {
  props = {
    path: '/',
    ...props
  };
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const time = new Date();
    time.setTime(time.getTime() + exp * 1800);
    exp = props.expires = time;
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  if (value === null) {
    value = '';
    props.expires = -1;
  } else {
    value = encodeURIComponent(value);
  }
  let updatedCookie = key + '=' + value;
  for (const propName in props) {
    if (Object.prototype.hasOwnProperty.call(props, propName)) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(key: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(key: string): void {
  setCookie(key, null, { expires: -1 });
}

