import { LitElement, html } from 'lit-element';
import { $auth, isAuthenticated } from '../auth';
import { route } from '../app';

// todo solve the import issue with nested routes
let loginLoaded = false;
(async () => {
  await import('./login');
  loginLoaded = true;
})();

class AdminPage extends LitElement {

  constructor() {
    super();

    $auth.subscribe(token => !isAuthenticated(token) && loginLoaded && route("/login"));
  }

  render() {
    return html`
      https://codemirror.net/index.html
    `;
  }
}

customElements.define('admin-page', AdminPage);