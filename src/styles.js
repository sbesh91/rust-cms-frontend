import {
  css
} from 'lit-element';

const defaultStyles = css`
  * { 
    box-sizing: border-box;  
    font-family: sans-serif;
  }

  :host {
    display: block;
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
      font-family: sans-serif;
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