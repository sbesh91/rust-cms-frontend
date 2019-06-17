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
  
  h1, h2, h3, p, article, a, section, header, footer {
    color: var(--dark-background);
  }

  a {
    cursor: pointer;
  }

  :host {
    display: block;
  }

  h1, h2, h3, p {
    margin: 0;
  }

  .cursive, h1, h2, h3, footer, h1 *, h2 *, h3 *, footer * {
    font-family: Trailmade, cursive;
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    color: var(--dark-background);
  }

  h1 { font-size: 64px; }
  h2 { font-size: 48px; }
  h3 { font-size: 40px; } 

  .spacer {
    padding: .5rem 0;
  }

  svg polyline {
    fill: var(--dark-background);
  }

  svg polyline:hover {
    animation: skew 1000ms infinite; 
    animation-timing-function: linear;
    transform-origin: center;
  }

  @keyframes skew {
    0% {
      transform: scale(1) skew(0);
    }

    33.3% {
      transform: scale(0.99) skew(2deg);
    }

    66.6% {
      transform: scale(1.01) skew(-2deg);
    }

    100% {
      transform: scale(1) skew(0);
    }
  }
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