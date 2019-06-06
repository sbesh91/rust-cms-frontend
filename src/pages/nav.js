import { LitElement, html, css } from 'lit-element';
import { defaultStyles } from '../tools/styles';

class AppNav extends LitElement {
  
  constructor() {
    super();
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        nav {
          display: grid;
          grid-template-columns: minmax(150px, 250px) minmax(150px, 250px);
        }

        a {
          display: block;
          height: 6rem;
        }
      `
    ]
  }

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);