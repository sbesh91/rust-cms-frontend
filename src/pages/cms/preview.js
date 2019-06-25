import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { defaultStyles } from '../../tools/styles';

class PreviewPage extends LitElement {

  static get properties() {
    return {
      preview: {
        type: String
      }
    };
  }
  
  constructor() {
    super();
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        p, span, a, section, header, footer, div {
          color: var(--dark-background);
        }
      `
    ]
  }

  render() {
    if (!this.preview) {
      return html``;
    }

    return html`
      <div>
        ${unsafeHTML(this.preview)}
      </div>
    `;
  }
}

customElements.define('preview-page', PreviewPage);