import {
  installRouter
} from 'pwa-helpers';
import {
  viewChange
} from './tools/router';

(async () => {
  if ('serviceWorker' in navigator) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;

        refreshing = true;
        window.location.reload();
      }
    );

    navigator.serviceWorker.register('service-worker.js');
  }

  const header = import('./pages/header');
  const nav = import('./pages/nav');
  const footer = import('./pages/footer');
  const page = import('./pages/home/index');
  await Promise.all([header, nav, footer, page]);
  
  if (!document.body.animate) {
    await import('web-animations-js');
  }

  installRouter((location) => viewChange(location));

  document.querySelector('.logo').addEventListener('click', () => {
    document.body.classList.toggle('invert');
  });
})();