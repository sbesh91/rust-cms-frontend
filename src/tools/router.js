import { isDynamic, getArticle, load, routes } from '../app';

import {
  generateBaseLoadAnimation
} from 'tools';


const navigate = async (path) => {
  const page = path === '/' ? '/' : path.slice(1);
  
  if (isDynamic(page)) {
    await import('../pages/home/index')
    await getArticle(page);
  } else {
    await load(page);
  }
  
};

const route = (href) => {
  window.history.pushState({}, '', href);
  viewChange(window.location);
}

let currentLocation = "unset";

const manageDomViewChange = async (method = 'add', pathname = location.pathname) => {
  if (isDynamic(pathname)) {
    const dynamic = document.querySelector('article-page');
    // animate
    dynamic.classList[method]('active');
  } else {
    
    try {
      const view = document.querySelector(routes[pathname].selector);
      generateBaseLoadAnimation(view, 'forwards');

      view.classList[method]('active');

      if (method === 'add') {
        view.setAttribute('loaded', true);
      }
    } catch (error) {
      route('/not-found'); 
    }
  }
};

const viewChange = async (location) => {
  if (currentLocation === "unset") {
    await navigate(window.decodeURIComponent(location.pathname));
    // todo write a function to check if route is dynamic
    manageDomViewChange();

    currentLocation = location.pathname;
    return;
  }

  manageDomViewChange('remove', currentLocation);
  // toss up a spinner

  await navigate(window.decodeURIComponent(location.pathname));
  currentLocation = location.pathname;
  
  manageDomViewChange()
};

export {
  viewChange,
  navigate,
  route
}