import { LitElement, html, css } from 'lit-element';
import { defaultStyles } from '../tools/styles';

class AppHeader extends LitElement {
  
  constructor() {
    super();
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        header {
          height: 8rem;
          display: grid;
          grid-template-columns: 1fr 8rem;
          align-items: center;
        }

        app-nav {
          padding-right: 5rem;
        }
      `
    ]
  }

  render() {
    return html`
      <header>
        <app-nav></app-nav>
        <slot></slot>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);