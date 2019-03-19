
export function fetchApi(method, url, body = false) {
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const accessToken = window.localStorage.getItem('fiftyyears:access_token');
  if (accessToken) {
    options.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  return fetch(process.env.REACT_APP_API_URL + url, options)
    .then((response) => {
      if (response.headers.has('x-access_token')) {
        // store new access token
        window.localStorage.setItem('fiftyyears:access_token', response.headers.get('x-access_token'));
        window.dispatchEvent(new CustomEvent('access_token_updated'));
      } else if (response.status == 401) {
        // clear access token if api returned unauthorized error
        window.localStorage.removeItem('fiftyyears:access_token');
        window.dispatchEvent(new CustomEvent('access_token_updated'));
      }
      return response;
    });
}

export function onStatus(response, status) {
  if (status instanceof Array && status.indexOf(response.status) > -1) {
    return response;
  } else if (response.status == status) {
    return response;
  }

  throw new Error(`${response.status} ${response.statusText}`);
}

export function jsonOnStatus(response, status) {
  return onStatus(response, status).json();
}

export function handleJsonByStatus(response, statusHandlers) {
  if (statusHandlers[response.status]) {
    return response.json().then((json) => statusHandlers[response.status](json));
  }

  throw new Error(`${response.status} ${response.statusText}`);
}

export function FetchApiMissing({ children }) {
  return window.fetch ? null : children;
}
