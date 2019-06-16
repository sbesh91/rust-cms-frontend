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
          grid-template-columns: minmax(100px, 200px) minmax(100px, 200px);
          grid-gap: 1rem;
        }

        a {
          display: block;
          position: relative;
        }

        span {
          font-family: Trailmade, cursive;
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          font-size: 2rem;
          display: inline-block;
          color: var(--light-background);
          pointer-events: none;
          position: absolute;
          top: 0;
          left: calc(50% - 20px);
        }

        @media only screen and (max-width: 600px) {
          nav {
            display: grid;
            grid-template-columns: minmax(125px, 175px);
            grid-template-rows: 1fr 1fr;
          }

          a {
            height: 3rem;
          }

          svg {
            min-height: 40px;
          }
        }
      `
    ]
  }

  render() {
    return html`
      <nav>
        <a href="/">
          <span>Home</span>
          <svg viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6,1 98,2 90,22 2,25" />
          </svg>
        </a>
        <a href="/about">
          <span>About</span>
          <svg viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg">
            <polyline points="0,1 90,2 100,18 4,22" />
          </svg>
        </a>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);