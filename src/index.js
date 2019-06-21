import {
  installRouter,
  // installOfflineWatcher,
  // installMediaQueryWatcher
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
  
  document.querySelector('.logo').addEventListener('click', () => {
    document.body.classList.toggle('invert');
  });
})();