import { LitElement, html, css } from 'lit-element';
import { defaultStyles } from '../tools/styles';

class NotFound extends LitElement {

  constructor() {
    super();
  }

  static get styles() {
    return [
      defaultStyles,
      css`
      
      `
    ]
  }

  render() {
    return html`<p>not found page</p>`;
  }
}

customElements.define('not-found', NotFound);