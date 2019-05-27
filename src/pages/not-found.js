import { LitElement, html } from 'lit-element';

class NotFound extends LitElement {

  constructor() {
    super();
  }

  render() {
    return html`<p>not found page</p>`;
  }
}

customElements.define('not-found', NotFound);