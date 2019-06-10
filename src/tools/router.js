import { isDynamic, getArticle, load, routes } from '../app';

import {
  generatePageTransitionAnimation
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

function animateViewChange(node, first, method, direction = 'forwards', axis = 'Y') {
  const duration = 1000;
  const animationTimingConfig = {
    fill: 'none',
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    duration: duration
  };
  
  let frames;

  if (direction === 'forwards') {
    frames = [
      {transform: `translateZ(-200px) rotate${axis}(180deg) scale(1)`, opacity: 0},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.15},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.20},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1, offset: 0.65},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1, offset: 0.70},
      {transform: `translateZ(-200px) rotate${axis}(0) scale(1)`, opacity: 1}
    ];
  } else {
    frames = [
      {transform: `translateZ(-200px) rotate${axis}(0) scale(1)`, opacity: 1},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1,  offset: 0.15},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1, offset: 0.20},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.65},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.70},
      {transform: `translateZ(-200px) rotate${axis}(180deg) scale(1)`, opacity: 0}
    ];
  }

  const animation = node.animate(frames, animationTimingConfig);

  animation.onfinish = () => {
    if (direction === 'forwards') {
      node.style.opacity = 1;
    } else {
      node.style.opacity = 0;
    }
  };
}

const manageDomViewChange = async (first = false, method = 'add', direction = 'forwards',  pathname = location.pathname) => {
  if (isDynamic(pathname)) {
    const dynamic = document.querySelector('article-page');

    if (first) {
      generatePageTransitionAnimation(dynamic, direction);
    } else {
      animateViewChange(dynamic, first, method, direction);
    }

    dynamic.classList[method]('active');
  } else {
    
    try {
      const view = document.querySelector(routes[pathname].selector);
      
      generatePageTransitionAnimation(view, direction);
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
    
    manageDomViewChange(true);

    currentLocation = location.pathname;
    return;
  }

  manageDomViewChange(false, 'remove', 'backwards', currentLocation);

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