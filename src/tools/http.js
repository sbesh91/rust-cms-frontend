import { getToken, $auth } from './auth';
import { baseUrl } from '../app';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': getToken()
};

$auth.subscribe(token => headers.Authorization = token);

class http {
  static fetch(params) {
    return fetch(`${baseUrl()}${params.url}`, {
      method: params.method,
      body: JSON.stringify(params.data), 
      headers: Object.assign(headers, params.headers)
    })
  }
}

export {
  http
}