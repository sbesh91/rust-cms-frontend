import {
  installRouter,
  installOfflineWatcher,
  installMediaQueryWatcher
} from 'pwa-helpers';
import {
  viewChange
} from './tools/router';

import './pages/header';
import './pages/nav';
import './pages/footer';


(async () => {
  if (!document.body.animate) {
    await import('web-animations-js');
  }
  
  installRouter((location) => viewChange(location));
  // todo cache everything for offline viewing
  // todo handle this in collaboration with service worker
  installOfflineWatcher((offline) => console.log(offline));
  installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
    console.log(matches ? 'wide screen' : 'narrow sreen');
  });
  
  document.querySelector('.logo').addEventListener('click', () => {
    // store this in localstorage
    document.body.classList.toggle('invert');
  })
})();