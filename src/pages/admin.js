import { LitElement, html } from 'lit-element';

class AdminPage extends LitElement {

  constructor() {
    super();
  }

  render() {
    return html`
      https://codemirror.net/index.html
    `;
  }
}

customElements.define('admin-page', AdminPage);