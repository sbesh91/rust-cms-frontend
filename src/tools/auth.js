import { BehaviorSubject } from "rxjs";

const JWT_KEY = "AUTH_TOKEN";
const UNAUTHENTICATED = "unauthenticated";

const _auth = new BehaviorSubject(getToken());
const $auth = _auth.asObservable();

function getToken() {
  const token = localStorage.getItem(JWT_KEY);

  return token || UNAUTHENTICATED;
}

function setToken(token) {
  localStorage.setItem(JWT_KEY, token);

  _auth.next(token);
}

function isAuthenticated(token) {
  return token !== UNAUTHENTICATED;
}

export { getToken, setToken, isAuthenticated, $auth };
