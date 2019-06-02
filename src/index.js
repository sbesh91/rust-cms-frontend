import {
  html,
  render
} from 'lit-html';
import {
  installRouter,
  installOfflineWatcher,
  installMediaQueryWatcher
} from 'pwa-helpers';
import {
  viewChange
} from './app';

installRouter((location) => viewChange(location));
// todo cache everything for offline viewing
// todo handle this in collaboration with service worker
installOfflineWatcher((offline) => console.log(offline));
installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
  console.log(matches ? 'wide screen' : 'narrow sreen');
});

const body = () => html`
 <style>
    main {
      position: relative;
    }
    main > * {
      position: absolute;
      pointer-events: none;
      opacity: 0;
      top: 0;
      left: 0;
      max-height: 50vh;
      overflow: hidden;
      visibility: hidden;
    }
    .active {
      position: relative;
      max-height: none;
      overflow: unset;
      pointer-events: auto;
      opacity: 1;
      visibility: visible;
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