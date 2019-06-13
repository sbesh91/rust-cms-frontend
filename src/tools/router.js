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
  const curve = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  const animationTimingConfig = {
    fill: 'none',
    easing: curve,
    duration: duration
  };

  const top = document.getElementById('top');
  const bottom = document.getElementById('bottom');
  const transition = document.getElementById('transition');
  const rect = document.body.getBoundingClientRect();

  let topFrames;
  let bottomFrames;
  let transitionFrames;
  let frames;

  if (direction === 'forwards') {
    const rotate = -30;
    const skew = -60;
    const translateOut = 3;
    const translateIn = 8;
    const scale = Math.min(rect.width, 1400) / 300;

    topFrames = [
      { transform: `rotate(${rotate}deg) skew(${skew}deg) translate(-${translateIn}rem, 0)`, opacity: 0 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg) scale(1)`, opacity: .5, offset: .15 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg) scale(1)`, opacity: 1, offset: .35 },
      { transform: `rotate(0) skew(0) scale(${scale/3})`, opacity: 1, offset: .5 },
      { transform: `rotate(0) skew(0) scale(${scale/2})`, opacity: .5, offset: .6 },
      { transform: `rotate(0) skew(0) scale(${scale})`, opacity: .2, offset: .75 },
      { transform: `rotate(0) skew(0) scale(${scale})`, opacity: .1, offset: .95 },
      { transform: `rotate(0) skew(0) scale(${scale}) translateY(-${translateOut}rem)`, opacity: 0 },
    ];

    bottomFrames = [
      { transform: `rotate(${rotate}deg) skew(${skew}deg) translate(${translateIn}rem, 0)`, opacity: 0 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg) scale(1)`, opacity: .5, offset: .15 },
      { transform: `rotate(${rotate}deg) skew(${skew}deg) scale(1)`, opacity: 1, offset: .35 },
      { transform: `rotate(0) skew(0) scale(${scale/3})`, opacity: 1, offset: .5 },
      { transform: `rotate(0) skew(0) scale(${scale/2})`, opacity: .5, offset: .6 },
      { transform: `rotate(0) skew(0) scale(${scale})`, opacity: .2, offset: .75 },
      { transform: `rotate(0) skew(0) scale(${scale})`, opacity: .1, offset: .95 },
      { transform: `rotate(0) skew(0) scale(${scale}) translateY(${translateOut}rem)`, opacity: 0 },
    ];

    transitionFrames = [
      { opacity: 0 },
      { opacity: 1, offset: .1 },
      { opacity: 1, offset: .8 },
      { opacity: 0 }
    ];

    frames = [
      { opacity: 0 },
      { opacity: 0, offset: .9 },
      { opacity: 1 }
    ]
  } else {
    topFrames = [
      
    ];

    bottomFrames = [

    ];

    transitionFrames = [

    ];

    frames = [
      
    ];
  }

  const fadeTransition = transition.animate(transitionFrames, {
    duration: duration,
    fill: 'forwards'
  });
  const topAnimation = top.animate(topFrames, animationTimingConfig);
  const bottomAnimation = bottom.animate(bottomFrames, animationTimingConfig);
  const animation = node.animate(frames, {
    duration: 1800,
    easing: curve,
    fill: 'forwards'
  });
  
  animation.onfinish = onFinish(node, direction);

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