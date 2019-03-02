
export default function apiFetch(method, url, body, handlers) {
  let headers = {
    'Content-Type': 'application/json'
  };

  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    headers['Authorization'] = 'Bearer ' + accessToken;
  }

  let options = { 
    method: method,    
    headers: headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  handleFetch('http://localhost/fiftyyears/api/public/' + url, options, handlers);
}

export function handleFetch(url, options, handlers) {
  return fetch(url, options)
    .then(function(response) { 
      if (handlers[response.status]) {
        return response.json().then((json) => handlers[response.status](json));
      }
      if (handlers.error) {
        return response.json().then((json) => handlers.error(json));
      }

      throw new Error();        
    })      
    .catch(function(error) {
      if (handlers.error) {
        return handlers.error();
      }
    });
}

export function apiPost(url, body, handlers) {
  return apiFetch('POST', url, body, handlers);
}

export function apiGet(url, handlers) {
  return apiFetch('GET', url, false, handlers);
}

export function apiPatch(url, body, handlers) {
  return apiFetch('PATCH', url, body, handlers);
}

export function apiDelete(url, body, handlers) {
  return apiFetch('DELETE', url, body, handlers);
}

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

  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    options.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  return fetch('http://localhost/fiftyyears/api/public/' + url, options);
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

