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

async function animateViewChange(node, first, method, direction = 'forwards', axis = 'Y') {
  const duration = direction === 'forwards' ? 1200 : 100;
  const animationTimingConfig = {
    fill: 'none',
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    duration: duration
  };

  const top = document.getElementById('top');
  const bottom = document.getElementById('bottom');
  const transition = document.getElementById('transition');
  
  let topFrames;
  let bottomFrames;
  let transitionFrames;

  if (direction === 'forwards') {
    topFrames = [
      { transform: `rotate(-30deg) skew(-20deg) translate(-5rem, 0)`, opacity: 0 },
      { transform: `rotate(-30deg) skew(-20deg)`, opacity: 1, offset: .1 },
      { transform: `rotate(-30deg) skew(-20deg)`, opacity: 1, offset: .3 },
      { transform: `rotate(0) skew(0)`, opacity: 1, offset: .4 },
      { transform: `rotate(0) skew(0)`, opacity: 1, offset: .6 },
      { transform: `rotate(0) skew(0) scale(1)`, opacity: 1, offset: .7 },
      { transform: `rotate(0) skew(0) scale(1.75)`, opacity: .7, offset: .95 },
      { transform: `rotate(0) skew(0) scale(2) translateY(-5rem)`, opacity: 0 },
    ];

    bottomFrames = [
      { transform: `rotate(-30deg) skew(-20deg) translate(5rem, 0)`, opacity: 0 },
      { transform: `rotate(-30deg) skew(-20deg)`, opacity: 1, offset: .1 },
      { transform: `rotate(-30deg) skew(-20deg)`, opacity: 1, offset: .3 },
      { transform: `rotate(0) skew(0)`, opacity: 1, offset: .4 },
      { transform: `rotate(0) skew(0)`, opacity: 1, offset: .6 },
      { transform: `rotate(0) skew(0) scale(1)`, opacity: 1, offset: .7 },
      { transform: `rotate(0) skew(0) scale(1.75)`, opacity: .7, offset: .9 },
      { transform: `rotate(0) skew(0) scale(2) translateY(5rem)`, opacity: 0 },
    ];

    transitionFrames = [
      { opacity: 0 },
      { opacity: 1, offset: .1 },
      { opacity: 1, offset: .7 },
      { opacity: 0 }
    ];
  } else {
    topFrames = [
      
    ];

    bottomFrames = [

    ];

    transitionFrames = [

    ];
  }

  const fadeTransition = transition.animate(transitionFrames, {
    duration: duration,
    fill: 'forwards'
  });
  const topAnimation = top.animate(topFrames, animationTimingConfig);
  const bottomAnimation = bottom.animate(bottomFrames, animationTimingConfig);
  
  bottomAnimation.onfinish = onFinish(node, direction);

  return Promise.all([fadeTransition.finished, topAnimation.finished, bottomAnimation.finished]);
}

function onFinish(node, direction) {
  return () => {
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

    dynamic.classList[method]('active');

    if (first) {
      generatePageTransitionAnimation(dynamic, direction);
    } else {
      return animateViewChange(dynamic, first, method, direction);
    }
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

  await manageDomViewChange(false, 'remove', 'backwards', currentLocation);

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