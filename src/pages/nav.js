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

        @media only screen and (max-width: 600px) {
          nav {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
          }

          a {
            height: 3rem;;
          }
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