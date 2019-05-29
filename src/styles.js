import { css } from 'lit-element';

const defaultStyles = [
  css`
  * { 
    box-sizing: border-box;  
    font-family: sans-serif;
  }`,
  css`
  button {
    display: inline-block;
    border: none;
    padding: 1rem 2rem;
    text-decoration: none;
    background: #0069ed;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input {
    padding: .25rem;
    font-size: 1rem;
  }`
];

export {
  defaultStyles
}