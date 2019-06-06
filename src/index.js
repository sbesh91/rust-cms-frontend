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

installRouter((location) => viewChange(location));
// todo cache everything for offline viewing
// todo handle this in collaboration with service worker
installOfflineWatcher((offline) => console.log(offline));
installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
  console.log(matches ? 'wide screen' : 'narrow sreen');
});