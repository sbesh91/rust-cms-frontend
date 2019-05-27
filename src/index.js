import {
  html,
  render
} from 'lit-html';
import {
  installRouter
} from 'pwa-helpers/router';
import {
  routes,
  navigate,
  isDynamic
} from './app';
import {
  generatePageTransitionAnimation,
  generateBaseLoadAnimation
} from 'tools';

let currentLocation = "unset";

let viewChange = async (location, event) => {
  if (currentLocation === "unset") {
    await navigate(window.decodeURIComponent(location.pathname));
    // todo write a function to check if route is dynamic
    if (isDynamic(location.pathname)) {

    } else {
      // todo move this into a function
      const firstView = document.querySelector(routes[location.pathname].selector);
      generateBaseLoadAnimation(firstView, 'forwards');
      firstView.classList.add('active');
    }

    return;
  }

  // the same is dynamic check needs to happen here

  const oldView = document.querySelector(routes[this.currentLocation].selector);
  generatePageTransitionAnimation(oldView, 'backwards');
  oldView.classList.remove('active');

  // toss up a spinner

  await navigate(window.decodeURIComponent(location.pathname));
  currentLocation = location.pathname;

  const newView = document.querySelector(routes[location.pathname].selector);
  generatePageTransitionAnimation(newView, 'forwards');
  newView.classList.add('active')
}

installRouter((location, event) => viewChange(location, event));

const body = () => html `
 <style>
    main {
      position: relative;
    }
    main > * {
      display: block;
      position: absolute;
      pointer-events: none;
      opacity: 0;
      top: 0;
      left: 0;
      max-height: 50vh;
      overflow: hidden;
    }
    .active {
      position: relative !important;
      max-height: none !important;
      overflow: unset !important;
      pointer-events: auto !important;
      opacity: 1 !important;
    }
  </style>
  <header>
    
  </header>
  <nav>
    
  </nav>
  <main>
    <home-page></home-page>
    <about-page></about-page>
    <login-page></login-page>
    <admin-page></admin-page>
    <not-found></not-found>
  </main>
`;

const ref = document.getElementById("body");

render(body(), ref);