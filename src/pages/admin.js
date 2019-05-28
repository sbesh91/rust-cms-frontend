import { LitElement, html } from 'lit-element';
import { $auth, isAuthenticated } from '../auth';
import { route } from '../app';

class AdminPage extends LitElement {

  constructor() {
    super();

    $auth.subscribe(token => !isAuthenticated(token) && route("/"));
  }

  render() {
    return html`
      https://codemirror.net/index.html
    `;
  }
}

customElements.define('admin-page', AdminPage);