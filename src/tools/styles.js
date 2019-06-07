import {
  css
} from 'lit-element';

const defaultStyles = css`
  * { 
    box-sizing: border-box;  
    font-family: 'Exo', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  h1, h2, h3, p, article, a, section, header {
    color: var(--dark-background);
  }

  a {
    cursor: pointer;
  }

  :host {
    display: block;
  }

  h1, h2, h3 {
    margin: 0;
  }

  h1,h2,h3, h1 *, h2 *, h3 * {
    font-family: Trailmade, cursive;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    color: var(--dark-background);
  }

  h1 { font-size: 64px; }
  h2 { font-size: 48px; }
  h3 { font-size: 40px; } 
`;


const adminStyles = [ 
  defaultStyles,
  css `
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      padding-bottom: .5rem;
      border-bottom: 1px solid var(--dark-background);
    }

    button {
      display: inline-block;
      border: none;
      padding: 1rem 2rem;
      text-decoration: none;
      background: var(--dark-background);
      box-shadow: var(--box-shadow);
      color: var(--light-background);
      font-size: 1rem;
      cursor: pointer;
      text-align: center;
      -webkit-appearance: none;
      -moz-appearance: none;
    }

    button.small {
      font-size: .9rem;
      padding: .5rem 1rem;
    }

    input, select {
      padding: .25rem;
      font-size: 1rem;
    }
  `
];

export {
  defaultStyles,
  adminStyles
}